import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import type * as AST from '../../node'
import { cloneDeep } from '../../utils'
import type * as API from '../apis'
import type { SDLInput } from '../helper'
import { astNodeToApi, AstKindToApiClass } from '../kind-to-api'
import type { Typename, Directivename } from '../types'
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

  getRootType(operation: GQL.OperationTypeNode): API.ObjectTypeApi | undefined {
    const node = this._getRootType(operation)

    return node ? astNodeToApi(node) : undefined
  }

  getSchemaType(): GQL.SchemaDefinitionNode | undefined {
    return this.roots.schema
  }

  getQueryType(): API.ObjectTypeApi | undefined {
    return this.getRootType('query')
  }

  getMutationType(): API.ObjectTypeApi | undefined {
    return this.getRootType('mutation')
  }

  getSubscriptionType(): API.ObjectTypeApi | undefined {
    return this.getRootType('subscription')
  }


  // ────────────────────────────────────────────────────────────────────────────────
  // type get all api

  // TODO: this could really use some mapping/caching to avoid loops
  // TODO: decide if all those aliases for types are needed

  getAllTypes(): API.TypeDefinitonApi[] {
    return Array.from(this.maps.type.values()).map(astNodeToApi)
  }

  getAllTypesOfKind<K extends GQL.TypeDefinitionNode['kind']>(kind: K): AstKindToApiClass<K>[] {
    return Array.from(this.maps.type.values())
      .filter((node) => node.kind === kind)
      .map(astNodeToApi) as AstKindToApiClass<K>[]
  }

  getAllScalarTypes(): API.ScalarTypeApi[] {
    return this.getAllTypesOfKind(Kind.SCALAR_TYPE_DEFINITION)
  }

  getAllObjectTypes(): API.ObjectTypeApi[] {
    return this.getAllTypesOfKind(Kind.OBJECT_TYPE_DEFINITION)
  }

  getAllInterfaceTypes(): API.InterfaceTypeApi[] {
    return this.getAllTypesOfKind(Kind.INTERFACE_TYPE_DEFINITION)
  }

  getAllUnionTypes(): API.UnionTypeApi[] {
    return this.getAllTypesOfKind(Kind.UNION_TYPE_DEFINITION)
  }

  getAllEnumTypes(): API.EnumTypeApi[] {
    return this.getAllTypesOfKind(Kind.ENUM_TYPE_DEFINITION)
  }

  getAllInputTypes(): API.InputTypeApi[] {
    return this.getAllTypesOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // ext get all api

  // TODO: optimise as well

  getAllExts(): API.TypeExtensionApi[] {
    return Array.from(this.maps.extension.values()).map(astNodeToApi)
  }

  getAllExtsOfKind<K extends GQL.TypeExtensionNode['kind']>(kind: K): AstKindToApiClass<K>[] {
    return Array.from(this.maps.extension.values())
      .filter((node) => node.kind === kind)
      .map(astNodeToApi) as AstKindToApiClass<K>[]
  }

  getAllScalarExts(): API.ScalarExtApi[] {
    return this.getAllExtsOfKind(Kind.SCALAR_TYPE_EXTENSION)
  }

  getAllObjectExts(): API.ObjectExtApi[] {
    return this.getAllExtsOfKind(Kind.OBJECT_TYPE_EXTENSION)
  }

  getAllInterfaceExts(): API.InterfaceExtApi[] {
    return this.getAllExtsOfKind(Kind.INTERFACE_TYPE_EXTENSION)
  }

  getAllUnionExts(): API.UnionExtApi[] {
    return this.getAllExtsOfKind(Kind.UNION_TYPE_EXTENSION)
  }

  getAllEnumExts(): API.EnumExtApi[] {
    return this.getAllExtsOfKind(Kind.ENUM_TYPE_EXTENSION)
  }

  getAllInputExts(): API.InputExtApi[] {
    return this.getAllExtsOfKind(Kind.INPUT_OBJECT_TYPE_EXTENSION)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // basic type api


  hasType(typename: Typename): boolean {
    return this._hasNode(typename, 'type')
  }

  getType(typename: Typename): API.TypeDefinitonApi {
    return astNodeToApi(this._getNode(typename, 'type'))
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

  getExt(typename: Typename): API.TypeExtensionApi {
    return astNodeToApi(this._getNode(typename, 'extension'))
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
  ): AstKindToApiClass<K> {
    const node = this._getNodeOfKind(typename, 'type', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  createTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AST.AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._createNodeOfKind(props, 'type', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  getOrCreateTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AST.AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getOrCreateNodeOfKind(props, 'type', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // ext of kind api

  getExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    typename: Typename,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getNodeOfKind(typename, 'extension', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  createExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AST.AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._createNodeOfKind(props, 'extension', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  getOrExtTypeOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AST.AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getOrCreateNodeOfKind(props, 'extension', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  // ─────────────────────────────────────────────────────────────────
  // directive api

  hasDirective(directivename: Directivename): boolean {
    return this._hasNode(directivename, 'directive')
  }

  getDirective(directivename: Directivename): API.DirectiveDefinitionApi {
    const node = this._getNode(directivename, 'directive')

    return astNodeToApi(node)
  }

  removeDirective(directivename: Directivename): this {
    this._removeNode(directivename, 'directive')

    return this
  }

  createDirective(
    props: GQL.DirectiveDefinitionNode | AST.DirectiveDefinitionNodeProps,
  ): API.DirectiveDefinitionApi {
    const node = this._createNodeOfKind(props, 'directive', Kind.DIRECTIVE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateDirective(
    props: GQL.DirectiveDefinitionNode | AST.DirectiveDefinitionNodeProps,
  ): API.DirectiveDefinitionApi {
    const node = this._getOrCreateNodeOfKind(props, 'directive', Kind.DIRECTIVE_DEFINITION)

    return astNodeToApi(node)
  }

  getAllDirectives(): API.DirectiveDefinitionApi[] {
    return Array.from(this.maps.directive.values()).map(astNodeToApi)
  }

  // ─────────────────────────────────────────────────────────────────
  // get type apis

  getScalarType(typename: Typename): API.ScalarTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getObjectType(typename: Typename): API.ObjectTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getInterfaceType(typename: Typename): API.InterfaceTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getUnionType(typename: Typename): API.UnionTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getEnumType(typename: Typename): API.EnumTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getInputType(typename: Typename): API.InputTypeApi {
    const node = this._getNodeOfKind(typename, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // get or create type apis

  getOrCreateScalarType(
    props: GQL.ScalarTypeDefinitionNode | AST.ScalarTypeDefinitionNodeProps,
  ): API.ScalarTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateObjectType(
    props: GQL.ObjectTypeDefinitionNode | AST.ObjectTypeDefinitionNodeProps,
  ): API.ObjectTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | AST.InterfaceTypeDefinitionNodeProps,
  ): API.InterfaceTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateUnionType(
    props: GQL.UnionTypeDefinitionNode | AST.UnionTypeDefinitionNodeProps,
  ): API.UnionTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateEnumType(
    props: GQL.EnumTypeDefinitionNode | AST.EnumTypeDefinitionNodeProps,
  ): API.EnumTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateInputType(
    props: GQL.InputObjectTypeDefinitionNode | AST.InputObjectTypeDefinitionNodeProps,
  ): API.InputTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // create type apis

  createScalarType(
    props: GQL.ScalarTypeDefinitionNode | AST.ScalarTypeDefinitionNodeProps,
  ): API.ScalarTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createObjectType(
    props: GQL.ObjectTypeDefinitionNode | AST.ObjectTypeDefinitionNodeProps,
  ): API.ObjectTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | AST.InterfaceTypeDefinitionNodeProps,
  ): API.InterfaceTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createUnionType(
    props: GQL.UnionTypeDefinitionNode | AST.UnionTypeDefinitionNodeProps,
  ): API.UnionTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createEnumType(
    props: GQL.EnumTypeDefinitionNode | AST.EnumTypeDefinitionNodeProps,
  ): API.EnumTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createInputType(
    props: GQL.InputObjectTypeDefinitionNode | AST.InputObjectTypeDefinitionNodeProps,
  ): API.InputTypeApi {
    const node = this._createNodeOfKind(props, 'type', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
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

  getScalarExt(typename: Typename): API.ScalarExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getObjectExt(typename: Typename): API.ObjectExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getInterfaceExt(typename: Typename): API.InterfaceExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getUnionExt(typename: Typename): API.UnionExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getEnumExt(typename: Typename): API.EnumExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getInputExt(typename: Typename): API.InputExtApi {
    const node = this._getNodeOfKind(typename, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // get or create ext apis

  getOrCreateScalarExt(
    props: GQL.ScalarTypeExtensionNode | AST.ScalarTypeExtensionNodeProps,
  ): API.ScalarExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateObjectExt(
    props: GQL.ObjectTypeExtensionNode | AST.ObjectTypeExtensionNodeProps,
  ): API.ObjectExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | AST.InterfaceTypeExtensionNodeProps,
  ): API.InterfaceExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateUnionExt(
    props: GQL.UnionTypeExtensionNode | AST.UnionTypeExtensionNodeProps,
  ): API.UnionExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateEnumExt(
    props: GQL.EnumTypeExtensionNode | AST.EnumTypeExtensionNodeProps,
  ): API.EnumExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateInputExt(
    props: GQL.InputObjectTypeExtensionNode | AST.InputObjectTypeExtensionNodeProps,
  ): API.InputExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────
  // create ext apis

  createScalarExt(
    props: GQL.ScalarTypeExtensionNode | AST.ScalarTypeExtensionNodeProps,
  ): API.ScalarExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createObjectExt(
    props: GQL.ObjectTypeExtensionNode | AST.ObjectTypeExtensionNodeProps,
  ): API.ObjectExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | AST.InterfaceTypeExtensionNodeProps,
  ): API.InterfaceExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createUnionExt(
    props: GQL.UnionTypeExtensionNode | AST.UnionTypeExtensionNodeProps,
  ): API.UnionExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createEnumExt(props: GQL.EnumTypeExtensionNode | AST.EnumTypeExtensionNodeProps): API.EnumExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createInputExt(
    props: GQL.InputObjectTypeExtensionNode | AST.InputObjectTypeExtensionNodeProps,
  ): API.InputExtApi {
    const node = this._createNodeOfKind(props, 'extension', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
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
