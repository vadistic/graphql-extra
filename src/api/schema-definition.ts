import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class SchemaDefinitionApi extends Mix(
  Mixin.DescriptionApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.OperationTypeDefinitionApiMixin,
) {
  constructor(readonly node: GQL.SchemaDefinitionNode) {
    super([node], [node], [node])

    validateNodeKind(Kind.SCHEMA_DEFINITION, node)
  }
}


/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function schemaDefinitionApi(node: GQL.SchemaDefinitionNode): SchemaDefinitionApi {
  return new SchemaDefinitionApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `SchemaExtensionNode`
 *
 * @category API Public
 */
export class SchemaExtensionApi extends Mix(
  Mixin.DirectivesApiMixin,
  Mixin.OperationTypeDefinitionApiMixin,
) {
  constructor(readonly node: GQL.SchemaExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.SCHEMA_EXTENSION, node)
  }
}

/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function schemaExtensionApi(node: GQL.SchemaExtensionNode): SchemaExtensionApi {
  return new SchemaExtensionApi(node)
}
