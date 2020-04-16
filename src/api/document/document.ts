import {
  DirectiveDefinitionNode,
  DocumentNode,
  isTypeDefinitionNode,
  Kind,
  TypeDefinitionNode,
  EnumTypeDefinitionNode,
  ASTKindToNode,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  UnionTypeDefinitionNode,
  TypeExtensionNode,
  isTypeExtensionNode,
  print,
} from 'graphql'

import {
  documentNode,
  EnumTypeDefinitionNodeProps,
  isDirectiveDefinitionNode,
  astKindToFunction,
  ObjectTypeDefinitionNodeProps,
  InterfaceTypeDefinitionNodeProps,
  InputObjectTypeDefinitionNodeProps,
  ScalarTypeDefinitionNodeProps,
  UnionTypeDefinitionNodeProps,
  DirectiveDefinitionNodeProps,
  directiveDefinitionNode,
} from '../../node'
import { getName, applyPropsCloned, cloneDeep } from '../../utils'
import {
  enumTypeApi,
  EnumTypeApi,
  InterfaceTypeApi,
  interfaceTypeApi,
  ObjectTypeApi,
  ScalarTypeApi,
  UnionTypeApi,
  inputTypeApi,
  InputTypeApi,
  TypeDefinitonApi,
  objectTypeApi,
  scalarTypeApi,
  unionTypeApi,
  TypeExtensionApi,
  DirectiveDefinitionApi,
  directiveDefinitionApi,
} from '../apis'
import { astKindToApi } from '../kind-to-api'
import { SDLInput, normaliseSDLInput } from './helper'

// ────────────────────────────────────────────────────────────────────────────────

export type TypeMap = Map<string, TypeDefinitionNode>
export type ExtMap = Map<string, TypeExtensionNode>

export type DirectiveMap = Map<string, DirectiveDefinitionNode>

export interface DocumentApi {
  typeMap: TypeMap
  extMap: ExtMap
  directiveMap: DirectiveMap

  /** add string or DocumentNode typeDefs */
  addSDL(sdl: SDLInput): DocumentApi
  /** print typeDefs to string */
  toSDLString(): string
  /** get typeDefs in DocuemntNode */
  toDocument(): DocumentNode
  /** deep clone all definitions and return another api instance */
  cloneInstance(): DocumentApi

  hasType(typename: string): boolean
  getType(typename: string): TypeDefinitonApi
  removeType(typename: string): DocumentApi

  hasExt(typename: string): boolean
  getExt(typename: string): TypeExtensionApi
  removeExt(typename: string): DocumentApi

  hasDirective(directiveName: string): boolean
  getDirective(directiveName: string): DirectiveDefinitionApi
  removeDirective(directiveName: string): DocumentApi
  getOrCreateDirective(
    props: DirectiveDefinitionNode | DirectiveDefinitionNodeProps,
  ): DirectiveDefinitionApi
  createDirective(
    props: DirectiveDefinitionNode | DirectiveDefinitionNodeProps,
  ): DirectiveDefinitionApi

  getScalarType(typename: string): ScalarTypeApi
  getObjectType(typename: string): ObjectTypeApi
  getInterfaceType(typename: string): InterfaceTypeApi
  getUnionType(typename: string): UnionTypeApi
  getEnumType(typename: string): EnumTypeApi
  getInputType(typename: string): InputTypeApi

  getOrCreateScalarType(
    props: ScalarTypeDefinitionNode | ScalarTypeDefinitionNodeProps,
  ): ScalarTypeApi
  getOrCreateObjectType(
    props: ObjectTypeDefinitionNode | ObjectTypeDefinitionNodeProps,
  ): ObjectTypeApi
  getOrCreateInterfaceType(
    props: InterfaceTypeDefinitionNode | InterfaceTypeDefinitionNodeProps,
  ): InterfaceTypeApi
  getOrCreateUnionType(props: UnionTypeDefinitionNode | UnionTypeDefinitionNodeProps): UnionTypeApi
  getOrCreateEnumType(props: EnumTypeDefinitionNode | EnumTypeDefinitionNodeProps): EnumTypeApi
  getOrCreateInputType(
    props: InputObjectTypeDefinitionNode | InputObjectTypeDefinitionNodeProps,
  ): InputTypeApi

  createScalarType(props: ScalarTypeDefinitionNode | ScalarTypeDefinitionNodeProps): ScalarTypeApi
  createObjectType(props: ObjectTypeDefinitionNode | ObjectTypeDefinitionNodeProps): ObjectTypeApi
  createInterfaceType(
    props: InterfaceTypeDefinitionNode | InterfaceTypeDefinitionNodeProps,
  ): InterfaceTypeApi
  createUnionType(props: UnionTypeDefinitionNode | UnionTypeDefinitionNodeProps): UnionTypeApi
  createEnumType(props: EnumTypeDefinitionNode | EnumTypeDefinitionNodeProps): EnumTypeApi
  createInputType(
    props: InputObjectTypeDefinitionNode | InputObjectTypeDefinitionNodeProps,
  ): InputTypeApi
}

export function documentApi(): DocumentApi {
  const typeMap: TypeMap = new Map()
  const extMap: ExtMap = new Map()

  const directiveMap: DirectiveMap = new Map()

  //
  // ─── PRIVATE ────────────────────────────────────────────────────────────────────
  //

  const getNode = (typename: string): TypeDefinitionNode => {
    const node = typeMap.get(typename)

    if (!node) {
      throw Error(`type '${typename}' does not exist`)
    }

    return node
  }

  const removeNode = (typename: string) => {
    const isFound = typeMap.delete(typename)

    if (!isFound) {
      throw Error(`type '${typename}' does not exist`)
    }
  }

  const getExt = (typename: string): TypeExtensionNode => {
    const node = extMap.get(typename)

    if (!node) {
      throw Error(`type extension '${typename}' does not exist`)
    }

    return node
  }

  const removeExt = (typename: string) => {
    const isFound = extMap.delete(typename)

    if (!isFound) {
      throw Error(`type extension '${typename}' does not exist`)
    }
  }

  const getNodeOfKind = <K extends TypeDefinitionNode['kind']>(
    kind: K,
    typename: string,
  ): ASTKindToNode[K] => {
    const node = getNode(typename)

    if (node.kind !== kind) {
      throw Error(`requested '${kind}', but type '${typename}' is '${node.kind}'`)
    }

    return node as ASTKindToNode[K]
  }

  const createNodeOfKind = <P, K extends TypeDefinitionNode['kind']>(
    kind: K,
    props: P,
  ): ASTKindToNode[K] => {
    const typename = getName(props)
    const createFn = astKindToFunction(kind)
    // FIXME: typings
    const node = applyPropsCloned(createFn as () => any, props) as ASTKindToNode[K]

    if (node.kind !== kind) {
      throw Error(`creating '${kind}', but provided node '${typename}' is '${node.kind}'`)
    }

    if (typeMap.has(typename)) {
      throw Error(`type '${typename}' already exists`)
    }

    typeMap.set(typename, node)

    return node
  }

  const getOrCreateNodeOfKind = <P, K extends TypeDefinitionNode['kind']>(
    kind: K,
    props: P,
  ): ASTKindToNode[K] => {
    const typename = getName(props)

    if (typeMap.has(typename)) {
      return getNodeOfKind(kind, typename)
    }

    return createNodeOfKind(kind, props)
  }

  //
  // ─── PUBLIC ─────────────────────────────────────────────────────────────────────
  //

  return {
    typeMap,
    extMap,
    directiveMap,

    addSDL(sdl) {
      const definitions = normaliseSDLInput(sdl)

      for (const node of definitions) {
        if (isDirectiveDefinitionNode(node)) {
          directiveMap.set(node.name.value, node)
          continue
        }

        if (isTypeDefinitionNode(node)) {
          typeMap.set(node.name.value, node)
          continue
        }

        if (isTypeExtensionNode(node)) {
          extMap.set(node.name.value, node)
          continue
        }

        throw Error(`invalid definition \n ${JSON.stringify(node, null, 2)}`)
      }

      return this
    },

    toDocument() {
      return documentNode([...directiveMap.values(), ...typeMap.values(), ...extMap.values()])
    },

    toSDLString() {
      return print(this.toDocument())
    },

    // TODO: optimise a bit, maybe clone maps elements to awoid addSDL loops
    cloneInstance() {
      return documentApi().addSDL(cloneDeep(this.toDocument()))
    },

    // ─────────────────────────────────────────────────────────────────

    hasType(typename) {
      return typeMap.has(typename)
    },

    getType(typename) {
      const node = getNode(typename)
      const apiFn = astKindToApi(node.kind)

      // FIXME: typings
      return apiFn(node as any)
    },

    removeType(typename) {
      removeNode(typename)
      return this
    },

    // ─────────────────────────────────────────────────────────────────

    hasExt(typename) {
      return extMap.has(typename)
    },

    getExt(typename) {
      const node = getExt(typename)
      const apiFn = astKindToApi(node.kind)

      // FIXME: typings
      return apiFn(node as any)
    },

    removeExt(typename) {
      removeExt(typename)
      return this
    },

    // ─────────────────────────────────────────────────────────────────

    hasDirective(directiveName) {
      return directiveMap.has(directiveName)
    },

    getDirective(directiveName) {
      const node = directiveMap.get(directiveName)

      if (!node) {
        throw Error(`directive '${directiveName}' does not exist`)
      }

      return directiveDefinitionApi(node)
    },

    removeDirective(directiveName) {
      const isFound = extMap.delete(directiveName)

      if (!isFound) {
        throw Error(`directive '${directiveName}' does not exist`)
      }

      return this
    },

    createDirective(props) {
      const directiveName = getName(props)
      const node = applyPropsCloned(directiveDefinitionNode, props)

      if (directiveMap.has(directiveName)) {
        throw Error(`directive '${directiveName}' already exists`)
      }

      if (node.kind !== Kind.DIRECTIVE_DEFINITION) {
        throw Error(`creating Directive '${directiveName}' but provided '${node.kind}'`)
      }

      directiveMap.set(directiveName, node)

      return directiveDefinitionApi(node)
    },

    getOrCreateDirective(props) {
      const directiveName = getName(props)

      if (directiveMap.has(directiveName)) {
        return this.getDirective(directiveName)
      }
      return this.createDirective(props)
    },

    // ─────────────────────────────────────────────────────────────────

    getScalarType(typename) {
      const node = getNodeOfKind(Kind.SCALAR_TYPE_DEFINITION, typename)

      return scalarTypeApi(node)
    },

    getObjectType(typename) {
      const node = getNodeOfKind(Kind.OBJECT_TYPE_DEFINITION, typename)

      return objectTypeApi(node)
    },

    getInterfaceType(typename) {
      const node = getNodeOfKind(Kind.INTERFACE_TYPE_DEFINITION, typename)

      return interfaceTypeApi(node)
    },

    getUnionType(typename) {
      const node = getNodeOfKind(Kind.UNION_TYPE_DEFINITION, typename)

      return unionTypeApi(node)
    },

    getEnumType(typename) {
      const node = getNodeOfKind(Kind.ENUM_TYPE_DEFINITION, typename)

      return enumTypeApi(node)
    },

    getInputType(typename) {
      const node = getNodeOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, typename)

      return inputTypeApi(node)
    },

    // ─────────────────────────────────────────────────────────────────

    getOrCreateScalarType(props) {
      const node = getOrCreateNodeOfKind(Kind.SCALAR_TYPE_DEFINITION, props)

      return scalarTypeApi(node)
    },

    getOrCreateObjectType(props) {
      const node = getOrCreateNodeOfKind(Kind.OBJECT_TYPE_DEFINITION, props)

      return objectTypeApi(node)
    },

    getOrCreateInterfaceType(props) {
      const node = getOrCreateNodeOfKind(Kind.INTERFACE_TYPE_DEFINITION, props)

      return interfaceTypeApi(node)
    },

    getOrCreateUnionType(props) {
      const node = getOrCreateNodeOfKind(Kind.UNION_TYPE_DEFINITION, props)

      return unionTypeApi(node)
    },

    getOrCreateEnumType(props) {
      const node = getOrCreateNodeOfKind(Kind.ENUM_TYPE_DEFINITION, props)

      return enumTypeApi(node)
    },

    getOrCreateInputType(props) {
      const node = getOrCreateNodeOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, props)

      return inputTypeApi(node)
    },

    // ─────────────────────────────────────────────────────────────────

    createScalarType(props) {
      const node = createNodeOfKind(Kind.SCALAR_TYPE_DEFINITION, props)

      return scalarTypeApi(node)
    },

    createObjectType(props) {
      const node = createNodeOfKind(Kind.OBJECT_TYPE_DEFINITION, props)

      return objectTypeApi(node)
    },

    createInterfaceType(props) {
      const node = createNodeOfKind(Kind.INTERFACE_TYPE_DEFINITION, props)

      return interfaceTypeApi(node)
    },

    createUnionType(props) {
      const node = createNodeOfKind(Kind.UNION_TYPE_DEFINITION, props)

      return unionTypeApi(node)
    },

    createEnumType(props) {
      const node = createNodeOfKind(Kind.ENUM_TYPE_DEFINITION, props)

      return enumTypeApi(node)
    },

    createInputType(props) {
      const node = createNodeOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, props)

      return inputTypeApi(node)
    },
  }
}
