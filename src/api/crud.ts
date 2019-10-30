import { applyPropsCloned, cloneDeep } from '../utils'

//
// ────────────────────────────────────────────────  ──────────
//   :::::: C R U D : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────
//

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
    throw Error(`${singular(key)} '${elementName}' on '${parentName}' does not exist`)
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
}: OneToManyCreateProps<Node, Props>) {
  if (!node[key]) {
    node[key] = [] as any
  }

  const property = (node[key] || []) as any[]
  const index = property.findIndex(el => el.name.value === elementName)

  if (index !== -1) {
    throw Error(`${singular(key)} '${elementName}' on '${parentName}' already exist`)
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
  props: Partial<Props | Node>
}

export function oneToManyUpdate<Node, Props>({
  node,
  key,
  elementName,
  parentName,
  props,
  nodeCreateFn,
}: OneToManyUpdateProps<Node, Props>) {
  const property = (node[key] || []) as any[]
  const index = property.findIndex(el => el.name.value === elementName)

  if (property.length === 0 || index === -1) {
    throw Error(`${singular(key)} '${elementName}' on '${parentName}' does not exist`)
  }

  const { kind, ...prev } = property[index]

  // clone only new part
  property[index] = nodeCreateFn({ ...prev, ...cloneDeep(props) })
}

// ────────────────────────────────────────────────────────────────────────────────

export function oneToManyUpsert<Node, Props>({
  node,
  key,
  elementName,
  props,
  nodeCreateFn,
}: OneToManyCreateProps<Node, Props>) {
  if (!node[key]) {
    node[key] = []
  }

  const property = (node[key] || []) as any[]
  const index = property.findIndex(el => el.name.value === elementName)
  const next = applyPropsCloned(nodeCreateFn, props)

  if (index === -1) {
    property[index] = next
  } else {
    property.push(next)
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export function oneToManyRemove({ node, key, elementName, parentName }: OneToManyGetProps) {
  const property = (node[key] || []) as any[]
  const index = property.findIndex(el => el.name.value === elementName)

  if (index === -1) {
    throw Error(`${singular(key)} '${elementName}' on '${parentName}' does not exist`)
  }

  property.splice(index, 1)
}

// ────────────────────────────────────────────────────────────────────────────────

function singular(key: string) {
  return key.replace(/s$/, '')
}
