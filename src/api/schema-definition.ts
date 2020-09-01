import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class SchemaDefinitionApi extends Mix(
  Mixin.DescriptionMixin,
  Mixin.DirectivesMixin,
  Mixin.OperationTypeDefinitionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.SchemaDefinitionNode) {
    super(node)

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
  Mixin.DirectivesMixin,
  Mixin.OperationTypeDefinitionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.SchemaExtensionNode) {
    super(node)

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
