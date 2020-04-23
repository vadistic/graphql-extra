import type * as GQL from 'graphql'
import { Mix } from 'mix-classes'

import { mutable } from '../../utils'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameOptionalApiMixin } from '../mixins/name'

/**
 *  API for GraphQL `OperationDefinitionNode`
 *
 * @category API Public
 */
export class OperationDefinitionApi extends Mix(NameOptionalApiMixin, DirectivesApiMixin) {
  constructor(readonly node: GQL.OperationDefinitionNode) {
    super([node], [node])
  }

  getOperationType(): GQL.OperationTypeNode {
    return this.node.operation
  }

  setOperationType(value: GQL.OperationTypeNode): this {
    mutable(this.node).operation = value

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
