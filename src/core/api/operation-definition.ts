import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { mutable } from '../../utils'
import { validateNodeKind } from '../errors'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameOptionalApiMixin } from '../mixins/name'
import { SelectionSetApiMixin } from './selection'


/**
 *  API for GraphQL `OperationDefinitionNode`
 *
 * @category API Public
 */
export class OperationDefinitionApi extends Mix(
  NameOptionalApiMixin,
  DirectivesApiMixin,
  SelectionSetApiMixin,
) {
  constructor(readonly node: GQL.OperationDefinitionNode) {
    super([node], [node], [node])

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
