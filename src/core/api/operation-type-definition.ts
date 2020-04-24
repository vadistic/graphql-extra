import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { NamedTypeNodeProps, namedTypeNode } from '../../node/ast'
import { mutable, applyProps } from '../../utils'
import { validateNodeKind } from '../errors'
import { NamedTypeApiMixin } from '../mixins/type'
import { NamedTypeApi, namedTypeApi } from './type'


/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class OperationTypeDefinitionApi extends Mix(NamedTypeApiMixin) {
  constructor(readonly node: GQL.OperationTypeDefinitionNode) {
    super([node])

    validateNodeKind(Kind.OPERATION_TYPE_DEFINITION, node)
  }

  getOperation(): GQL.OperationTypeNode {
    return this.node.operation
  }

  setOperation(operation: GQL.OperationTypeNode): this {
    mutable(this.node).operation = operation

    return this
  }

  getType(): NamedTypeApi {
    return namedTypeApi(this.node.type)
  }

  setType(type: GQL.NamedTypeNode | NamedTypeNodeProps): this {
    mutable(this.node).type = applyProps(namedTypeNode, type)

    return this
  }
}


/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function operationTypeDefinitionApi(node: GQL.OperationTypeDefinitionNode): OperationTypeDefinitionApi {
  return new OperationTypeDefinitionApi(node)
}
