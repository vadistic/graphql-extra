import { nodeFnCloned, cloneDeep } from './utils'

function errPrefix(action: string, key: string) {
  return action + key[0].toUpperCase() + key.slice(1).replace(/s$/, '') + '(): '
}

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
    throw Error(
      errPrefix('create', key) + `${key}: '${elementName}' on '${parentName}' already exists`,
    )
  }

  property.push(nodeFnCloned(nodeCreateFn)(props))
}

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
    throw Error(errPrefix('update', key) + `'${elementName}' on '${parentName}' does not exist`)
  }

  const { kind, ...prev } = property[index]

  // clone only new part
  property[index] = nodeCreateFn({ ...prev, ...cloneDeep(props) })
}

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
  const next = nodeFnCloned(nodeCreateFn)(props)

  if (index === -1) {
    property[index] = next
  } else {
    property.push(next)
  }
}

export interface OneToManyRemoveProps {
  node: any
  key: string
  elementName: string
  parentName: string
}

export function oneToManyRemove({ node, key, elementName, parentName }: OneToManyRemoveProps) {
  const property = (node[key] || []) as any[]
  const index = property.findIndex(el => el.name.value === elementName)

  if (index === -1) {
    throw Error(errPrefix('remove', key) + `'${elementName}' on '${parentName}' does not exist`)
  }

  property.splice(index, 1)
}
