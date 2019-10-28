import { ASTNode, TypeDefinitionNode, FieldDefinitionNode } from 'graphql'

export type UnaryFn<A, R> = (args: A) => R

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

//  no input no return
export const nullable = <A, R>(fn: (arg: A) => R) => (arg?: A): R | undefined => {
  if (arg) {
    return fn(arg)
  }
}

// apply fn to array input
export const arrayable = <A, R>(fn: (arg: A) => R) => (arr: ReadonlyArray<A>): ReadonlyArray<R> =>
  arr.map(fn)

// skip fn when AstNode is provided
export const nodeOrProps = <Props, Node>(fn: (props: Props) => Node) => (
  input: Node | Props,
): Node => (isAstNode<Node>(input) ? input : fn(input))

export const nodeOrPropsArr = <A, R>(fn: UnaryFn<A, R>) => arrayable(nodeOrProps(fn))

// aliases, because I cannot get compose/pipe typings to work over functions on functions

/** accept node or props */
export const nodeFn = nodeOrProps
/** accept array of node or props */
export const nodeFnArr = <A, R>(fn: UnaryFn<A, R>) => arrayable(nodeOrProps(fn))
/** accept node or props, nullable */
export const nodeFnNullable = <A, R>(fn: UnaryFn<A, R>) => nullable(nodeOrProps(fn))
/** accept array of node or props, nullable */
export const nodeFnNullableArr = <A, R>(fn: UnaryFn<A, R>) => nullable(arrayable(nodeOrProps(fn)))

/*

// overkill idea...

// takes target object when some keys are function,
// takes props where keys match target
// and call props on those functions where keys match

export type CallOnKeys<Target, Props extends PropsObj<Target, Props>> = {
  [K in keyof Target]: K extends keyof Props ? ReturnTypeOr<Target[K]> : Target[K]
}

export type PropsObj<Target, Props> = {
  [K in keyof Target & keyof Props]: ParameterOrDie<Target[K]>
}

export type ParameterOrDie<T> = T extends (arg: infer P) => any ? P : never
export type ReturnTypeOr<T> = T extends (...args: any) => infer R ? R : T

export const callOnKeys = <T, P extends PropsObj<T, P>>(target: T, props: P): CallOnKeys<T, P> => {
  const res: any = { ...target }

  for (const key in Object.keys(props)) {
    if (typeof res[key] === 'function') {
      res[key] = res[key]((props as any)[key])
    }
  }

  return res
}

const target = {
  a: 'a',
  b: (arg: string) => Number(arg),
}

const props = {
  b: '123' as string,
}

const res = callOnKeys(target, props)

*/

// ────────────────────────────────────────────────────────────────────────────────

/*
 * types to make readonly AST types mutable
 */

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

export type DeepMaybeMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]> | T[P]
}

// ────────────────────────────────────────────────────────────────────────────────

/*
 * clone utils to awoid weird effects when mutating technically readonly ast
 */

/**
 * standard object clone deep fn
 */
export function cloneDeep<T>(target: T): T {
  if (target === null) {
    return target
  }

  if (target instanceof Date) {
    return new Date(target.getTime()) as any
  }

  if (Array.isArray(target)) {
    const copy = [...target] as any[]

    return copy.map(n => cloneDeep(n)) as any
  }

  if (typeof target === 'object' && target !== {}) {
    const copy = { ...target } as { [key: string]: any }

    for (const key in Object.keys(copy)) {
      copy[key] = cloneDeep<any>(copy[key])
    }

    return copy as T
  }

  return target
}

/**
 * search and clone each ast node, but stop traversing after that
 */
export function cloneAST<T>(target: T): T {
  if (target === null) {
    return target
  }

  if (isAstNode(target)) {
    return cloneDeep(target)
  }

  if (Array.isArray(target)) {
    return target.map(n => cloneAST(n)) as any
  }

  if (typeof target === 'object' && target !== {}) {
    const copy = { ...target } as { [key: string]: any }

    for (const key in Object.keys(copy)) {
      copy[key] = cloneAST<any>(copy[key])
    }

    return copy as T
  }

  return target
}

export function clonedNodeOrProps<P, N>(
  fn: (props: P) => N | undefined,
  props: P | N,
): DeepMutable<N> {
  if (isAstNode<N>(props)) {
    return cloneAST(props)
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return fn(cloneAST(props))!
}

// ────────────────────────────────────────────────────────────────────────────────

/*
 * mutable set/ array utils to reduce boilerplate on apis array operations
 *
 * - uses the simplest for loop, because I'm irrationaly afraid of slow loops
 * - pred el is untyped because typescript incoretly extends/infers type of T
 */

/**
 * finds set element
 * - accepts plain pred value
 */
const setGetOneBy = <P>(predFn: (el: any) => P) => <T>(arr: T[], pred: P) =>
  arr.find(el => predFn(el) === pred)

const setHasBy = <P>(predFn: (el: any) => P) => <T>(arr: T[], pred: P) =>
  arr.some(el => predFn(el) === pred)

/**
 * appends set
 * - returns element on success
 */
const setAppendBy = <P>(predFn: (el: any) => P) => <T>(arr: T[], el: T) => {
  const pred = predFn(el)

  for (const prevEl of arr) {
    if (predFn(prevEl) === pred) {
      return
    }
  }

  arr.push(el)

  return el
}

/**
 * appends or merge set element
 * - returns `true` on append / `false` on merge
 */
const setUpsertBy = <P>(predFn: (el: any) => P) => <T>(arr: T[], el: T): boolean => {
  const pred = predFn(el)

  for (let i = 0; i < arr.length; i++) {
    if (predFn(arr[i]) === pred) {
      arr[i] = { ...arr[i], el }
      return false
    }
  }

  arr.push(el)

  return true
}

/**
 * remove set element
 * - plain pred value
 * - return element
 */
const setSpliceBy = <P>(predFn: (el: any) => P) => <T>(arr: T[], pred: P): T | undefined => {
  for (let i = 0; i < arr.length; i++) {
    if (predFn(arr[i]) === pred) {
      return arr.splice(i, 1)[0]
    }
  }

  return
}

const getNodeName = (node: TypeDefinitionNode | FieldDefinitionNode) => node.name.value

/** gets arr element by node name */
export const getByName = setGetOneBy(getNodeName)
/** checks arr element by node name */
export const hasByName = setHasBy(getNodeName)

/** push element by node name ensuring it's unique by node name */
export const appendByName = setAppendBy(getNodeName)
/** push element or merge arr element by node name */
export const upsertByName = setUpsertBy(getNodeName)
/** remove element if exist by node name */
export const spliceByName = setSpliceBy(getNodeName)

/**
 * this type usead as SubsetKeys<Node, Props>
 * ensures that each used fn actually allows ast node on all props
 */
export type SubsetKeys<Of, With> = {
  [K in keyof With & keyof Of]: Of[K]
}

/**
 * generalised node update on array
 * - removes kind from previous value
 * - clone ast in props
 * - merges it all and run through fn
 * - returns element if found
 */
export const updateByNameWith = <Node, Props>(
  arr: Node[],
  pred: string,
  fn: (props: Props | SubsetKeys<Node, Props>) => Node,
  props: Partial<Props>,
): Node | undefined => {
  for (let i = 0; i < arr.length; i++) {
    if (getNodeName(arr[i] as any) === pred) {
      // remove kind from prev so it's treated as props by cloneAST
      const { kind, ...prev } = arr[i] as any

      // clone all new ast from props and update
      arr[i] = fn({ ...prev, ...cloneAST(props) })

      return arr[i]
    }
  }

  return
}
