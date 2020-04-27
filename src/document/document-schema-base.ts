import type * as GQL from 'graphql'
import {
  print,
  buildASTSchema,
  execute,
  getIntrospectionQuery,
  parse,
  GraphQLError,
} from 'graphql'

import { Ast, Guard } from '../internal'
import { guardsOr } from '../types'
import { SDLInput, parseSDL, concat } from '../utils'


export abstract class DocumentSchemaApiBase {
  constructor(doc?: SDLInput | GQL.DocumentNode) {
    if (doc && typeof doc === 'object' && !Array.isArray(doc)) {
      this.node = doc
    }
    else {
      this.node = Ast.documentNode({ definitions: [] })

      if (doc) {
        this.addSDL(doc)
      }
    }
  }

  node: GQL.DocumentNode


  // ────────────────────────────────────────────────────────────────────────────────
  // deserialisation

  /** add more typedefs */
  addSDL(sdl: SDLInput): this {
    const definitions = parseSDL(sdl)

    concat(this.node.definitions, ...definitions)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // serialisation

  /** serialise to `DocumentNode` */
  toDocument(): GQL.DocumentNode {
    return this.node
  }

  /** serialise to `string` */
  toString(): string {
    return print(this.node)
  }

  /** serialise to `GraphQLSchema` */
  toSchema(options?: GQL.BuildSchemaOptions): GQL.GraphQLSchema {
    return buildASTSchema(this.node, options)
  }

  // TODO: optimise
  /** serialise to graphql introspection query result */
  toJson(options?: GQL.BuildSchemaOptions): GQL.ExecutionResult {
    const hasSchemaDef = this.node.definitions
      .filter(guardsOr(Guard.isSchemaDefinitionNode, Guard.isSchemaExtensionNode))

    const hasRoots = hasSchemaDef
      ? hasSchemaDef.some((node) => node.operationTypes?.length ?? false)
      : this.node.definitions.some((node) =>
        (Guard.isObjectTypeDefinitionNode(node) || Guard.isObjectTypeExtensionNode(node))
          && ['Query', 'Mutation', 'Subscription'].includes(node.name.value))

    if (!hasRoots) {
      throw new GraphQLError('cannot generate instrospection query result on schema without root types', this.node)
    }

    const result = execute({
      schema: this.toSchema(options),
      document: parse(getIntrospectionQuery()),
    })

    // it will be sync value, because schema has no (async) resolvers
    return result as GQL.ExecutionResult
  }
}
