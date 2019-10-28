import {
  DocumentNode,
  DefinitionNode,
  parse,
  Kind,
  TypeDefinitionNode,
  DirectiveDefinitionNode,
  isTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ParseOptions,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  FieldDefinitionNode,
} from 'graphql'
import {
  isDirectiveDefinitionNode,
  stringValueNode,
  documentNode,
  FieldDefinitionNodeProps,
  fieldDefinitionNode,
} from './node'
import { DeepMutable, clonedNodeOrProps, upsertByName, spliceByName, appendByName } from './utils'

// ────────────────────────────────────────────────────────────────────────────────

export type SDLInput = string | DocumentNode | (string | DocumentNode)[]
export type TypeMap = Map<string, TypeDefinitionNode>
export type DirectiveMap = Map<string, DirectiveDefinitionNode>

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

export function astApi(this: any, sdl?: SDLInput) {
  const typeMap: TypeMap = new Map()
  const directiveMap: DirectiveMap = new Map()

  const addSDL = (sdl?: SDLInput) => {
    if (!sdl) {
      return
    }

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
  addSDL(sdl)

  // something like class
  return {
    typeMap,
    directiveMap,

    addSDL(sdl?: SDLInput) {
      if (!sdl) {
        return this
      }

      addSDL(sdl)

      return this
    },

    toDocument(): DocumentNode {
      return documentNode([...directiveMap.values(), ...typeMap.values()])
    },

    getType(typename: string): TypeDefinitionNode {
      const type = typeMap.get(typename)

      if (!type) {
        throw Error(`getType(): ${typename} not found`)
      }

      return type
    },

    hasType(typename: string): boolean {
      return typeMap.has(typename)
    },

    removeType(typename: string) {
      const isFound = typeMap.delete(typename)

      if (!isFound) {
        throw Error(`removeType(): ${typename} not found`)
      }

      return this
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface DescriptionApi<This> {
  getDescription(): string | undefined
  hasDescription(): boolean

  createDescription(value: string): This
  upsertDescription(value: string): This
  removeDescription(): This
}

function descriptionApi<This>(node: TypeDefinitionNode): DescriptionApi<This> {
  const _node = node as DeepMutable<TypeDefinitionNode>

  return {
    getDescription() {
      return node.description ? node.description.value : undefined
    },

    hasDescription() {
      return !!node.description
    },

    createDescription(value) {
      if (node.description) {
        throw Error(`createDescription(): description already exists`)
      }

      _node.description = stringValueNode(value)

      return this as any
    },

    upsertDescription(value) {
      _node.description = stringValueNode(value)

      return this as any
    },

    removeDescription() {
      if (!node.description) {
        throw Error(`removeDescription(): description does not exists`)
      }

      _node.description = undefined

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type FieldDefinitionsApiCompatibleNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

export interface FieldsApi<This> {
  getFieldNames(): string[]
  getFields(): SingleFieldDefinitionApi[]

  getField(fieldname: string): SingleFieldDefinitionApi
  hasField(fieldname: string): boolean

  createField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  upsertField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  removeField(fieldname: string): This
}

function fieldDefinitionsApi<This>(node: FieldDefinitionsApiCompatibleNode): FieldsApi<This> {
  const _node = node as DeepMutable<FieldDefinitionsApiCompatibleNode>
  const typename = node.name.value

  return {
    getFieldNames() {
      return node.fields ? node.fields.map(field => field.name.value) : []
    },

    getFields() {
      return node.fields ? node.fields.map(singleFieldDefinitionApi) : []
    },

    getField(fieldname) {
      const field = node.fields && node.fields.find(field => field.name.value === fieldname)

      if (!field) {
        throw Error(
          this.getField.name + `: field '${fieldname}' on type '${typename}' does not exist`,
        )
      }

      return singleFieldDefinitionApi(field)
    },

    hasField(fieldname) {
      return !!node.fields && node.fields.some(field => field.name.value === fieldname)
    },

    createField(props) {
      const field = clonedNodeOrProps(fieldDefinitionNode, props)
      const fieldname = field.name.value

      if (!_node.fields) {
        _node.fields = []
      }

      const isUnique = appendByName(_node.fields, field)

      if (!isUnique) {
        throw Error(
          this.removeField.name + `: field '${fieldname}' on type '${typename}' already exists`,
        )
      }

      return this as any
    },

    upsertField(props) {
      const field = clonedNodeOrProps(fieldDefinitionNode, props)

      if (!_node.fields) {
        _node.fields = []
      }

      upsertByName(_node.fields, field)

      return this as any
    },

    removeField(fieldname) {
      if (!_node.fields || _node.fields.length === 0) {
        throw Error(this.removeField.name + `:  type '${typename}' has no fields`)
      }

      const isFound = spliceByName(_node.fields, fieldname)

      if (!isFound) {
        throw Error(
          this.removeField.name + `: field '${fieldname}' on type '${typename}' does not exists`,
        )
      }

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface SingleFieldDefinitionApi {
  node: FieldDefinitionNode
}

function singleFieldDefinitionApi(node: FieldDefinitionNode): SingleFieldDefinitionApi {
  const _node = node as DeepMutable<FieldDefinitionNode>

  return {
    node,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ObectTypeApi extends DescriptionApi<ObectTypeApi>, FieldsApi<ObectTypeApi> {
  node: ObjectTypeDefinitionNode
}

export function objectTypeApi(node: ObjectTypeDefinitionNode): ObectTypeApi {
  return {
    node,
    ...descriptionApi(node),
    ...fieldDefinitionsApi(node),
  }
}
