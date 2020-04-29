import type * as GQL from 'graphql'


// eslint-disable-next-line import/no-cycle
import { Api } from '../internal'
import { validationError } from '../utils'


/**
 * map `TypeDefinitionNode` kind to api
 *
 * @category API Public
 */
export const kindToTypeDefinitionApi = {
  EnumTypeDefinition: Api.EnumTypeApi,
  InputObjectTypeDefinition: Api.InputTypeApi,
  InterfaceTypeDefinition: Api.InterfaceTypeApi,
  ObjectTypeDefinition: Api.ObjectTypeApi,
  ScalarTypeDefinition: Api.ScalarTypeApi,
  UnionTypeDefinition: Api.UnionTypeApi,
}

/**
 *  polymorfic contructor fn for `TypeDefinitonApi`
 *
 * @category API Public
 */
export function typeDefinitionApi(node: GQL.TypeDefinitionNode): Api.TypeDefinitonApi {
  const Clazz = kindToTypeDefinitionApi[node.kind]

  if (Clazz) return new Clazz(node as any)

  throw validationError(Object.keys(kindToTypeDefinitionApi) as GQL.TypeDefinitionNode['kind'][], node)
}

/**
 * map `TypeDefinitionNode` kind to api
 *
 * @category API Public
 */
export const kindToTypeExtensionApi = {
  EnumTypeExtension: Api.EnumExtApi,
  InputObjectTypeExtension: Api.InputExtApi,
  InterfaceTypeExtension: Api.InterfaceExtApi,
  ObjectTypeExtension: Api.ObjectExtApi,
  ScalarTypeExtension: Api.ScalarExtApi,
  UnionTypeExtension: Api.UnionExtApi,
}

/**
 *  polymorfic contructor fn for `TypeDefinitonApi`
 *
 * @category API Public
 */
export function typeExtensionApi(node: GQL.TypeExtensionNode): Api.TypeExtensionApi {
  const Clazz = kindToTypeExtensionApi[node.kind]

  if (Clazz) return new Clazz(node as any)

  throw validationError(Object.keys(kindToTypeExtensionApi) as GQL.TypeExtensionNode['kind'][], node)
}


/**
 * API for GraphQL `DefinitionNode`
 *
 * @category API Public
 */
export type DefinitionApi =
  | Api.TypeDefinitonApi
  | Api.TypeExtensionApi
  | Api.OperationDefinitionApi
  | Api.FragmentDefinitionApi
  | Api.DirectiveDefinitionApi
  | Api.SchemaDefinitionApi
  | Api.SchemaExtensionApi

/**
 * map `DefinitionNode` kind to api
 *
 * @category API Public
 */
export const kindToDefinitionApi = {
  ...kindToTypeDefinitionApi,
  ...kindToTypeExtensionApi,
  OperationDefinition: Api.OperationDefinitionApi,
  FragmentDefinition: Api.FragmentDefinitionApi,
  SchemaDefinition: Api.SchemaDefinitionApi,
  SchemaExtension: Api.SchemaExtensionApi,
  DirectiveDefinition: Api.DirectiveDefinitionApi,
}

/**
 *  polymorfic contructor fn for `DefinitionNode`
 *
 * @category API Public
 */
export function definitionApi(node: GQL.DefinitionNode): DefinitionApi {
  const Clazz = kindToDefinitionApi[node.kind]

  if (Clazz) return new Clazz(node as any)

  throw validationError(Object.keys(kindToDefinitionApi) as GQL.DefinitionNode['kind'][], node)
}
