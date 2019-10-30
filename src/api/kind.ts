import { DocumentApi } from './document'
import {
  ScalarTypeApi,
  ObjectTypeApi,
  InterfaceTypeApi,
  UnionTypeApi,
  EnumTypeApi,
  InputTypeApi,
  DirectiveDefinitionApi,
  FieldDefinitionApi,
  InputValueApi,
  EnumValueApi,
} from './apis'

/**
 * @category Helper
 */
export interface AstKindToApi {
  // NAME
  // Name

  // DOCUMENT
  Document: DocumentApi
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
  ScalarTypeDefinition: ScalarTypeApi
  ObjectTypeDefinition: ObjectTypeApi
  InterfaceTypeDefinition: InterfaceTypeApi
  UnionTypeDefinition: UnionTypeApi
  EnumTypeDefinition: EnumTypeApi
  InputObjectTypeDefinition: InputTypeApi

  // TYPE FIELD DEFINITIONS
  FieldDefinition: FieldDefinitionApi
  InputValueDefinition: InputValueApi
  EnumValueDefinition: EnumValueApi

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: DirectiveDefinitionApi

  // TYPE SYSTEM EXTENSIONS
  // SchemaExtension:

  // TYPE EXTENSIONS
  // ScalarTypeExtension:
  // ObjectTypeExtension:
  // InterfaceTypeExtension:
  // UnionTypeExtension:
  // EnumTypeExtension:
  // InputObjectTypeExtension:
}
