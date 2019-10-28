import {
  DocumentNode,
  DefinitionNode,
  parse,
  Kind,
  TypeDefinitionNode,
  DirectiveDefinitionNode,
  isTypeDefinitionNode,
  ParseOptions,
} from 'graphql'
import {
  isDirectiveDefinitionNode,
  documentNode,
  isObjectTypeDefinitionNode,
  isScalarTypeDefinitionNode,
  isInterfaceTypeDefinitionNode,
  isUnionTypeDefinitionNode,
  isEnumTypeDefinitionNode,
} from './node'
import {
  TypeDefinitonApi,
  ObjectTypeApi,
  objectTypeApi,
  scalarTypeApi,
  interfaceTypeApi,
  unionTypeApi,
  enumTypeApi,
  EnumTypeApi,
  ScalarTypeApi,
  UnionTypeApi,
  InterfaceTypeApi,
} from './api-type'

// ────────────────────────────────────────────────────────────────────────────────

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

  throw Error(`normaliseSDLInput(): invalid value ${JSON.stringify(sdl, null, 2)}`)
}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeMap = Map<string, TypeDefinitionNode>
export type DirectiveMap = Map<string, DirectiveDefinitionNode>

export interface AstApi {
  addSDL(sdl: SDLInput): AstApi

  typeMap: TypeMap
  directiveMap: DirectiveMap

  toDocument(): DocumentNode

  // typedefs apis

  getType(typename: string): TypeDefinitonApi
  hasType(typename: string): boolean

  removeType(typename: string): AstApi

  // specifc typedefs
  getObjectType(typename: string): ObjectTypeApi
  getInterfaceType(typename: string): InterfaceTypeApi
  getUnionType(typename: string): UnionTypeApi
  getEnumType(typename: string): EnumTypeApi
  getScalarType(typename: string): ScalarTypeApi
}

export function astApi(this: any, sdl?: SDLInput): AstApi {
  const typeMap: TypeMap = new Map()
  const directiveMap: DirectiveMap = new Map()

  const _addSDL = (sdl: SDLInput) => {
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

      throw Error(`addSDL(): invalid value ${JSON.stringify(node, null, 2)}`)
    }
  }

  // constructor
  if (sdl) {
    _addSDL(sdl)
  }

  return {
    typeMap,
    directiveMap,

    addSDL(sdl) {
      _addSDL(sdl)
      return this
    },

    toDocument() {
      return documentNode([...directiveMap.values(), ...typeMap.values()])
    },

    // types apis

    getType(typename) {
      const node = typeMap.get(typename)

      if (!node) {
        throw Error(`getType: type '${typename}' not found`)
      }

      if (isObjectTypeDefinitionNode(node)) {
        return objectTypeApi(node)
      }

      if (isInterfaceTypeDefinitionNode(node)) {
        return interfaceTypeApi(node)
      }

      if (isScalarTypeDefinitionNode(node)) {
        return scalarTypeApi(node)
      }

      if (isUnionTypeDefinitionNode(node)) {
        return unionTypeApi(node)
      }

      if (isEnumTypeDefinitionNode(node)) {
        return enumTypeApi(node)
      }

      throw Error(this.getType.name + `: corrupted node value ${JSON.stringify(node, null, 2)}`)
    },

    hasType(typename) {
      return typeMap.has(typename)
    },

    removeType(typename) {
      const isFound = typeMap.delete(typename)

      if (!isFound) {
        throw Error(this.removeType.name + ` : type '${typename}' not found`)
      }

      return this
    },

    // specific type api
    getObjectType(typename) {
      return this.getType(typename).assertObjectType()
    },

    getInterfaceType(typename) {
      return this.getType(typename).assertInterfaceType()
    },

    getUnionType(typename) {
      return this.getType(typename).assertUnionType()
    },

    getEnumType(typename) {
      return this.getType(typename).assertEnumType()
    },

    getScalarType(typename) {
      return this.getType(typename).assertScalarType()
    },
  }
}
