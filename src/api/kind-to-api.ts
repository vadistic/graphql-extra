import { ASTKindToNode, KindEnum } from 'graphql'

import { ContstructorType } from '../utils'
import * as API from './apis'

/**
 * @category Helper
 */
export const astKindToApiClassMap = {
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
  ScalarTypeDefinition: API.ScalarTypeApi,
  ObjectTypeDefinition: API.ObjectTypeApi,
  InterfaceTypeDefinition: API.InterfaceTypeApi,
  UnionTypeDefinition: API.UnionTypeApi,
  EnumTypeDefinition: API.EnumTypeApi,
  InputObjectTypeDefinition: API.InputTypeApi,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: API.FieldDefinitionApi,
  InputValueDefinition: API.InputValueApi,
  EnumValueDefinition: API.EnumValueApi,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: API.DirectiveDefinitionApi,

  // TYPE SYSTEM EXTENSIONS
  // SchemaExtension:

  // TYPE EXTENSIONS
  ScalarTypeExtension: API.ScalarExtApi,
  ObjectTypeExtension: API.ObjectExtApi,
  InterfaceTypeExtension: API.InterfaceExtApi,
  UnionTypeExtension: API.UnionExtApi,
  EnumTypeExtension: API.EnumExtApi,
  InputObjectTypeExtension: API.InputExtApi,
}

/**
 * @category Helper
 */
export type AstKindToApiClass<K> = K extends keyof typeof astKindToApiClassMap
  ? ContstructorType<typeof astKindToApiClassMap[K]>
  : never

/**
 * @category Helper
 */
export function astKindToApiFn<K extends KindEnum>(
  kind: K,
): (node: ASTKindToNode[K]) => AstKindToApiClass<K> {
  const Clazz = (astKindToApiClassMap as any)[kind]

  return (node: ASTKindToNode[K]) => new Clazz(node)
}

/**
 * @category Helper
 */
export function astNodeToApi<K extends KindEnum>(node: { kind: K }): AstKindToApiClass<K> {
  const Clazz = (astKindToApiClassMap as any)[node.kind]

  if (!Clazz) {
    throw Error(astNodeToApi.name + ` - not supported kind ${node.kind}`)
  }

  return new Clazz(node)
}
