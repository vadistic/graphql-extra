import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { mutable, validateNodeKind } from '../utils'

/**
 *  API for GraphQL `OperationDefinitionNode`
 *
 * @category API Public
 */
export class OperationDefinitionApi extends Mix(
  Mixin.NameOptionalMixin,
  Mixin.DirectivesMixin,
  Mixin.SelectionSetMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.OperationDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.OPERATION_DEFINITION, node)
  }

  getOperationType(): GQL.OperationTypeNode {
    return this.node.operation
  }

  setOperationType(operation: GQL.OperationTypeNode): this {
    mutable(this.node).operation = operation

    return this
  }
}
/**
 * `OperationDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function operationDefinitionApi(node: GQL.OperationDefinitionNode): OperationDefinitionApi {
  return new OperationDefinitionApi(node)
}
