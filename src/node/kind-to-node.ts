import * as AST from './ast'

/**
 * @category Helper
 */
export const astKindToNodeFnMap = {
  // NAME
  Name: AST.nameNode,

  // DOCUMENT
  Document: AST.documentNode,
  OperationDefinition: AST.operationDefinitionNode,
  VariableDefinition: AST.variableDefinitionNode,
  SelectionSet: AST.selectionSetNode,
  Field: AST.fieldNode,
  Argument: AST.argumentNode,

  // FRAGMENTS
  FragmentSpread: AST.fragmentSpreadNode,
  InlineFragment: AST.inlineFragmentNode,
  FragmentDefinition: AST.fragmentDefinitionNode,

  // VALUES
  Variable: AST.variableNode,
  IntValue: AST.intValueNode,
  FloatValue: AST.floatValueNode,
  StringValue: AST.stringValueNode,
  BooleanValue: AST.booleanValueNode,
  NullValue: AST.nullValueNode,
  EnumValue: AST.enumValueNode,
  ListValue: AST.listValueNode,
  ObjectValue: AST.objectValueNode,
  ObjectField: AST.objectFieldNode,

  // DIRECTIVES
  Directive: AST.directiveNode,

  // TYPES
  NamedType: AST.namedTypeNode,
  ListType: AST.listTypeNode,
  NonNullType: AST.nonNullTypeNode,

  // TYPE SYSTEM DEFINITIONS
  SchemaDefinition: AST.schemaDefinitionNode,
  OperationTypeDefinition: AST.operationTypeDefinitionNode,

  // TYPE DEFINITIONS
  ScalarTypeDefinition: AST.scalarTypeDefinitionNode,
  ObjectTypeDefinition: AST.objectTypeDefinitionNode,
  InterfaceTypeDefinition: AST.interfaceTypeDefinitionNode,
  UnionTypeDefinition: AST.unionTypeDefinitionNode,
  EnumValueDefinition: AST.enumValueDefinitionNode,
  InputObjectTypeDefinition: AST.inputObjectTypeDefinitionNode,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: AST.fieldDefinitionNode,
  InputValueDefinition: AST.inputValueDefinitionNode,
  EnumTypeDefinition: AST.enumTypeDefinitionNode,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: AST.directiveDefinitionNode,

  // TYPE SYSTEM EXTENSIONS
  SchemaExtension: AST.schemaExtensionNode,

  // TYPE EXTENSIONS
  ScalarTypeExtension: AST.scalarTypeExtensionNode,
  ObjectTypeExtension: AST.objectTypeExtensionNode,
  InterfaceTypeExtension: AST.interfaceTypeExtensionNode,
  UnionTypeExtension: AST.unionTypeExtensionNode,
  EnumTypeExtension: AST.enumTypeExtensionNode,
  InputObjectTypeExtension: AST.inputObjectTypeExtensionNode,
}

/**
 * @category Helper
 */
export type AstKindToNodeFnMap = typeof astKindToNodeFnMap

/**
 * @category Helper
 */
export type AstKindToNodeFnParm<K> = K extends keyof AstKindToNodeFnMap
  ? Parameters<AstKindToNodeFnMap[K]>[0]
  : never

/**
 * @category Helper
 */
export type AstKindToNodeFn<K> = K extends keyof AstKindToNodeFnMap
  ? (props: Parameters<typeof astKindToNodeFnMap[K]>[0]) => ReturnType<typeof astKindToNodeFnMap[K]>
  : never

/**
 * @category Helper
 */
export function astKindToNodeFn<K extends keyof AstKindToNodeFnMap>(kind: K): (
  props: Parameters<typeof astKindToNodeFnMap[K]>[0],
) => ReturnType<typeof astKindToNodeFnMap[K]> {
  return (astKindToNodeFnMap as any)[kind]
}
