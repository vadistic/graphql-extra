import * as AST from './ast'

/**
 * @category Helper
 */
export const kindToNodeMap = {
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

  // EXTRA
  ValueNode: AST.valueNode,
  SelectionNode: AST.selectionNode,
  DefinitionNode: AST.definitionNode,
  ExecutableDefinition: AST.executableDefinitionNode,
  TypeSystemDefinition: AST.typeSystemDefinitionNode,
  TypeSystemExtension: AST.typeSystemExtensionNode,
  TypeExtension: AST.typeExtensionNode,
  TypeDefinition: AST.typeDefinitionNode,
}

/**
 * @category Helper
 */
export type KindToNodeMap = typeof kindToNodeMap

/**
 * @category Helper
 */
export type KindToNodeProps<K> = K extends keyof KindToNodeMap
  ? Parameters<KindToNodeMap[K]>[0]
  : never

/**
 * @category Helper
 */
export type KindToNode<K> = K extends keyof KindToNodeMap
  ? (props: Parameters<KindToNodeMap[K]>[0]) => ReturnType<KindToNodeMap[K]>
  : never

/**
 * @category Helper
 */
export function kindToNode<K extends keyof KindToNodeMap>(kind: K): (
  props: Parameters<KindToNodeMap[K]>[0],
) => ReturnType<KindToNodeMap[K]> {
  const nodeFn = (kindToNodeMap as any)[kind]

  if (!nodeFn) {
    throw Error(kindToNode.name + ` - invalid kind ${kind}`)
  }

  return nodeFn
}
