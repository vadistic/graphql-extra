import type { ASTKindToNode, KindEnum, ASTNode } from 'graphql'

import { Api } from './internal'
import { ContstructorType } from './types'

/**
 * @category Helper
 */
export const kindToApiMap = {
  // NAME
  // Name

  // DOCUMENT
  // Document:
  OperationDefinition: Api.OperationDefinitionApi,
  // VariableDefinition:
  SelectionSet: Api.SelectionSetApi,
  // Field:
  // Argument:

  // FRAGMENTS
  FragmentSpread: Api.FragmentSpreadApi,
  InlineFragment: Api.InlineFragmentApi,
  FragmentDefinition: Api.FragmentDefinitionApi,

  // VALUES
  // Variable:
  // IntValue:
  // FloatValue:
  // StringValue:
  // BooleanValue:
  // NullValue:
  // EnumValue:,
  // ListValue:
  // ObjectValue:
  // ObjectField:

  // DIRECTIVES
  Directive: Api.DirectiveApi,

  // TYPES
  // ! could be also be NamedTypeApi
  NamedType: Api.TypeApi,
  ListType: Api.TypeApi,
  NonNullType: Api.TypeApi,

  // TYPE SYSTEM DEFINITIONS
  SchemaDefinition: Api.SchemaDefinitionApi,
  OperationTypeDefinition: Api.OperationDefinitionApi,

  // TYPE DEFINITIONS
  ScalarTypeDefinition: Api.ScalarTypeApi,
  ObjectTypeDefinition: Api.ObjectTypeApi,
  InterfaceTypeDefinition: Api.InterfaceTypeApi,
  UnionTypeDefinition: Api.UnionTypeApi,
  EnumTypeDefinition: Api.EnumTypeApi,
  InputObjectTypeDefinition: Api.InputTypeApi,

  // TYPE FIELD DEFINITIONS
  FieldDefinition: Api.FieldDefinitionApi,
  InputValueDefinition: Api.InputValueApi,
  EnumValueDefinition: Api.EnumValueDefinitionApi,

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: Api.DirectiveDefinitionApi,

  // TYPE SYSTEM EXTENSIONS
  SchemaExtension: Api.SchemaExtensionApi,

  // TYPE EXTENSIONS
  ScalarTypeExtension: Api.ScalarExtApi,
  ObjectTypeExtension: Api.ObjectExtApi,
  InterfaceTypeExtension: Api.InterfaceExtApi,
  UnionTypeExtension: Api.UnionExtApi,
  EnumTypeExtension: Api.EnumExtApi,
  InputObjectTypeExtension: Api.InputExtApi,
}

/**
 * @category Helper
 */
export type KindToApiMap = typeof kindToApiMap

/**
 * @category Helper
 */
export type KindToApiType<K> = K extends keyof typeof kindToApiMap
  ? ContstructorType<typeof kindToApiMap[K]>
  : never

/**
 * @category Helper
 */
export function kindToApi<K extends KindEnum>(kind: K): (node: ASTKindToNode[K]) => KindToApiType<K> {
  const Clazz = (kindToApiMap as any)[kind]

  if (!Clazz) {
    throw Error(nodeToApi.name + ` - not supported kind ${kind}`)
  }

  return (node: ASTKindToNode[K]): KindToApiType<K> => new Clazz(node)
}

/**
 * @category Helper
 */
export function nodeToApi<N extends ASTNode>(node: N): KindToApiType<N['kind']> {
  const Clazz = (kindToApiMap as any)[node.kind]

  if (!Clazz) {
    throw Error(nodeToApi.name + ` - not supported kind ${node.kind}`)
  }

  return new Clazz(node)
}
