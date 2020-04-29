import type { ASTKindToNode, KindEnum, ASTNode } from 'graphql'

import { DocumentApi } from './document'
import { Api } from './internal'
import { ContstructorType } from './types'

/**
 * @category Helper
 */
export const kindToApiMap = {
  // NAME
  Name: Api.NameApi,

  // DOCUMENT
  Document: DocumentApi,
  OperationDefinition: Api.OperationDefinitionApi,
  VariableDefinition: Api.VariableDefinitionApi,
  SelectionSet: Api.SelectionSetApi,
  Field: Api.FieldApi,
  Argument: Api.ArgumentApi,

  // FRAGMENTS
  FragmentSpread: Api.FragmentSpreadApi,
  InlineFragment: Api.InlineFragmentApi,
  FragmentDefinition: Api.FragmentDefinitionApi,

  // VALUES
  Variable: Api.VariableApi,

  IntValue: Api.ValueApi,
  FloatValue: Api.ValueApi,
  StringValue: Api.ValueApi,
  BooleanValue: Api.ValueApi,
  NullValue: Api.ValueApi,
  EnumValue: Api.ValueApi,
  ListValue: Api.ValueApi,
  ObjectValue: Api.ValueApi,
  ObjectField: Api.ValueApi,

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
  InputValueDefinition: Api.InputValueDefinitionApi,
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
