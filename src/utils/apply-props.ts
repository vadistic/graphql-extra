import type { ASTNode } from 'graphql'

import { cloneDeep } from './clone-deep'


export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

export function isScalarValue<T>(value: T): boolean {
  return (
    value === null
    || typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
  )
}

// ────────────────────────────────────────────────────────────────────────────────

/** transform fn to nullable version: no input => no return */
export const nullableFn = <A, R>(fn: (arg: A) => R) => (arg?: A): R | undefined => {
  if (arg) {
    return fn(arg)
  }

  return undefined
}

/** transform fn to map over array of inputs */
export const arrayableFn = <A, R>(fn: (arg: A) => R) => (arr: ReadonlyArray<A>): ReadonlyArray<R> =>
  arr.map(fn)

export const propsOrNode = <P, N>(fn: (props: P) => N) => (props: P | N): N =>
  (isAstNode<N>(props) ? props : fn(props))

/** accept node or props */
export const applyProps = <P, N>(fn: (props: P) => N, props: P | N): N => propsOrNode(fn)(props)

/** accept array of nodes/props */
export const applyPropsArr = <P, N>(
  fn: (props: P) => N,
  props: ReadonlyArray<P | N>,
): readonly N[] => arrayableFn(propsOrNode(fn))(props)

/** accept undef or node/props */
export const applyPropsNullable = <P, N>(fn: (props: P) => N, props?: P | N): N | undefined =>
  nullableFn(propsOrNode(fn))(props)

/** accept undef or array of nodes/props */
export const applyPropsNullableArr = <P, N>(
  fn: (props: P) => N,
  props?: ReadonlyArray<P | N>,
): readonly N[] | undefined => nullableFn(arrayableFn(propsOrNode(fn)))(props)

/* same as nodeFn but clones props to avoid mutablity magic */
export const applyPropsCloned = <P, N>(fn: (props: P) => N, props: N | P): N => {
  const cloned = cloneDeep(props)

  return isAstNode<N>(cloned) ? cloned : fn(cloned)
}
