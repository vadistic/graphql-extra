/* eslint-disable no-param-reassign */
import { ASTNode, GraphQLError } from 'graphql'

import { ArrayElement } from '../types'
import { isPrimitive, applyPropsCloned, Primitive } from './apply-props'
import { getName } from './get-name'
import { concat } from './mutable'

export interface CrudProps<Node extends ASTNode, Key extends keyof Node, Target, Props> {
  node: Node
  key: Key
}

// ────────────────────────────────────────────────────────────────────────────────


export interface CrudFindOneProps<Node extends ASTNode, Key extends keyof Node, Target, Props> {
  getter: (el: ArrayElement<Node[Key]>) => Target
  target: Target
}

export function crudFindOne <N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  getter,
  target,
}: CrudProps<N, K, T, P> & CrudFindOneProps<N, K, T, P>): ArrayElement<N[K]> {
  const res = ((node[key] || []) as any[]).find((el: any) => getter(el) === target)

  if (!res) {
    throw new GraphQLError(
      `cannot get '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist', node,
    )
  }

  return res
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudCreateProps <Node extends ASTNode, Key extends keyof Node, Target, Props> {
  getter: (el: ArrayElement<Node[Key]>) => Target
  factory: (props: Props) => ArrayElement<Node[Key]>
  props: Props | ArrayElement<Node[Key]>
}

export function crudCreate <N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  getter,
  factory,
  props,
}: CrudProps<N, K, T, P>& CrudCreateProps<N, K, T, P>): void {
  const next = applyPropsCloned(factory, props)
  const target = getter(next)
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index !== -1) {
    throw new GraphQLError(
      `cannot create '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it already exists', node,
    )
  }

  const arr = (node[key] || []) as any[]

  if (!node[key]) {
    node[key] = arr as any
  }

  concat(arr, next)
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudUpdateProps <Node extends ASTNode, Key extends keyof Node, Target, Props> {
  getter: (el: ArrayElement<Node[Key]>) => Target
  factory: (props: Props) => ArrayElement<Node[Key]>
  target: Target
  props: (Props extends Primitive ? Props : Partial<Props>) | ArrayElement<Node[Key]>
}

export function crudUpdate <N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  getter,
  factory,
  props,
  target,
}: CrudProps<N, K, T, P> & CrudUpdateProps<N, K, T, P>): void {
  const index = ((node[key] || []) as any[]).findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(
      `cannot update '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist', node,
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
    ? { ...prev, ...(applyPropsCloned(factory, props as P)) as any }
    // merge because there is slight chance partial would not play well with factory fns
    : applyPropsCloned(factory, { ...prev, ...props as P })
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudUpsertProps <Node extends ASTNode, Key extends keyof Node, Target, Props> {
  getter: (el: ArrayElement<Node[Key]>) => Target
  factory: (props: Props) => ArrayElement<Node[Key]>
  props: Props | ArrayElement<Node[Key]>
}

export function crudUpsert <N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  getter,
  factory,
  props,
}: CrudProps<N, K, T, P> & CrudUpsertProps<N, K, T, P>): void {
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
    arr[index] = { ...arr[index], ...next as any }
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface CrudRemoveProps<Node extends ASTNode, Key extends keyof Node, Target, Props>{
  getter: (el: ArrayElement<Node[Key]>) => Target
  target: Target
}

export function crudRemove <N extends ASTNode, K extends keyof N, T, P>({
  node,
  key,
  getter,
  target,
}: CrudProps<N, K, T, P> & CrudRemoveProps<N, K, T, P>): void {
  const arr = node[key] as unknown as any[]
  const index = (arr || []).findIndex((el) => getter(el) === target)

  if (index === -1) {
    throw new GraphQLError(
      `cannot remove '${target}' in ${key} of ${node.kind} '${getName(node)}' `
      + 'because it does not exist', node,
    )
  }

  arr.splice(index, 1)
}
