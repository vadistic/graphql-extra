import { ASTNode, TypeDefinitionNode, FieldDefinitionNode } from 'graphql'

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

/*
 * utils for resolving node create functions overloads
 */

/**
 * apply props to fn or pass ast node along, with nullability overload
 */

export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props,
): Node
export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props | undefined,
): Node | undefined

export function nodeOrProps<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  input: Node | Props | undefined,
): Node | undefined {
  if (!input) {
    return
  }

  if (isAstNode<Node>(input)) {
    return input
  }

  return fn(input)
}

/**
 * apply each arr element to to fn or pass ast nodes along, with nullability overload
 */

export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[],
): Node[]
export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[] | undefined,
): Node[] | undefined

export function nodeOrPropsArr<Node, Props>(
  fn: (props?: Props) => Node | undefined,
  inputs: (Node | Props)[] | undefined,
): Node[] | undefined {
  if (!inputs) {
    return
  }

  return inputs.map(input => nodeOrProps(fn, input))
}

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
 * uses the simplest for loops, because I'm irrationaly afraid of looping over arrays
 * and those are supposedly the fastest
 */

/**
 * finds set element
 * - accepts plain pred value
 */
export const setGetElBy = <T, R>(predFn: (el: T) => R) => (arr: T[], pred: R) =>
  arr.find(el => predFn(el) === pred)

export const setHasElBy = <T, R>(predFn: (el: T) => R) => (arr: T[], pred: R) =>
  arr.some(el => predFn(el) === pred)

/**
 * appends set
 * - returns `true` on success/ `false` if element already existed
 */
export const setAppendBy = <T, R>(predFn: (el: T) => R) => (arr: T[], el: T) => {
  const pred = predFn(el)

  for (const prevEl of arr) {
    if (predFn(prevEl) === pred) {
      return false
    }
  }

  arr.push(el)

  return true
}

/**
 * appends or merge set element
 * - returns `true` on append / `false` on merge
 */
export const setUpsertBy = <T, R>(predFn: (el: T) => R) => (arr: T[], el: T) => {
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
 * - return `true` on success / `false` on not element found
 */
export const setSpliceBy = <T, R>(predFn: (el: T) => R) => (arr: T[], pred: R) => {
  for (let i = 0; i < arr.length; i++) {
    if (predFn(arr[i]) === pred) {
      arr.splice(i, 1)
      return true
    }
  }

  return false
}

export const byNodeName = (node: TypeDefinitionNode | FieldDefinitionNode) => node.name.value

export const getByName = setGetElBy(byNodeName)
export const hasByName = setHasElBy(byNodeName)

export const appendByName = setAppendBy(byNodeName)
export const upsertByName = setUpsertBy(byNodeName)
export const spliceByName = setSpliceBy(byNodeName)
