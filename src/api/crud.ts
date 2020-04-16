/* eslint-disable no-param-reassign */
import { applyPropsCloned, isScalar } from '../utils'

export interface OneToManyGetProps {
  node: any
  key: string
  elementName: string
  parentName: string
}

export function oneToManyGet<Node>({
  node,
  key,
  elementName,
  parentName,
}: OneToManyGetProps): Node {
  const res = (node[key] || []).find((el: any) => el.name.value === elementName)

  if (!res) {
    throw Error(`${key} element '${elementName}' on ${node.kind} '${parentName}' does not exist`)
  }

  return res
}

// ────────────────────────────────────────────────────────────────────────────────

export interface OneToManyCreateProps<Node, Props> {
  node: any
  key: string
  elementName: string
  parentName: string
  nodeCreateFn: (props: Props) => Node
  props: Props
}

export function oneToManyCreate<Node, Props>({
  node,
  key,
  elementName,
  parentName,
  props,
  nodeCreateFn,
}: OneToManyCreateProps<Node, Props>): void {
  if (!node[key]) {
    node[key] = [] as any
  }

  const property = (node[key] || []) as any[]
  const index = property.findIndex((el) => el.name.value === elementName)

  if (index !== -1) {
    throw Error(`${key} element '${elementName}' on ${node.kind} '${parentName}' already exist`)
  }

  property.push(applyPropsCloned(nodeCreateFn, props))
}

// ────────────────────────────────────────────────────────────────────────────────

export interface OneToManyUpdateProps<Node, Props> {
  node: any
  key: string
  elementName: string
  parentName: string
  nodeCreateFn: (props: Props) => Node
  props: Props | Partial<Props | Node>
}

export function oneToManyUpdate<Node, Props>({
  node,
  key,
  elementName,
  parentName,
  props,
  nodeCreateFn,
}: OneToManyUpdateProps<Node, Props>): void {
  if (!node[key]) {
    node[key] = []
  }

  const property: any[] = node[key]

  const index = property.findIndex((el) => el.name.value === elementName)

  if (property.length === 0 || index === -1) {
    throw Error(`${key} element '${elementName}' on ${node.kind} '${parentName}' does not exist`)
  }

  const { kind, ...prevProps } = property[index]
  const nextProps = isScalar(props) ? props : { ...prevProps, ...props }

  property[index] = applyPropsCloned(nodeCreateFn, nextProps)
}

// ────────────────────────────────────────────────────────────────────────────────

export function oneToManyUpsert<Node, Props>({
  node,
  key,
  elementName,
  props,
  nodeCreateFn,
}: OneToManyCreateProps<Node, Props>): void {
  if (!node[key]) {
    node[key] = []
  }

  const property: any[] = node[key]
  const index = property.findIndex((el) => el.name.value === elementName)
  const { kind, ...prevProps } = property[index]
  const nextProps = isScalar(props) ? props : { ...prevProps, ...props }

  const next = applyPropsCloned(nodeCreateFn, nextProps)

  if (index === -1) {
    property[index] = next
  }
  else {
    property.push(next)
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export function oneToManyRemove({
  node, key, elementName, parentName,
}: OneToManyGetProps): void {
  if (!node[key]) {
    node[key] = []
  }

  const property: any[] = node[key]
  const index = property.findIndex((el) => el.name.value === elementName)

  if (index === -1) {
    throw Error(`${key} element '${elementName}' on ${node.kind} '${parentName}' does not exist`)
  }

  property.splice(index, 1)
}
