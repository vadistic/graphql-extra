import { ObjectTypeDefinitionNode, NameNode } from 'graphql'
import * as AST from './ast'

export type RootTypeDefinitionProps = Omit<AST.ObjectTypeDefinitionNodeProps, 'name'> & {
  name?: NameNode | string
}

export function queryType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

export function mutationType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

export function subscriptionType(props: RootTypeDefinitionProps): ObjectTypeDefinitionNode {
  return AST.objectTypeDefinitionNode({ name: 'Query', ...props })
}

export const type = {
  named: AST.namedTypeNode,
  list: AST.listTypeNode,
  nonNull: AST.nonNullTypeNode,

  // build-ins
  id: () => AST.namedTypeNode('ID'),
  int: () => AST.namedTypeNode('Int'),
  float: () => AST.namedTypeNode('Float'),
  bool: () => AST.namedTypeNode('Boolean'),
  string: () => AST.namedTypeNode('String'),

  // extras
  json: () => AST.namedTypeNode('Json'),
  date: () => AST.namedTypeNode('Date'),
  dateTime: () => AST.namedTypeNode('DateTime'),
}

export const value = {
  variable: AST.variableNode,
  int: AST.intValueNode,
  float: AST.floatValueNode,
  bool: AST.booleanValueNode,
  object: AST.objectValueNode,
  null: AST.nullValueNode,
  string: AST.stringValueNode,
  enum: AST.enumValueNode,
  list: AST.listValueNode,
  objectField: AST.objectFieldNode,
}

export const objectType = AST.objectTypeDefinitionNode
export const interfaceType = AST.interfaceTypeDefinitionNode
export const unionType = AST.unionTypeDefinitionNode
export const scalarType = AST.scalarTypeDefinitionNode
export const enumType = AST.enumTypeDefinitionNode
export const inputObjectType = AST.inputObjectTypeDefinitionNode

// directive
export const directiveDef = AST.directiveDefinitionNode

// fields
export const fieldDef = AST.fieldDefinitionNode
export const inputVal = AST.inputValueDefinitionNode

// schema
export const schema = AST.schemaDefinitionNode
export const operationType = AST.operationTypeDefinitionNode

// executable
export const operation = AST.operationDefinitionNode
export const fragment = AST.fragmentDefinitionNode
export const fragmentSpread = AST.fragmentSpreadNode
export const inlineFragment = AST.inlineFragmentNode
export const field = AST.fieldNode
export const variable = AST.variableDefinitionNode

// other
export const enumValue = AST.enumValueDefinitionNode
export const arg = AST.argumentNode
export const directive = AST.directiveNode
export const name = AST.nameNode
export const document = AST.documentNode
export const selectionSet = AST.selectionSetNode
