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
export class OperationTypeDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.OperationTypeDefinitionNode) {
    super([node])

    validateNodeKind(Kind.OPERATION_TYPE_DEFINITION, node)
  }

  // export interface OperationTypeDefinitionNode {
  //   readonly kind: 'OperationTypeDefinition';
  //   readonly loc?: Location;
  //   readonly operation: OperationTypeNode;
  //   readonly type: NamedTypeNode;
  // }

  readonly operation = Hooks.operationMixin(this.node)

  readonly type = Hooks.namedTypeMixin(this.node)
}


/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function operationTypeDefinitionApi(node: GQL.OperationTypeDefinitionNode): OperationTypeDefinitionApi {
  return new OperationTypeDefinitionApi(node)
}
