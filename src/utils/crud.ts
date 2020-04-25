/* eslint-disable no-param-reassign */
import { ASTNode, GraphQLError } from 'graphql'

import { ArrayElement } from '../types'
import { isPrimitive, applyPropsCloned, Primitive } from './apply-props'
import { getName } from './get-name'
import { concat } from './mutable'

export interface CrudProps<N extends ASTNode, K extends keyof N> {
  node: N
  key: K
}

type Getter<N extends ASTNode, K extends keyof N> = (el: ArrayElement<N[K]>) => string | boolean

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudFindOneProps<N extends ASTNode, K extends keyof N, E, P> {
  getter: (el: E) => string | boolean
  target: string | boolean
}

export function crudFindOne<N extends ASTNode, K extends keyof N, E extends ArrayElement<N[K]> & {}, P>({
  node,
  key,
  getter,
  target,
}: CrudProps<N, K> & CrudFindOneProps<N, K, E, P>): ArrayElement<N[K]> {
  const res = ((node[key] || []) as any[]).find((el: any) => getter(el) === target)

  if (!res) {
    throw new GraphQLError(
      `cannot get '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist',
      node,
    )
  }

  return res
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudCreateProps<N extends ASTNode, K extends keyof N, E, P> {
  getter: Getter<N, K>
  factory: (props: P) => E
  props: P | E
}

export function crudCreate<N extends ASTNode, K extends keyof N, E extends ArrayElement<N[K]> & {}, P>({
  node,
  key,
  getter,
  factory,
  props,
}: CrudProps<N, K> & CrudCreateProps<N, K, E, P>): void {
  const next = applyPropsCloned(factory, props)
  const target = getter(next)
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index !== -1) {
    throw new GraphQLError(
      `cannot create '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it already exists',
      node,
    )
  }

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  concat(arr, next)
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudUpdateProps<N extends ASTNode, K extends keyof N, E, P> {
  getter: Getter<N, K>
  factory: (props: P) => E
  target: string | boolean
  // this allows primitives and force typescript to infer P from factory props
  props: P extends Primitive ? P : Partial<P> | E
}

export function crudUpdate<N extends ASTNode, K extends keyof N, E extends ArrayElement<N[K]> & {}, P>({
  node,
  key,
  getter,
  factory,
  props,
  target,
}: CrudProps<N, K> & CrudUpdateProps<N, K, E, P>): void {
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(
      `cannot update '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist',
      node,
    )
  }

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  // remove kind so prev node is converted to "props"
  const { kind, ...prev } = arr[index]

  arr[index] = isPrimitive(props)
    // cannot spread primitive props values
    ? { ...prev, ...(applyPropsCloned(factory, props as P) as any) }
    // merge because there is slight chance partial would not play well with factory fns
    : applyPropsCloned(factory, { ...prev, ...(props as P) })
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudUpsertProps<N extends ASTNode, K extends keyof N, E, P> {
  getter: Getter<N, K>
  factory: (props: P) => E
  props: P | E
}

export function crudUpsert<N extends ASTNode, K extends keyof N, E extends ArrayElement<N[K]> & {}, P>({
  node,
  key,
  getter,
  factory,
  props,
}: CrudProps<N, K> & CrudUpsertProps<N, K, E, P>): void {
  const next = applyPropsCloned(factory, props)
  const target = getter(next)
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  if (index === -1) {
    concat(arr, next)
  }
  else {
    arr[index] = { ...arr[index], ...next }
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudRemoveProps<N extends ASTNode, K extends keyof N, E, P> {
  getter: Getter<N, K>
  target: string | boolean
}

export function crudRemove<N extends ASTNode, K extends keyof N, E extends ArrayElement<N[K]> & {}, P>({
  node,
  key,
  getter,
  target,
}: CrudProps<N, K> & CrudRemoveProps<N, K, E, P>): void {
  const arr = (node[key] as unknown) as any[]
  const index = (arr || []).findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(
      `cannot remove '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist',
      node,
    )
  }

  arr.splice(index, 1)
}
