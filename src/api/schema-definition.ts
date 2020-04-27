import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Hooks, Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class SchemaDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.SchemaDefinitionNode) {
    super([node])

    validateNodeKind(Kind.SCHEMA_DEFINITION, node)
  }

  // export interface SchemaDefinitionNode {
  //   readonly kind: 'SchemaDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly operationTypes: ReadonlyArray<OperationTypeDefinitionNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly operationTypes = Hooks.operationsTypeMixin(this.node)
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
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.SchemaExtensionNode) {
    super([node])

    validateNodeKind(Kind.SCHEMA_EXTENSION, node)
  }

  // export type SchemaExtensionNode = {
  //   readonly kind: 'SchemaExtension';
  //   readonly loc?: Location;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly operationTypes?: ReadonlyArray<OperationTypeDefinitionNode>;
  // };

  readonly directives = Hooks.directivesMixin(this.node)

  readonly operationTypes = Hooks.operationsTypeMixin(this.node)
}

/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function schemaExtensionApi(node: GQL.SchemaExtensionNode): SchemaExtensionApi {
  return new SchemaExtensionApi(node)
}
