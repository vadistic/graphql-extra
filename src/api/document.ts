import {
  DefinitionNode,
  DirectiveDefinitionNode,
  DocumentNode,
  isTypeDefinitionNode,
  Kind,
  parse,
  ParseOptions,
  TypeDefinitionNode,
  EnumTypeDefinitionNode,
  ASTKindToNode,
} from 'graphql'
import { documentNode, EnumTypeDefinitionNodeProps, enumTypeDefinitionNode } from '../node/ast'
import { getName, applyPropsCloned } from '../utils'
import { isDirectiveDefinitionNode } from '../node'
import {
  enumTypeApi,
  EnumTypeApi,
  InterfaceTypeApi,
  interfaceTypeApi,
  objectTypeApi,
  ObjectTypeApi,
  scalarTypeApi,
  ScalarTypeApi,
  TypeDefinitonApi,
  UnionTypeApi,
  unionTypeApi,
  inputObjectTypeApi,
  InputObjectTypeApi,
} from './type'

//
// ────────────────────────────────────────────────────────  ──────────
//   :::::: D O C U M E N T : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────
//

export type SDLInput = string | DocumentNode | (string | DocumentNode)[]

const PARSE_OPTIONS: ParseOptions = {
  experimentalFragmentVariables: true,
  noLocation: true,
}

function normaliseSDLInput(sdl: SDLInput): DefinitionNode[] {
  if (typeof sdl === 'string') {
    return [...parse(sdl, PARSE_OPTIONS).definitions]
  }

  if (Array.isArray(sdl)) {
    return sdl.flatMap(normaliseSDLInput)
  }

  if (sdl.kind === Kind.DOCUMENT) {
    return [...sdl.definitions]
  }

  throw Error(`invalid sdl \n ${JSON.stringify(sdl, null, 2)}`)
}

// ────────────────────────────────────────────────────────────────────────────────

function typeNodeToApi(node: TypeDefinitionNode) {
  switch (node.kind) {
    case Kind.ENUM_TYPE_DEFINITION:
      return enumTypeApi(node)
    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
      return inputObjectTypeApi(node)
    case Kind.INTERFACE_TYPE_DEFINITION:
      return interfaceTypeApi(node)
    case Kind.OBJECT_TYPE_DEFINITION:
      return objectTypeApi(node)
    case Kind.SCALAR_TYPE_DEFINITION:
      return scalarTypeApi(node)
    case Kind.UNION_TYPE_DEFINITION:
      return unionTypeApi(node)
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeMap = Map<string, TypeDefinitionNode>
export type DirectiveMap = Map<string, DirectiveDefinitionNode>

export interface DocumentApi {
  typeMap: TypeMap
  directiveMap: DirectiveMap

  addSDL(sdl: SDLInput): DocumentApi
  toDocument(): DocumentNode

  hasType(typename: string): boolean
  getType(typename: string): TypeDefinitonApi
  removeType(typename: string): DocumentApi

  getEnumType(typename: string): EnumTypeApi
  getInputObjectType(typename: string): InputObjectTypeApi
  getInterfaceType(typename: string): InterfaceTypeApi
  getObjectType(typename: string): ObjectTypeApi
  getScalarType(typename: string): ScalarTypeApi
  getUnionType(typename: string): UnionTypeApi

  getOrCreateEnumType(props: EnumTypeDefinitionNode | EnumTypeDefinitionNodeProps): EnumTypeApi
}

export function documentApi(): DocumentApi {
  const typeMap: TypeMap = new Map()
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

  const getNodeOfKind = <K extends TypeDefinitionNode['kind']>(
    typename: string,
    kind: K,
  ): ASTKindToNode[K] => {
    const node = getNode(typename)

    if (node.kind !== kind) {
      throw Error(`requested '${kind}', but type '${typename}' is '${node.kind}'`)
    }

    return node as ASTKindToNode[K]
  }

  const createNodeOfKind = <P, K extends TypeDefinitionNode['kind']>(
    props: P,
    kind: K,
    onCreate: (props: P) => ASTKindToNode[K],
  ): ASTKindToNode[K] => {
    const typename = getName(props)
    const node = applyPropsCloned(onCreate, props)

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
    props: P,
    kind: K,
    onCreate: (props: P) => ASTKindToNode[K],
  ): ASTKindToNode[K] => {
    const typename = getName(props)

    if (typeMap.has(typename)) {
      return getNodeOfKind(typename, kind)
    } else {
      return createNodeOfKind(props, kind, onCreate)
    }
  }

  //
  // ─── PUBLIC ─────────────────────────────────────────────────────────────────────
  //

  return {
    typeMap,
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

        throw Error(`invalid definition \n ${JSON.stringify(node, null, 2)}`)
      }

      return this
    },

    toDocument() {
      return documentNode([...directiveMap.values(), ...typeMap.values()])
    },

    // ─────────────────────────────────────────────────────────────────

    hasType(typename) {
      return typeMap.has(typename)
    },

    getType(typename) {
      const node = getNode(typename)

      return typeNodeToApi(node)
    },

    removeType(typename) {
      removeNode(typename)
      return this
    },

    // ─────────────────────────────────────────────────────────────────

    getEnumType(typename) {
      return enumTypeApi(getNodeOfKind(typename, Kind.ENUM_TYPE_DEFINITION))
    },

    getInputObjectType(typename) {
      return inputObjectTypeApi(getNodeOfKind(typename, Kind.INPUT_OBJECT_TYPE_DEFINITION))
    },

    getInterfaceType(typename) {
      return interfaceTypeApi(getNodeOfKind(typename, Kind.INTERFACE_TYPE_DEFINITION))
    },

    getObjectType(typename) {
      return this.getType(typename).assertObjectType()
    },

    getScalarType(typename) {
      return this.getType(typename).assertScalarType()
    },

    getUnionType(typename) {
      return this.getType(typename).assertUnionType()
    },

    // ─────────────────────────────────────────────────────────────────

    getOrCreateEnumType(props) {
      const node = getOrCreateNodeOfKind(props, Kind.ENUM_TYPE_DEFINITION, enumTypeDefinitionNode)

      return enumTypeApi(node)
    },
  }
}
