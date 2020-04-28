import type { ASTNode } from 'graphql'

import { cloneDeep } from './clone-deep'

export function isAstNode<Node = ASTNode>(input: any): input is Node {
  return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string'
}

export type Primitive = string | number | boolean | null

export function isPrimitive(value: any): value is Primitive {
  return (
    value === null
    || typeof value === 'string'
    || typeof value === 'number'
    || typeof value === 'boolean'
  )
}

// ────────────────────────────────────────────────────────────────────────────────

const nullableFn = <A, R>(fn: (arg: A) => R) => (arg?: A): R | undefined => {
  if (arg) {
    return fn(arg)
  }

  return undefined
}

const nullableImplicitFn = <A, R>(fn: (arg: A) => R) => (arg: A): R => {
  if (arg !== undefined) {
    return fn(arg)
  }

  return undefined as any
}

const arrayableFn = <A, R>(fn: (arg: A) => R) => (arr: ReadonlyArray<A>): ReadonlyArray<R> =>
  arr.map(fn)

const propsOrNodeFn = <P, N>(fn: (props: P) => N) => (props: P | N): N =>
  // test for undef to implicitly support partials
  // eslint-disable-next-line no-nested-ternary
  (isAstNode<N>(props) ? props : (props ? fn(props) : undefined as any))

const partialFn = <P, N>(fn: (props: P) => N) => (props: P | Partial<P | N>): Partial<N> => {
  const partial = fn(props as any)

  Object.keys(partial).forEach((key) => {
    if (partial[key as keyof N] === undefined) {
      delete partial[key as keyof N]
    }
  })

  return partial
}

const clonedFn = <P, N>(fn: (props: P) => N) => (props: P): N => fn(cloneDeep(props))

// ────────────────────────────────────────────────────────────────────────────────

/** just nullable */
export function applyNullable<P, N>(fn: (props: P) => N, props?: P): N | undefined {
  return nullableFn(fn)(props)
}

/** just implicitly nullable */
export function applyNullableImplicit<P, N>(fn: (props: P) => N, props: P): N {
  return nullableImplicitFn(fn)(props)
}

/** implicitly nullable + props or node */
export function applyProps <P, N>(fn: (props: P) => N, props: P | N): N {
  return nullableImplicitFn(propsOrNodeFn(fn))(props)
}

/** implicitly nullable + on array + props or node */
export function applyPropsArr <P, N>(fn: (props: P) => N, props: ReadonlyArray<P | N>): readonly N[] {
  return nullableImplicitFn(arrayableFn(propsOrNodeFn(fn)))(props)
}

/** nullable + props or node */
export function applyPropsNullable <P, N>(fn: (props: P) => N, props?: P | N): N | undefined {
  return nullableFn(propsOrNodeFn(fn))(props)
}

/** nullable + on array + props or node */
export function applyPropsNullableArr <P, N>(fn: (props: P) => N, props?: ReadonlyArray<P | N>):
readonly N[] | undefined {
  return nullableFn(arrayableFn(propsOrNodeFn(fn)))(props)
}


// ! partials always apply function without nodeOrProps skip
// because it cannot be easily determined if a partial is a valid ast node
// it's safe because all ast functions are partial-ready

// cloned also does it because it's used in crud methods that can accept kind

/** implicitly nullable + cloned input + props or node */
export function applyPropsCloned <P, N>(fn: (props: P) => N, props: N | P): N {
  return nullableImplicitFn(clonedFn(fn))(props as P)
}

/** implicitly nullable + partial */
export function applyPropsPartial <P, N>(fn: (props: P) => N, props: P | Partial<P | N>): Partial<N> {
  return nullableImplicitFn(partialFn(fn))(props)
}

/** implicitly nullable + cloned input + partial */
export function applyPropsClonedPartial <P, N>(fn: (props: P) => N, props: P | Partial<N | P>): Partial<N> {
  return nullableImplicitFn(clonedFn(partialFn(fn)))(props)
}
