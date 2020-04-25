/* eslint-disable no-param-reassign */
import { ASTNode, GraphQLError } from 'graphql'

import { Typename, ArrayElement } from '../types'
import { isPrimitive, applyPropsCloned, Primitive } from './apply-props'
import { concat } from './mutable'


export interface OneToManyFindOneProps<N extends ASTNode, K extends keyof N, T > {
  node: N
  key: K
  target: T
  getter: (el: ArrayElement<N[K]>) => T
}

export function oneToManyFindOneOrFail<N extends ASTNode, K extends keyof N, T = Typename>({
  node,
  key,
  target,
  getter,
}: OneToManyFindOneProps<N, K, T>): ArrayElement<N[K]> {
  const res = ((node[key] || []) as any[]).find((el: any) => getter(el) === target)

  if (!res) {
    throw new GraphQLError(`cannot get ${target} in ${key} of ${node.kind}`, node)
  }

  return res
}

// ────────────────────────────────────────────────────────────────────────────────

export interface OneToManyCreateProps<N extends ASTNode, K extends keyof N, T, P > {
  node: N
  key: K
  target: T
  getter: (el: ArrayElement<N[K]>) => T
  factory: (props: P) => ArrayElement<N[K]>
  props: P
}

export function oneToManyCreate<N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  target,
  getter,
  factory,
  props,
}: OneToManyCreateProps<N, K, T, P>): void {
  if (!node[key]) {
    node[key] = [] as any
  }

  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index !== -1) {
    throw new GraphQLError(`cannot create '${target}' in ${key} of ${node.kind}`, node)
  }

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  concat(arr, factory(props))
}

// ────────────────────────────────────────────────────────────────────────────────

export interface OneToManyUpdateProps<N extends ASTNode, K extends keyof N, T, P> {
  node: N
  key: K
  target: T
  getter: (el: ArrayElement<N[K]>) => T
  factory: (props: P) => ArrayElement<N[K]>
  props: P extends Primitive ? P : Partial<P>
}

export function oneToManyUpdate<N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  target,
  getter,
  factory,
  props,
}: OneToManyUpdateProps<N, K, T, P>): void {
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(`cannot update '${target}' in ${key} of ${node.kind}`, node)
  }

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  const { kind, ...prev } = arr[index]

  arr[index] = isPrimitive(props)
  // cannot spread primitive props values
    ? { ...prev, ...(applyPropsCloned(factory, props as any) as any) }
  // partial would not play well with factory fns
    : applyPropsCloned(factory, { ...prev, ...props as any })
}

// ────────────────────────────────────────────────────────────────────────────────

export interface OneToManyUpsertProps<N extends ASTNode, K extends keyof N, T, P> {
  node: N
  key: K
  target: T
  getter: (el: ArrayElement<N[K]>) => T
  factory: (props: P) => ArrayElement<N[K]>
  props: P
}

export function oneToManyUpsert<N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  target,
  getter,
  factory,
  props,
}: OneToManyUpsertProps<N, K, T, P>): void {
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  if (index === -1) {
    concat(arr, factory(props))
  }
  else {
    const { kind, ...prev } = arr[index]

    arr[index] = isPrimitive(props)
      // cannot spread primitive props values
      ? { ...prev, ...(applyPropsCloned(factory, props) as any) }
      // partial would not play well with factory fns
      : applyPropsCloned(factory, { ...prev, ...props })
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export function oneToManyRemoveOrFail<N extends ASTNode, K extends keyof N, T = Typename>({
  node, key, target, getter,
}: OneToManyFindOneProps<N, K, T>): void {
  if (!node[key]) {
    (node[key] as unknown as any[]) = []
  }

  const property = node[key] as unknown as any[]
  const index = property.findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(`cannot remove ${target} in ${key} of ${node.kind}`, node)
  }

  property.splice(index, 1)
}
