import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import { Api, Ast } from '../internal'
import { nodeToApi, KindToApiType } from '../kind-to-api'
import { KindToNodeProps } from '../kind-to-node'
import { Typename, Directivename } from '../types'
import { cloneDeep, SDLInput } from '../utils'
import { DocumentSchemaApiBase, DocumentSchemaRoots } from './document-schema-base'

/**
 * API for GraphQL `DocumentNode` with schema
 *
 * @category API Public
 */
export class DocumentSchemaApi extends DocumentSchemaApiBase {
  // TODO: optimise
  clone(): DocumentSchemaApi {
    return new DocumentSchemaApi(cloneDeep(this.toDocument()))
  }

  // ─────────────────────────────────────────────────────────────────
  // roots api

  getRoots(): DocumentSchemaRoots {
    return this._getRoots()
  }

  getRootType(operation: GQL.OperationTypeNode): Api.ObjectTypeApi | undefined {
    const node = this._getRootType(operation)

    return node ? nodeToApi(node) : undefined
  }

  getSchemaType(): GQL.SchemaDefinitionNode | undefined {
    return this.roots.schema
  }

  getQueryType(): Api.ObjectTypeApi | undefined {
    return this.getRootType('query')
  }

  getMutationType(): Api.ObjectTypeApi | undefined {
    return this.getRootType('mutation')
  }

  getSubscriptionType(): Api.ObjectTypeApi | undefined {
    return this.getRootType('subscription')
  }


  // ────────────────────────────────────────────────────────────────────────────────
  // type get all api

  // TODO: this could really use some mapping/caching to avoid loops
  // TODO: decide if all those aliases for types are needed

  getAllTypes(): Api.TypeDefinitonApi[] {
    return Array.from(this.maps.type.values()).map(nodeToApi)
  }

  getAllTypesOfKind<K extends GQL.TypeDefinitionNode['kind']>(kind: K): KindToApiType<K>[] {
    return Array.from(this.maps.type.values())
      .filter((node) => node.kind === kind)
      .map(nodeToApi) as KindToApiType<K>[]
  }

  getAllScalarTypes(): Api.ScalarTypeApi[] {
    return this.getAllTypesOfKind(Kind.SCALAR_TYPE_DEFINITION)
  }

  getAllObjectTypes(): Api.ObjectTypeApi[] {
    return this.getAllTypesOfKind(Kind.OBJECT_TYPE_DEFINITION)
  }

  getAllInterfaceTypes(): Api.InterfaceTypeApi[] {
    return this.getAllTypesOfKind(Kind.INTERFACE_TYPE_DEFINITION)
  }

  getAllUnionTypes(): Api.UnionTypeApi[] {
    return this.getAllTypesOfKind(Kind.UNION_TYPE_DEFINITION)
  }

  getAllEnumTypes(): Api.EnumTypeApi[] {
    return this.getAllTypesOfKind(Kind.ENUM_TYPE_DEFINITION)
  }

  getAllInputTypes(): Api.InputTypeApi[] {
    return this.getAllTypesOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // ext get all api

  // TODO: optimise as well

  getAllExts(): Api.TypeExtensionApi[] {
    return Array.from(this.maps.extension.values()).map(nodeToApi)
  }

  getAllExtsOfKind<K extends GQL.TypeExtensionNode['kind']>(kind: K): KindToApiType<K>[] {
    return Array.from(this.maps.extension.values())
      .filter((node): node is GQL.ASTKindToNode[K] => node.kind === kind)
      .map(nodeToApi)
  }

  getAllScalarExts(): Api.ScalarExtApi[] {
    return this.getAllExtsOfKind(Kind.SCALAR_TYPE_EXTENSION)
  }

  getAllObjectExts(): Api.ObjectExtApi[] {
    return this.getAllExtsOfKind(Kind.OBJECT_TYPE_EXTENSION)
  }

  getAllInterfaceExts(): Api.InterfaceExtApi[] {
    return this.getAllExtsOfKind(Kind.INTERFACE_TYPE_EXTENSION)
  }

  getAllUnionExts(): Api.UnionExtApi[] {
    return this.getAllExtsOfKind(Kind.UNION_TYPE_EXTENSION)
  }

  getAllEnumExts(): Api.EnumExtApi[] {
    return this.getAllExtsOfKind(Kind.ENUM_TYPE_EXTENSION)
  }

  getAllInputExts(): Api.InputExtApi[] {
    return this.getAllExtsOfKind(Kind.INPUT_OBJECT_TYPE_EXTENSION)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // basic type api


  hasType(typename: Typename): boolean {
    return this._hasNode(typename, 'type')
  }

  getType(typename: Typename): Api.TypeDefinitonApi {
    return nodeToApi(this._getNode(typename, 'type'))
  }

  removeType(typename: Typename): this {
    this._removeNode(typename, 'type')

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // basic ext api

  hasExt(typename: Typename): boolean {
    return this._hasNode(typename, 'extension')
  }

  getExt(typename: Typename): Api.TypeExtensionApi {
    return nodeToApi(this._getNode(typename, 'extension'))
  }

  removeExt(typename: Typename): this {
    this._removeNode(typename, 'extension')

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // type of kind api

  getTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    typename: Typename,
    kind: K,
  ): KindToApiType<K> {
    const node = this._getNodeOfKind(typename, 'type', kind)

    return nodeToApi(node)
  }

  createTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | KindToNodeProps<K>,
    kind: K,
  ): KindToApiType<K> {
    const node = this._createNodeOfKind(props, 'type', kind)

    return nodeToApi(node)
  }

  getOrCreateTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | KindToNodeProps<K>,
    kind: K,
  ): KindToApiType<K> {
    const node = this._getOrCreateNodeOfKind(props, 'type', kind)

    return nodeToApi(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // ext of kind api

  getExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    typename: Typename,
    kind: K,
  ): KindToApiType<K> {
    const node = this._getNodeOfKind(typename, 'extension', kind)

    return nodeToApi(node)
  }

  createExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | KindToNodeProps<K>,
    kind: K,
  ): KindToApiType<K> {
    const node = this._createNodeOfKind(props, 'extension', kind)

    return nodeToApi(node)
  }

  getOrExtTypeOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | KindToNodeProps<K>,
    kind: K,
  ): KindToApiType<K> {
    const node = this._getOrCreateNodeOfKind(props, 'extension', kind)

    return nodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // directive api

  hasDirective(directivename: Directivename): boolean {
    return this._hasNode(directivename, 'directive')
  }

  getDirective(directivename: Directivename): Api.DirectiveDefinitionApi {
    const node = this._getNode(directivename, 'directive')

    return nodeToApi(node)
  }

  removeDirective(directivename: Directivename): this {
    this._removeNode(directivename, 'directive')

    return this
  }

  createDirective(
    props: GQL.DirectiveDefinitionNode | Ast.DirectiveDefinitionNodeProps,
  ): Api.DirectiveDefinitionApi {
    const node = this._createNodeOfKind(props, 'directive', Kind.DIRECTIVE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateDirective(
    props: GQL.DirectiveDefinitionNode | Ast.DirectiveDefinitionNodeProps,
  ): Api.DirectiveDefinitionApi {
    const node = this._getOrCreateNodeOfKind(props, 'directive', Kind.DIRECTIVE_DEFINITION)

    return nodeToApi(node)
  }

  getAllDirectives(): Api.DirectiveDefinitionApi[] {
    return Array.from(this.maps.directive.values()).map(nodeToApi)
  }

  // ─────────────────────────────────────────────────────────────────
  // get type apis

  getScalarType(typename: Typename): Api.ScalarTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getObjectType(typename: Typename): Api.ObjectTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getInterfaceType(typename: Typename): Api.InterfaceTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getUnionType(typename: Typename): Api.UnionTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.UNION_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getEnumType(typename: Typename): Api.EnumTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.ENUM_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getInputType(typename: Typename): Api.InputTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // get or create type apis

  getOrCreateScalarType(
    props: GQL.ScalarTypeDefinitionNode | Ast.ScalarTypeDefinitionNodeProps,
  ): Api.ScalarTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateObjectType(
    props: GQL.ObjectTypeDefinitionNode | Ast.ObjectTypeDefinitionNodeProps,
  ): Api.ObjectTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | Ast.InterfaceTypeDefinitionNodeProps,
  ): Api.InterfaceTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateUnionType(
    props: GQL.UnionTypeDefinitionNode | Ast.UnionTypeDefinitionNodeProps,
  ): Api.UnionTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.UNION_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateEnumType(
    props: GQL.EnumTypeDefinitionNode | Ast.EnumTypeDefinitionNodeProps,
  ): Api.EnumTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.ENUM_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  getOrCreateInputType(
    props: GQL.InputObjectTypeDefinitionNode | Ast.InputObjectTypeDefinitionNodeProps,
  ): Api.InputTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // create type apis

  createScalarType(
    props: GQL.ScalarTypeDefinitionNode | Ast.ScalarTypeDefinitionNodeProps,
  ): Api.ScalarTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  createObjectType(
    props: GQL.ObjectTypeDefinitionNode | Ast.ObjectTypeDefinitionNodeProps,
  ): Api.ObjectTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  createInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | Ast.InterfaceTypeDefinitionNodeProps,
  ): Api.InterfaceTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  createUnionType(
    props: GQL.UnionTypeDefinitionNode | Ast.UnionTypeDefinitionNodeProps,
  ): Api.UnionTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.UNION_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  createEnumType(
    props: GQL.EnumTypeDefinitionNode | Ast.EnumTypeDefinitionNodeProps,
  ): Api.EnumTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.ENUM_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  createInputType(
    props: GQL.InputObjectTypeDefinitionNode | Ast.InputObjectTypeDefinitionNodeProps,
  ): Api.InputTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return nodeToApi(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // remove type apis

  removeScalarType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return this
  }

  removeObjectType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return this
  }

  removeInterfaceType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return this
  }

  removeUnionType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.UNION_TYPE_DEFINITION)

    return this
  }

  removeEnumType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.ENUM_TYPE_DEFINITION)

    return this
  }

  removeInputType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // get ext apis

  getScalarExt(typename: Typename): Api.ScalarExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getObjectExt(typename: Typename): Api.ObjectExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getInterfaceExt(typename: Typename): Api.InterfaceExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getUnionExt(typename: Typename): Api.UnionExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.UNION_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getEnumExt(typename: Typename): Api.EnumExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getInputExt(typename: Typename): Api.InputExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // get or create ext apis

  getOrCreateScalarExt(
    props: GQL.ScalarTypeExtensionNode | Ast.ScalarTypeExtensionNodeProps,
  ): Api.ScalarExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getOrCreateObjectExt(
    props: GQL.ObjectTypeExtensionNode | Ast.ObjectTypeExtensionNodeProps,
  ): Api.ObjectExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getOrCreateInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | Ast.InterfaceTypeExtensionNodeProps,
  ): Api.InterfaceExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getOrCreateUnionExt(
    props: GQL.UnionTypeExtensionNode | Ast.UnionTypeExtensionNodeProps,
  ): Api.UnionExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.UNION_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getOrCreateEnumExt(
    props: GQL.EnumTypeExtensionNode | Ast.EnumTypeExtensionNodeProps,
  ): Api.EnumExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  getOrCreateInputExt(
    props: GQL.InputObjectTypeExtensionNode | Ast.InputObjectTypeExtensionNodeProps,
  ): Api.InputExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // create ext apis

  createScalarExt(
    props: GQL.ScalarTypeExtensionNode | Ast.ScalarTypeExtensionNodeProps,
  ): Api.ScalarExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  createObjectExt(
    props: GQL.ObjectTypeExtensionNode | Ast.ObjectTypeExtensionNodeProps,
  ): Api.ObjectExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  createInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | Ast.InterfaceTypeExtensionNodeProps,
  ): Api.InterfaceExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  createUnionExt(
    props: GQL.UnionTypeExtensionNode | Ast.UnionTypeExtensionNodeProps,
  ): Api.UnionExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.UNION_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  createEnumExt(props: GQL.EnumTypeExtensionNode | Ast.EnumTypeExtensionNodeProps): Api.EnumExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  createInputExt(
    props: GQL.InputObjectTypeExtensionNode | Ast.InputObjectTypeExtensionNodeProps,
  ): Api.InputExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return nodeToApi(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // remove ext apis

  removeScalarExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return this
  }

  removeObjectExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return this
  }

  removeInterfaceExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return this
  }

  removeUnionExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.UNION_TYPE_EXTENSION)

    return this
  }

  removeEnumExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return this
  }

  removeInputExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return this
  }
}

/**
 * `DocumentSchemaApi` constructor fn
 *
 * @category API Public
 */
export function documentSchemaApi(sdl?: SDLInput): DocumentSchemaApi {
  return new DocumentSchemaApi(sdl)
}
