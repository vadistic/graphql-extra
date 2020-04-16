import type { ASTNode } from 'graphql'

export type GuardType<T> = T extends (o: any) => o is infer U ? U : never

export type ContstructorType<T> = T extends new (...args: any) => infer U ? U : never


// ────────────────────────────────────────────────────────────────────────────────

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}


export function isScalar<T>(value: T): boolean {
  return (
    value === null
    || typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
  )
}

// ────────────────────────────────────────────────────────────────────────────────

/** transform fn to nullable version: no input => no return */
export const nullable = <A, R>(fn: (arg: A) => R) => (arg?: A): R | undefined => {
  if (arg) {
    return fn(arg)
  }

  return undefined
}

/** transform fn to map over array of inputs */
export const arrayable = <A, R>(fn: (arg: A) => R) => (arr: ReadonlyArray<A>): ReadonlyArray<R> =>
  arr.map(fn)

export const propsOrNode = <P, N>(fn: (props: P) => N) => (props: P | N): N =>
  (isAstNode<N>(props) ? props : fn(props))

/** accept node or props */
export const applyProps = <P, N>(fn: (props: P) => N, props: P | N): N => propsOrNode(fn)(props)

/** accept array of nodes/props */
export const applyPropsArr = <P, N>(
  fn: (props: P) => N, props: ReadonlyArray<P | N>,
): readonly N[] => arrayable(propsOrNode(fn))(props)

/** accept undef or node/props */
export const applyPropsNullable = <P, N>(fn: (props: P) => N, props?: P | N): N | undefined =>
  nullable(propsOrNode(fn))(props)

/** accept undef or array of nodes/props */
export const applyPropsNullableArr = <P, N>(
  fn: (props: P) => N, props?: ReadonlyArray<P | N>,
): readonly N[] | undefined => nullable(arrayable(propsOrNode(fn)))(props)

/* same as nodeFn but clones props to avoid mutablity magic */
export const applyPropsCloned = <P, N>(fn: (props: P) => N, props: N | P): N => {
  const cloned = cloneDeep(props)

  return isAstNode<N>(cloned) ? cloned : fn(cloned)
}

// ────────────────────────────────────────────────────────────────────────────────

/** mark each object property as mutable */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/** recursively mark each object property as mutable */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

/** assert input as `Mutable<T>` */
export const mutable = <T>(node: T): Mutable<T> => node

/** assert input as `DeepMutable<T>` */
export const deepMutable = <T>(node: T): DeepMutable<T> => node


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
