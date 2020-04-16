import type * as GQL from 'graphql'
import { isTypeDefinitionNode, isTypeExtensionNode, print, Kind } from 'graphql'

import type * as AST from '../../node'
import {
  astKindToNodeFn,
  documentNode,
  isDirectiveDefinitionNode,
  AstKindToNodeFnParm,
} from '../../node'
import { getName, applyPropsCloned, cloneDeep } from '../../utils'
import type * as API from '../apis'
import { astNodeToApi, AstKindToApiClass } from '../kind-to-api'
import type { Typename, Directivename } from '../types'
import { SDLInput, normaliseSDLInput } from './helper'

/**
 * @category API Public
 */
export type DocumentTypeMap = Map<string, GQL.TypeDefinitionNode>

/**
 * @category API Public
 */
export type DocumentExtMap = Map<string, GQL.TypeExtensionNode>

/**
 * @category API Public
 */
export type DocumentDirectiveMap = Map<string, GQL.DirectiveDefinitionNode>

/**
 * @category API Public
 */

interface SchemaDocumentMaps {
  typeMap: GQL.TypeDefinitionNode
  extensionMap: GQL.TypeExtensionNode
  directiveMap: GQL.DirectiveDefinitionNode
}

/**
 * API for GraphQL `DocumentNode` with schema
 *
 * @category API Public
 */
export class DocumentSchemaApi {
  typeMap: DocumentTypeMap = new Map()

  extensionMap: DocumentExtMap = new Map()

  directiveMap: DocumentDirectiveMap = new Map()

  constructor(sdl?: SDLInput) {
    if (sdl) {
      this.addSDL(sdl)
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  private _getNode<F extends keyof SchemaDocumentMaps>(
    typename: Typename,
    from: F,
  ): SchemaDocumentMaps[F] {
    const node = this[from].get(typename)

    if (!node) {
      throw Error(`cannot get '${typename}' because is does not exist in ${from}`)
    }

    return node as SchemaDocumentMaps[F]
  }

  private _hasNode(typename: Typename, from: keyof SchemaDocumentMaps): boolean {
    return this[from].has(typename)
  }

  private readonly _removeNode = (typename: Typename, from: keyof SchemaDocumentMaps): void => {
    const isFound = this[from].delete(typename)

    if (!isFound) {
      throw Error(`cannot remove '${typename}' because does not exist in ${from}`)
    }
  }

  private readonly _getNodeOfKind = <K extends GQL.KindEnum>(
    typename: string,
    from: keyof SchemaDocumentMaps,
    kind: K,
  ): GQL.ASTKindToNode[K] => {
    const node = this._getNode(typename, from)

    if (node.kind !== kind) {
      throw Error(`cannot get '${typename}' because it's ${node.kind} instead of ${kind}`)
    }

    return node as GQL.ASTKindToNode[K]
  }

  private readonly _createNodeOfKind = <P, K extends GQL.KindEnum>(
    props: P,
    from: keyof SchemaDocumentMaps,
    kind: K,
  ): GQL.ASTKindToNode[K] => {
    const typename = getName(props)
    const nodeFn = astKindToNodeFn(kind)
    const node = applyPropsCloned(nodeFn, props as any)

    if (node.kind !== kind) {
      throw Error(`cannot create '${typename}' because provided ${node.kind} instead of ${kind}`)
    }

    if (this._hasNode(typename, from)) {
      throw Error(`cannot create '${typename}' because it already exists`)
    }

    // persist
    this[from].set(typename, node as any)

    return node as GQL.ASTKindToNode[K]
  }

  private readonly _getOrCreateNodeOfKind = <P, K extends GQL.KindEnum>(
    props: P,
    from: keyof SchemaDocumentMaps,
    kind: K,
  ): GQL.ASTKindToNode[K] => {
    const typename = getName(props)

    if (this._hasNode(typename, from)) {
      return this._getNodeOfKind(typename, from, kind)
    }

    return this._createNodeOfKind(props, from, kind)
  }

  private _removeNodeOfKind<K extends GQL.KindEnum>(
    typename: string,
    from: keyof SchemaDocumentMaps,
    kind: K,
  ) {
    const node = this[from].get(typename)

    if (!node) {
      throw Error(`cannot remove '${typename}' because does not exist in ${from}`)
    }

    if (node.kind !== kind) {
      throw Error(
        `cannot remove '${typename}'\n` +
          `found node of type '${node.kind}' in ${from} that does not match condition '${kind}'`,
      )
    }

    this[from].delete(typename)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  addSDL(sdl: SDLInput): this {
    const definitions = normaliseSDLInput(sdl)

    for (const node of definitions) {
      if (isDirectiveDefinitionNode(node)) {
        this.directiveMap.set(node.name.value, node)
        continue
      }

      if (isTypeDefinitionNode(node)) {
        this.typeMap.set(node.name.value, node)
        continue
      }

      if (isTypeExtensionNode(node)) {
        this.extensionMap.set(node.name.value, node)
        continue
      }

      throw Error(`invalid definition \n ${JSON.stringify(node, null, 2)}`)
    }

    return this
  }

  toDocument(): GQL.DocumentNode {
    return documentNode([
      ...this.directiveMap.values(),
      ...this.typeMap.values(),
      ...this.extensionMap.values(),
    ])
  }

  toSDLString() {
    return print(this.toDocument())
  }

  // TODO: optimise a bit??
  cloneInstance() {
    return documentSchemaApi().addSDL(cloneDeep(this.toDocument()))
  }

  // ─────────────────────────────────────────────────────────────────

  hasType(typename: Typename): boolean {
    return this._hasNode(typename, 'typeMap')
  }

  getType(typename: Typename): API.TypeDefinitonApi {
    return astNodeToApi(this._getNode(typename, 'typeMap'))
  }

  removeType(typename: Typename): this {
    this._removeNode(typename, 'typeMap')

    return this
  }

  // ─────────────────────────────────────────────────────────────────

  hasExt(typename: Typename): boolean {
    return this._hasNode(typename, 'extensionMap')
  }

  getExt(typename: Typename): API.TypeExtensionApi {
    return astNodeToApi(this._getNode(typename, 'extensionMap'))
  }

  removeExt(typename: Typename): this {
    this._removeNode(typename, 'extensionMap')

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    typename: Typename,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getNodeOfKind(typename, 'typeMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  createTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._createNodeOfKind(props, 'typeMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  getOrCreateTypeOfKind<K extends GQL.TypeDefinitionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    typename: Typename,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getNodeOfKind(typename, 'extensionMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  createExtOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._createNodeOfKind(props, 'extensionMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  getOrExtTypeOfKind<K extends GQL.TypeExtensionNode['kind']>(
    props: GQL.ASTKindToNode[K] | AstKindToNodeFnParm<K>,
    kind: K,
  ): AstKindToApiClass<K> {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', kind)

    return astNodeToApi(node) as AstKindToApiClass<K>
  }

  // ─────────────────────────────────────────────────────────────────

  hasDirective(directivename: Directivename): boolean {
    return this._hasNode(directivename, 'directiveMap')
  }

  getDirective(directivename: Directivename): API.DirectiveDefinitionApi {
    const node = this._getNode(directivename, 'directiveMap')

    return astNodeToApi(node)
  }

  removeDirective(directivename: Directivename): this {
    this._removeNode(directivename, 'directiveMap')

    return this
  }

  createDirective(
    props: GQL.DirectiveDefinitionNode | AST.DirectiveDefinitionNodeProps,
  ): API.DirectiveDefinitionApi {
    const node = this._createNodeOfKind(props, 'directiveMap', Kind.DIRECTIVE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateDirective(
    props: GQL.DirectiveDefinitionNode | AST.DirectiveDefinitionNodeProps,
  ): API.DirectiveDefinitionApi {
    const node = this._getOrCreateNodeOfKind(props, 'directiveMap', Kind.DIRECTIVE_DEFINITION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────

  getScalarType(typename: Typename): API.ScalarTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getObjectType(typename: Typename): API.ObjectTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getInterfaceType(typename: Typename): API.InterfaceTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getUnionType(typename: Typename): API.UnionTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getEnumType(typename: Typename): API.EnumTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getInputType(typename: Typename): API.InputTypeApi {
    const node = this._getNodeOfKind(typename, 'typeMap', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────

  getOrCreateScalarType(
    props: GQL.ScalarTypeDefinitionNode | AST.ScalarTypeDefinitionNodeProps,
  ): API.ScalarTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateObjectType(
    props: GQL.ObjectTypeDefinitionNode | AST.ObjectTypeDefinitionNodeProps,
  ): API.ObjectTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | AST.InterfaceTypeDefinitionNodeProps,
  ): API.InterfaceTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateUnionType(
    props: GQL.UnionTypeDefinitionNode | AST.UnionTypeDefinitionNodeProps,
  ): API.UnionTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateEnumType(
    props: GQL.EnumTypeDefinitionNode | AST.EnumTypeDefinitionNodeProps,
  ): API.EnumTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  getOrCreateInputType(
    props: GQL.InputObjectTypeDefinitionNode | AST.InputObjectTypeDefinitionNodeProps,
  ): API.InputTypeApi {
    const node = this._getOrCreateNodeOfKind(props, 'typeMap', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────

  createScalarType(
    props: GQL.ScalarTypeDefinitionNode | AST.ScalarTypeDefinitionNodeProps,
  ): API.ScalarTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.SCALAR_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createObjectType(
    props: GQL.ObjectTypeDefinitionNode | AST.ObjectTypeDefinitionNodeProps,
  ): API.ObjectTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createInterfaceType(
    props: GQL.InterfaceTypeDefinitionNode | AST.InterfaceTypeDefinitionNodeProps,
  ): API.InterfaceTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.INTERFACE_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createUnionType(
    props: GQL.UnionTypeDefinitionNode | AST.UnionTypeDefinitionNodeProps,
  ): API.UnionTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.UNION_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createEnumType(
    props: GQL.EnumTypeDefinitionNode | AST.EnumTypeDefinitionNodeProps,
  ): API.EnumTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.ENUM_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  createInputType(
    props: GQL.InputObjectTypeDefinitionNode | AST.InputObjectTypeDefinitionNodeProps,
  ): API.InputTypeApi {
    const node = this._createNodeOfKind(props, 'typeMap', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return astNodeToApi(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  removeScalarType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.SCALAR_TYPE_DEFINITION)

    return this
  }

  removeObjectType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.OBJECT_TYPE_DEFINITION)

    return this
  }

  removeInterfaceType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.INTERFACE_TYPE_DEFINITION)

    return this
  }

  removeUnionType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.UNION_TYPE_DEFINITION)

    return this
  }

  removeEnumType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.ENUM_TYPE_DEFINITION)

    return this
  }

  removeInputType(typename: Typename): this {
    this._removeNodeOfKind(typename, 'typeMap', Kind.INPUT_OBJECT_TYPE_DEFINITION)

    return this
  }

  // ─────────────────────────────────────────────────────────────────

  getScalarExt(typename: Typename): API.ScalarExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getObjectExt(typename: Typename): API.ObjectExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getInterfaceExt(typename: Typename): API.InterfaceExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getUnionExt(typename: Typename): API.UnionExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getEnumExt(typename: Typename): API.EnumExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getInputExt(typename: Typename): API.InputExtApi {
    const node = this._getNodeOfKind(typename, 'extensionMap', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────

  getOrCreateScalarExt(
    props: GQL.ScalarTypeExtensionNode | AST.ScalarTypeExtensionNodeProps,
  ): API.ScalarExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateObjectExt(
    props: GQL.ObjectTypeExtensionNode | AST.ObjectTypeExtensionNodeProps,
  ): API.ObjectExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | AST.InterfaceTypeExtensionNodeProps,
  ): API.InterfaceExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateUnionExt(
    props: GQL.UnionTypeExtensionNode | AST.UnionTypeExtensionNodeProps,
  ): API.UnionExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateEnumExt(
    props: GQL.EnumTypeExtensionNode | AST.EnumTypeExtensionNodeProps,
  ): API.EnumExtApi {
    const node = this._getOrCreateNodeOfKind(props, 'extensionMap', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  getOrCreateInputExt(
    props: GQL.InputObjectTypeExtensionNode | AST.InputObjectTypeExtensionNodeProps,
  ): API.InputExtApi {
    const node = this._getOrCreateNodeOfKind(
      props,
      'extensionMap',
      Kind.INPUT_OBJECT_TYPE_EXTENSION,
    )

    return astNodeToApi(node)
  }

  // ─────────────────────────────────────────────────────────────────

  createScalarExt(
    props: GQL.ScalarTypeExtensionNode | AST.ScalarTypeExtensionNodeProps,
  ): API.ScalarExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.SCALAR_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createObjectExt(
    props: GQL.ObjectTypeExtensionNode | AST.ObjectTypeExtensionNodeProps,
  ): API.ObjectExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createInterfaceExt(
    props: GQL.InterfaceTypeExtensionNode | AST.InterfaceTypeExtensionNodeProps,
  ): API.InterfaceExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.INTERFACE_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createUnionExt(
    props: GQL.UnionTypeExtensionNode | AST.UnionTypeExtensionNodeProps,
  ): API.UnionExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.UNION_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createEnumExt(props: GQL.EnumTypeExtensionNode | AST.EnumTypeExtensionNodeProps): API.EnumExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.ENUM_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  createInputExt(
    props: GQL.InputObjectTypeExtensionNode | AST.InputObjectTypeExtensionNodeProps,
  ): API.InputExtApi {
    const node = this._createNodeOfKind(props, 'extensionMap', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return astNodeToApi(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  removeScalarExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.SCALAR_TYPE_EXTENSION)

    return this
  }

  removeObjectExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.OBJECT_TYPE_EXTENSION)

    return this
  }

  removeInterfaceExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.INTERFACE_TYPE_EXTENSION)

    return this
  }

  removeUnionExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.UNION_TYPE_EXTENSION)

    return this
  }

  removeEnumExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.ENUM_TYPE_EXTENSION)

    return this
  }

  removeInputExt(typename: Typename): this {
    this._removeNodeOfKind(typename, 'extensionMap', Kind.INPUT_OBJECT_TYPE_EXTENSION)

    return this
  }
}

/**
 * `DocumentApi` constructor fn
 *
 * @category API Public
 */
export function documentSchemaApi(): DocumentSchemaApi {
  return new DocumentSchemaApi()
}
