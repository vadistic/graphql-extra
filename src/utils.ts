import { ASTNode, Kind } from 'graphql'

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

/**
 * gets name from stuff
 */
export function getName(input: any): string {
  if (typeof input === 'string') {
    return input
  }

  if ('kind' in input && input.kind === Kind.NAME) {
    return input.value
  }

  if ('name' in input && !!input.name) {
    return getName(input.name)
  }

  if ('kind' in input && !!input.kind) {
    return input.kind
  }

  return 'unknown'
}

// ────────────────────────────────────────────────────────────────────────────────

//  no input => no return
export const nullable = <A, R>(fn: (arg: A) => R) => (arg?: A): R | undefined => {
  if (arg) {
    return fn(arg)
  }
}

// apply fn to array of inputs
export const arrayable = <A, R>(fn: (arg: A) => R) => (arr: ReadonlyArray<A>): ReadonlyArray<R> =>
  arr.map(fn)

export const propsOrNode = <P, N>(fn: (props: P) => N) => (props: P | N) =>
  isAstNode<N>(props) ? props : fn(props)

/** accept node or props */
export const applyProps = <P, N>(fn: (props: P) => N, props: P | N) => propsOrNode(fn)(props)

/** accept array of nodes/props */
export const applyPropsArr = <P, N>(fn: (props: P) => N, props: ReadonlyArray<P | N>) =>
  arrayable(propsOrNode(fn))(props)

/** accept undef or node/props */
export const applyPropsNullable = <P, N>(fn: (props: P) => N, props?: P | N) =>
  nullable(propsOrNode(fn))(props)

/** accept undef or array of nodes/props */
export const applyPropsNullableArr = <P, N>(fn: (props: P) => N, props?: ReadonlyArray<P | N>) =>
  nullable(arrayable(propsOrNode(fn)))(props)

/* same as nodeFn but clones props to avoid mutable magic */
export const applyPropsCloned = <P, N>(fn: (props: P) => N, props: N | P): N => {
  const cloned = cloneDeep(props)

  return isAstNode<N>(cloned) ? cloned : fn(cloned)
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

export const deepMutable = <T>(node: T) => node as DeepMutable<T>

export const mutable = <T>(node: T) => node as Mutable<T>

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

    return copy.map((n) => cloneDeep(n)) as any
  }

  if (typeof target === 'object' && target !== {}) {
    const copy = { ...target } as { [key: string]: any }

    for (const key of Object.keys(copy)) {
      copy[key] = cloneDeep<any>(copy[key])
    }

    return copy as T
  }

  return target
}
