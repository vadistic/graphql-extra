import { ObjectTypeDefinitionNode, NameNode } from 'graphql'
import * as AST from './ast'

export type RootTypeDefinitionProps = Omit<AST.ObjectTypeDefinitionNodeProps, 'name'> & {
  name?: NameNode | AST.NameNodeProps
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

// NAME

export const name = AST.nameNode

// DOCUMENT

export const document = AST.documentNode
export const operation = AST.operationDefinitionNode
export const variable = AST.variableDefinitionNode
export const selections = AST.selectionSetNode
export const field = AST.fieldNode
export const arg = AST.argumentNode

// FRAGMENTS

export const fragmentSpread = AST.fragmentSpreadNode
export const inlineFragment = AST.inlineFragmentNode
export const fragmentDef = AST.fragmentDefinitionNode

// VALUES

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

// DIRECTIVES

export const directive = AST.directiveNode

// TYPES

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

  // common extras
  json: () => AST.namedTypeNode('JSON'),
  date: () => AST.namedTypeNode('Date'),
  dateTime: () => AST.namedTypeNode('DateTime'),
}

// TYPE SYSTEM DEFINITIONS

export const schemaDef = AST.schemaDefinitionNode

export const operationType = AST.operationTypeDefinitionNode

/// TYPE DEFINITIONS

export const scalarType = AST.scalarTypeDefinitionNode
export const objectType = AST.objectTypeDefinitionNode
export const interfaceType = AST.interfaceTypeDefinitionNode
export const unionType = AST.unionTypeDefinitionNode
export const enumType = AST.enumTypeDefinitionNode
export const inputType = AST.inputObjectTypeDefinitionNode

// TYPE FIELD DEFINITIONS

export const fieldDef = AST.fieldDefinitionNode
export const inputVal = AST.inputValueDefinitionNode
export const enumVal = AST.enumValueDefinitionNode

// DIRECTIVE DEFINITIONS

export const directiveDef = AST.directiveDefinitionNode

// TYPE SYSTEM EXTENSIONS

export const schemaExt = AST.schemaExtensionNode

// TYPE EXTENSIONS

export const objectExt = AST.objectTypeExtensionNode
export const interfaceExt = AST.interfaceTypeExtensionNode
export const unionExt = AST.unionTypeExtensionNode
export const scalarExt = AST.scalarTypeExtensionNode
export const enumExt = AST.enumTypeExtensionNode
export const inputObjectExt = AST.inputObjectTypeExtensionNode
