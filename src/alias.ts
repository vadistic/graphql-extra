import { ObjectTypeDefinitionNode, NameNode } from 'graphql'
import {
  objectTypeDefinitionNode,
  interfaceTypeDefinitionNode,
  unionTypeDefinitionNode,
  scalarTypeDefinitionNode,
  intValueNode,
  floatValueNode,
  booleanValueNode,
  objectValueNode,
  nullValueNode,
  stringValueNode,
  nameNode,
  documentNode,
  operationDefinitionNode,
  variableDefinitionNode,
  variableNode,
  selectionSetNode,
  fieldNode,
  fragmentDefinitionNode,
  fragmentSpreadNode,
  inlineFragmentNode,
  argumentNode,
  enumValueNode,
  listValueNode,
  objectFieldNode,
  directiveNode,
  directiveDefinitionNode,
  namedTypeNode,
  listTypeNode,
  nonNullTypeNode,
  schemaDefinitionNode,
  operationTypeDefinitionNode,
  fieldDefinitionNode,
  inputValueDefinitionNode,
  ObjectTypeDefinitionNodeProps,
  enumTypeDefinitionNode,
  enumValueDefinitionNode,
} from './node'

export type RootTypeDefinitionProps = Omit<ObjectTypeDefinitionNodeProps, 'name'> & {
  name?: NameNode | string
}

export function queryType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return objectTypeDefinitionNode({ name: 'Query', ...props })
}

export function mutationType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return objectTypeDefinitionNode({ name: 'Query', ...props })
}

export function subscriptionType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return objectTypeDefinitionNode({ name: 'Query', ...props })
}

export const type = {
  named: namedTypeNode,
  list: listTypeNode,
  nonNull: nonNullTypeNode,

  // build-ins
  id: () => namedTypeNode('ID'),
  int: () => namedTypeNode('Int'),
  float: () => namedTypeNode('Float'),
  bool: () => namedTypeNode('Boolean'),
  string: () => namedTypeNode('String'),

  // extras
  json: () => namedTypeNode('Json'),
  date: () => namedTypeNode('Date'),
  dateTime: () => namedTypeNode('DateTime'),
}

export const value = {
  variable: variableNode,
  int: intValueNode,
  float: floatValueNode,
  bool: booleanValueNode,
  object: objectValueNode,
  null: nullValueNode,
  string: stringValueNode,
  enum: enumValueNode,
  list: listValueNode,
  objectField: objectFieldNode,
}

/**
 * Shorthand, one-import ast node utility
 */

export const t = {
  // root queries
  queryType,
  mutationType,
  subscriptionType,

  // reexport
  type,
  value,

  // type system definition
  objectType: objectTypeDefinitionNode,
  interfaceType: interfaceTypeDefinitionNode,
  unionType: unionTypeDefinitionNode,
  scalarType: scalarTypeDefinitionNode,
  enumType: enumTypeDefinitionNode,

  // directive
  directiveDef: directiveDefinitionNode,

  // fields
  fieldDef: fieldDefinitionNode,
  inputVal: inputValueDefinitionNode,

  // schema
  schema: schemaDefinitionNode,
  operationType: operationTypeDefinitionNode,

  // executable
  operation: operationDefinitionNode,
  fragment: fragmentDefinitionNode,
  fragmentSpread: fragmentSpreadNode,
  inlineFragment: inlineFragmentNode,
  field: fieldNode,
  variable: variableDefinitionNode,

  // other
  enumValue: enumValueDefinitionNode,
  arg: argumentNode,
  directive: directiveNode,
  name: nameNode,
  document: documentNode,
  selectionSet: selectionSetNode,
}
