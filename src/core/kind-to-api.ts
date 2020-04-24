import type { ASTKindToNode, KindEnum } from 'graphql'

import { ContstructorType } from '../utils'
import * as API from './api'

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
  Directive: API.DirectiveApi,

  // TYPES
  // ! could be also be NamedTypeApi
  NamedType: API.TypeApi,
  ListType: API.TypeApi,
  NonNullType: API.TypeApi,

  // TYPE SYSTEM DEFINITIONS
  SchemaDefinition: API.SchemaDefinitionApi,
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
  SchemaExtension: API.SchemaExtensionApi,

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
export type AstKindToApiType<K> = K extends keyof typeof astKindToApiMap
  ? ContstructorType<typeof astKindToApiMap[K]>
  : never

/**
 * @category Helper
 */
export function astKindToApi<K extends KindEnum>(kind: K): (node: ASTKindToNode[K]) => AstKindToApiType<K> {
  const Clazz = (astKindToApiMap as any)[kind]

  if (!Clazz) {
    throw Error(astNodeToApi.name + ` - not supported kind ${kind}`)
  }

  return (node: ASTKindToNode[K]): AstKindToApiType<K> => new Clazz(node)
}

/**
 * @category Helper
 */
export function astNodeToApi<K extends KindEnum>(node: { kind: K }): AstKindToApiType<K> {
  const Clazz = (astKindToApiMap as any)[node.kind]

  if (!Clazz) {
    throw Error(astNodeToApi.name + ` - not supported kind ${node.kind}`)
  }

  return new Clazz(node)
}
