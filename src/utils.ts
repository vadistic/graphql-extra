import { ASTNode, Kind } from 'graphql'

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

/** accept node or props */
export const nodeFn = <Props, Node>(fn: (props: Props) => Node) => (input: Node | Props): Node =>
  isAstNode<Node>(input) ? input : fn(input)

/** accept array of node or props */
export const nodeFnArr = <A, R>(fn: (arg: A) => R) => arrayable(nodeFn(fn))
/** accept node or props, nullable */
export const nodeFnNullable = <A, R>(fn: (arg: A) => R) => nullable(nodeFn(fn))
/** accept array of node or props, nullable */
export const nodeFnNullableArr = <A, R>(fn: (arg: A) => R) => nullable(arrayable(nodeFn(fn)))

/* same as nodeFn but clones props to avoid mutable magic */
export const nodeFnCloned = <Props, Node>(fn: (props: Props) => Node) => (
  input: Node | Props,
): Node => {
  const cloned = cloneDeep(input)

  return isAstNode<Node>(cloned) ? cloned : fn(cloned)
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

// ────────────────────────────────────────────────────────────────────────────────

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

// ────────────────────────────────────────────────────────────────────────────────

/**
 * gets name from everything or fallback to kind
 */
export function getName(input: any): string {
  if (typeof input === 'string') {
    return input
  }

  if (input.kind === Kind.NAME) {
    return input.value
  }

  if ('name' in input && !!input.name) {
    return getName(input.name)
  }

  if ('kind' in input) {
    return input.kind
  }

  return '???'
}
