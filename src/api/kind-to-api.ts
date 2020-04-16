import * as API from './apis'

/**
 * @category Helper
 */
export const astKindToApiMap = {
  // NAME
  // Name

  // DOCUMENT
  // Document:
  // OperationDefinition:
  // VariableDefinition:
  // SelectionSet:
  // Field:
  // Argument:

  // FRAGMENTS
  // FragmentSpread:
  // InlineFragment:
  // FragmentDefinition:

  // VALUES
  // Variable:
  // IntValue:
  // FloatValue:
  // StringValue:
  // BooleanValue:
  // NullValue:
  // EnumValue:
  // ListValue:
  // ObjectValue:
  // ObjectField:

  // DIRECTIVES
  // Directive:

  // TYPES
  // NamedType:
  // ListType:
  // NonNullType:

  // TYPE SYSTEM DEFINITIONS
  // SchemaDefinition:
  // OperationTypeDefinition:

  // TYPE DEFINITIONS
  ScalarTypeDefinition: API.scalarTypeApi,
  ObjectTypeDefinition: API.objectTypeApi,
  InterfaceTypeDefinition: API.interfaceTypeApi,
  UnionTypeDefinition: API.unionTypeApi,
  EnumTypeDefinition: API.enumTypeApi,
  InputObjectTypeDefinition: API.inputTypeApi,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: API.fieldDefinitionApi,
  InputValueDefinition: API.inputValueApi,
  EnumValueDefinition: API.enumValueApi,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: API.directiveDefinitionApi,

  // TYPE SYSTEM EXTENSIONS
  // SchemaExtension:

  // TYPE EXTENSIONS
  ScalarTypeExtension: API.scalarExtApi,
  ObjectTypeExtension: API.objectExtApi,
  InterfaceTypeExtension: API.interfaceExtApi,
  UnionTypeExtension: API.unionExtApi,
  EnumTypeExtension: API.enumExtApi,
  InputObjectTypeExtension: API.inputExtApi,
}

/**
 * @category Helper
 */
export type AstKindToApiMap = typeof astKindToApiMap

/**
 * @category Helper
 */
export type AstKindToApiFunction<K extends keyof AstKindToApiMap> = AstKindToApiMap[K]

export type AstKindToApi<K extends keyof AstKindToApiMap> = ReturnType<AstKindToApiMap[K]>

/**
 * @category Helper
 */
export function astKindToApi<K extends keyof AstKindToApiMap>(kind: K): AstKindToApiFunction<K> {
  return astKindToApiMap[kind]
}
