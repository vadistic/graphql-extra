import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Api, Ast, Mixin } from '../internal'
import { validateNodeKind, mutable, applyProps } from '../utils'

/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export class OperationTypeDefinitionApi extends Mix(Mixin.NamedTypeMixin, Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.OperationTypeDefinitionNode) {
    super(node)

    validateNodeKind(Kind.OPERATION_TYPE_DEFINITION, node)
  }

  getOperation(): GQL.OperationTypeNode {
    return this.node.operation
  }

  setOperation(operation: GQL.OperationTypeNode): this {
    mutable(this.node).operation = operation

    return this
  }

  getType(): Api.NamedTypeApi {
    return Api.namedTypeApi(this.node.type)
  }

  setType(type: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    mutable(this.node).type = applyProps(Ast.namedTypeNode, type)

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
