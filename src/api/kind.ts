import { documentApi } from './document'
import {
  directiveDefinitionApi,
  enumExtApi,
  enumTypeApi,
  enumValueApi,
  fieldDefinitionApi,
  inputExtApi,
  inputTypeApi,
  inputValueApi,
  interfaceExtApi,
  interfaceTypeApi,
  objectExtApi,
  objectTypeApi,
  scalarExtApi,
  scalarTypeApi,
  unionExtApi,
  unionTypeApi,
} from './apis'

/**
 * @category Helper
 */
export const astKindToApiMap = {
  // NAME
  // Name

  // DOCUMENT
  Document: documentApi,
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
  ScalarTypeDefinition: scalarTypeApi,
  ObjectTypeDefinition: objectTypeApi,
  InterfaceTypeDefinition: interfaceTypeApi,
  UnionTypeDefinition: unionTypeApi,
  EnumTypeDefinition: enumTypeApi,
  InputObjectTypeDefinition: inputTypeApi,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: fieldDefinitionApi,
  InputValueDefinition: inputValueApi,
  EnumValueDefinition: enumValueApi,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: directiveDefinitionApi,

  // TYPE SYSTEM EXTENSIONS
  // SchemaExtension:

  // TYPE EXTENSIONS
  ScalarTypeExtension: scalarExtApi,
  ObjectTypeExtension: objectExtApi,
  InterfaceTypeExtension: interfaceExtApi,
  UnionTypeExtension: unionExtApi,
  EnumTypeExtension: enumExtApi,
  InputObjectTypeExtension: inputExtApi,
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
