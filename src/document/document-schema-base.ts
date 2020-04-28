import type * as GQL from 'graphql'
import {
  isTypeDefinitionNode,
  isTypeExtensionNode,
  print,
  Kind,
  buildASTSchema,
  execute,
  getIntrospectionQuery,
  parse,
} from 'graphql'

import {
  Ast,
  Guard,
} from '../internal'
import { kindToNode } from '../kind-to-node'
import { Typename } from '../types'
import {
  applyPropsCloned, getName, SDLInput, parseSDL,
} from '../utils'

/**
 * @category API Public
 */
export type DocumentSchemaTypeMapValues = {
  type: GQL.TypeDefinitionNode
  extension: GQL.TypeExtensionNode
  directive: GQL.DirectiveDefinitionNode
}

/**
 * @category API Public
 */
export type DocumentSchemaTypeMap = {
  [K in keyof DocumentSchemaTypeMapValues]: Map<Typename, DocumentSchemaTypeMapValues[K]>
}

/**
 * @category API Public
 */
export type DocumentSchemaRoots = {
  schema: GQL.SchemaDefinitionNode | undefined
  query: GQL.ObjectTypeDefinitionNode | undefined
  mutation: GQL.ObjectTypeDefinitionNode | undefined
  subscription: GQL.ObjectTypeDefinitionNode | undefined
}

/**
 * @category API Public
 */
export abstract class DocumentSchemaApiBase {
  maps: DocumentSchemaTypeMap = {
    type: new Map(),
    extension: new Map(),
    directive: new Map(),
  }

  roots: DocumentSchemaRoots = {
    schema: undefined,
    query: undefined,
    mutation: undefined,
    subscription: undefined,
  }

  constructor(sdl?: SDLInput) {
    if (sdl) {
      this.addSDL(sdl)
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // crud

  protected _getNode<F extends keyof DocumentSchemaTypeMap>(
    typename: Typename,
    from: F,
  ): DocumentSchemaTypeMapValues[F] {
    const node = this.maps[from].get(typename)

    if (!node) {
      throw Error(`cannot get '${typename}' because is does not exist in ${from}`)
    }

    return node as DocumentSchemaTypeMapValues[F]
  }

  protected _hasNode(typename: Typename, from: keyof DocumentSchemaTypeMap): boolean {
    return this.maps[from].has(typename)
  }

  protected _removeNode(typename: Typename, from: keyof DocumentSchemaTypeMap): void {
    const isFound = this.maps[from].delete(typename)

    if (!isFound) {
      throw Error(`cannot remove '${typename}' because does not exist in ${from}`)
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // crud of kind

  protected _getNodeOfKind <K extends GQL.KindEnum>(
    typename: string,
    from: keyof DocumentSchemaTypeMap,
    kind: K,
  ): GQL.ASTKindToNode[K] {
    const node = this._getNode(typename, from)

    if (node.kind !== kind) {
      throw Error(`cannot get '${typename}' because it's ${node.kind} instead of ${kind}`)
    }

    return node as GQL.ASTKindToNode[K]
  }

  protected _createNodeOfKind <P, K extends GQL.KindEnum>(
    props: P,
    from: keyof DocumentSchemaTypeMap,
    kind: K,
  ): GQL.ASTKindToNode[K] {
    const typename = getName(props)
    const nodeFn = kindToNode(kind)
    const node = applyPropsCloned(nodeFn, props as any)

    if (node.kind !== kind) {
      throw Error(`cannot create '${typename}' because provided ${node.kind} instead of ${kind}`)
    }

    if (this._hasNode(typename, from)) {
      throw Error(`cannot create '${typename}' because it already exists`)
    }

    // persist
    this.maps[from].set(typename, node as any)

    return node as GQL.ASTKindToNode[K]
  }

  protected _getOrCreateNodeOfKind <P, K extends GQL.KindEnum>(
    props: P,
    from: keyof DocumentSchemaTypeMap,
    kind: K,
  ): GQL.ASTKindToNode[K] {
    const typename = getName(props)

    if (this._hasNode(typename, from)) {
      return this._getNodeOfKind(typename, from, kind)
    }

    return this._createNodeOfKind(props, from, kind)
  }

  protected _removeNodeOfKind<K extends GQL.KindEnum>(
    typename: string,
    from: keyof DocumentSchemaTypeMap,
    kind: K,
  ): void {
    const node = this.maps[from].get(typename)

    if (!node) {
      throw Error(`cannot remove '${typename}\n` + `node does not exist in ${from}`)
    }

    if (node.kind !== kind) {
      throw Error(
        `cannot remove '${typename}'\n`
          + `found node of type '${node.kind}' in ${from} that does not match type condition '${kind}'`,
      )
    }

    this.maps[from].delete(typename)
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // roots

  protected _getRootType(
    operation: GQL.OperationTypeNode,
  ): GQL.ObjectTypeDefinitionNode | undefined {
    const operationToTypename = {
      query: 'Query',
      mutation: 'Mutation',
      subscription: 'Subscription',
    }

    const typename = this.roots.schema
      ? this.roots.schema.operationTypes.find((op) => op.operation === operation)?.type.name.value
      : operationToTypename[operation]

    const node = typename ? this.maps.type.get(typename) : undefined

    if (!node) {
      return undefined
    }

    if (node.kind !== Kind.OBJECT_TYPE_DEFINITION) {
      throw Error(`Root type '${typename}' for ${operation} should be ${Kind.OBJECT_TYPE_DEFINITION}`)
    }

    return node
  }

  protected _getRoots(): DocumentSchemaRoots {
    return {
      query: this._getRootType('query'),
      mutation: this._getRootType('mutation'),
      subscription: this._getRootType('subscription'),
      schema: this.roots.schema,
    }
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // deserialisation

  /** add more typedefs */
  addSDL(sdl: SDLInput): this {
    const definitions = parseSDL(sdl)

    // update maps
    for (const node of definitions) {
      if (Guard.isDirectiveDefinitionNode(node)) {
        this.maps.directive.set(node.name.value, node)
      }
      else if (isTypeDefinitionNode(node)) {
        this.maps.type.set(node.name.value, node)
      }
      else if (isTypeExtensionNode(node)) {
        this.maps.extension.set(node.name.value, node)
      }
      else if (Guard.isSchemaDefinitionNode(node)) {
        this.roots.schema = node
      }
      else {
        throw Error(`invalid definition \n ${JSON.stringify(node, null, 2)}`)
      }
    }

    // update roots
    this.roots = this._getRoots()

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // serialisation

  /** serialise to `DocumentNode` */
  toDocument(): GQL.DocumentNode {
    return Ast.documentNode({
      definitions: [
        ...(this.roots.schema ? [this.roots.schema] : []),
        ...this.maps.directive.values(),
        ...this.maps.type.values(),
        ...this.maps.extension.values(),
      ],
    })
  }

  /** serialise to `string` */
  toString(): string {
    return print(this.toDocument())
  }

  /** serialise to `GraphQLSchema` */
  toSchema(options?: GQL.BuildSchemaOptions): GQL.GraphQLSchema {
    return buildASTSchema(this.toDocument(), options)
  }

  // TODO: optimise?
  /** serialise to graphql introspection query result */
  toJson(options?: GQL.BuildSchemaOptions): GQL.ExecutionResult {
    const roots = this._getRoots()

    if (!roots.query && !roots.mutation && !roots.subscription) {
      throw Error('cannot generate instrospection query result on schema without root types')
    }

    const result = execute({
      schema: this.toSchema(options),
      document: parse(getIntrospectionQuery()),
    })

    // it will be sync value, because schema has no (async) resolvers
    return result as GQL.ExecutionResult
  }
}
