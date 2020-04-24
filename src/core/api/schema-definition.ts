import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind } from '../errors'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { OperationTypeDefinitionApiMixin } from '../mixins/operation-type-definition'

/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class SchemaDefinitionApi extends Mix(DescriptionApiMixin, DirectivesApiMixin, OperationTypeDefinitionApiMixin) {
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
export class SchemaExtensionApi extends Mix(DirectivesApiMixin, OperationTypeDefinitionApiMixin) {
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
