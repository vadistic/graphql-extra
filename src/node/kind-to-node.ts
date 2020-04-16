import {
  argumentNode,
  booleanValueNode,
  directiveDefinitionNode,
  directiveNode,
  documentNode,
  enumTypeDefinitionNode,
  enumTypeExtensionNode,
  enumValueDefinitionNode,
  enumValueNode,
  fieldDefinitionNode,
  fieldNode,
  floatValueNode,
  fragmentDefinitionNode,
  fragmentSpreadNode,
  inlineFragmentNode,
  inputObjectTypeDefinitionNode,
  inputObjectTypeExtensionNode,
  inputValueDefinitionNode,
  interfaceTypeDefinitionNode,
  interfaceTypeExtensionNode,
  intValueNode,
  listTypeNode,
  listValueNode,
  namedTypeNode,
  nameNode,
  nonNullTypeNode,
  nullValueNode,
  objectFieldNode,
  objectTypeDefinitionNode,
  objectTypeExtensionNode,
  objectValueNode,
  operationDefinitionNode,
  operationTypeDefinitionNode,
  scalarTypeDefinitionNode,
  scalarTypeExtensionNode,
  schemaDefinitionNode,
  schemaExtensionNode,
  selectionSetNode,
  stringValueNode,
  unionTypeDefinitionNode,
  unionTypeExtensionNode,
  variableDefinitionNode,
  variableNode,
} from './ast'

/**
 * @category Helper
 */
export const astKindToNodeFnMap = {
  // NAME
  Name: nameNode,

  // DOCUMENT
  Document: documentNode,
  OperationDefinition: operationDefinitionNode,
  VariableDefinition: variableDefinitionNode,
  SelectionSet: selectionSetNode,
  Field: fieldNode,
  Argument: argumentNode,

  // FRAGMENTS
  FragmentSpread: fragmentSpreadNode,
  InlineFragment: inlineFragmentNode,
  FragmentDefinition: fragmentDefinitionNode,

  // VALUES
  Variable: variableNode,
  IntValue: intValueNode,
  FloatValue: floatValueNode,
  StringValue: stringValueNode,
  BooleanValue: booleanValueNode,
  NullValue: nullValueNode,
  EnumValue: enumValueNode,
  ListValue: listValueNode,
  ObjectValue: objectValueNode,
  ObjectField: objectFieldNode,

  // DIRECTIVES
  Directive: directiveNode,

  // TYPES
  NamedType: namedTypeNode,
  ListType: listTypeNode,
  NonNullType: nonNullTypeNode,

  // TYPE SYSTEM DEFINITIONS
  SchemaDefinition: schemaDefinitionNode,
  OperationTypeDefinition: operationTypeDefinitionNode,

  // TYPE DEFINITIONS
  ScalarTypeDefinition: scalarTypeDefinitionNode,
  ObjectTypeDefinition: objectTypeDefinitionNode,
  InterfaceTypeDefinition: interfaceTypeDefinitionNode,
  UnionTypeDefinition: unionTypeDefinitionNode,
  EnumValueDefinition: enumValueDefinitionNode,
  InputObjectTypeDefinition: inputObjectTypeDefinitionNode,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: fieldDefinitionNode,
  InputValueDefinition: inputValueDefinitionNode,
  EnumTypeDefinition: enumTypeDefinitionNode,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: directiveDefinitionNode,

  // TYPE SYSTEM EXTENSIONS
  SchemaExtension: schemaExtensionNode,

  // TYPE EXTENSIONS
  ScalarTypeExtension: scalarTypeExtensionNode,
  ObjectTypeExtension: objectTypeExtensionNode,
  InterfaceTypeExtension: interfaceTypeExtensionNode,
  UnionTypeExtension: unionTypeExtensionNode,
  EnumTypeExtension: enumTypeExtensionNode,
  InputObjectTypeExtension: inputObjectTypeExtensionNode,
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
export function astKindToNodeFn<K extends keyof AstKindToNodeFnMap>(
  kind: K,
): (
    props: Parameters<typeof astKindToNodeFnMap[K]>[0],
  ) => ReturnType<typeof astKindToNodeFnMap[K]> {
  return (astKindToNodeFnMap as any)[kind]
}
