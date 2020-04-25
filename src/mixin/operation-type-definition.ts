import * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import {
  applyNullable,
  crudCreate,
  crudUpdate,
  crudUpsert,
  crudRemove,
} from '../utils'

/**
 * @category API Mixins
 */
export type OperationTypeDefinitionApiMixinNode =
  | GQL.SchemaDefinitionNode
  | GQL.SchemaExtensionNode

/**
 * @category API Mixins
 */
export class OperationTypeDefinitionApiMixin {
  constructor(readonly node: OperationTypeDefinitionApiMixinNode) {}

  getOperationType(operation: GQL.OperationTypeNode): Api.OperationTypeDefinitionApi | undefined {
    const opType = this.node.operationTypes?.find((type) => type.operation === operation)

    return applyNullable(Api.operationTypeDefinitionApi)(opType)
  }

  getOperationTypename(operation: GQL.OperationTypeNode): string | undefined {
    return this.getOperationType(operation)?.getTypename()
  }

  hasOperationType(operation: GQL.OperationTypeNode): boolean {
    return !!this.getOperationType(operation)
  }

  getOperationTypes(): Api.OperationTypeDefinitionApi[] {
    return this.node.operationTypes?.map(Api.operationTypeDefinitionApi) ?? []
  }

  getOperationTypenames(): Typename[] {
    return this.node.operationTypes?.map((op) => op.type.name.value) ?? []
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    crudCreate({
      node: this.node,
      key: 'operationTypes',
      getter: (el) => el.operation,
      factory: Ast.operationTypeDefinitionNode,
      props,
    })

    return this
  }

  updateOperationType(
    operation: GQL.OperationTypeNode,
    props: Partial<GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps>,
  ): this {
    crudUpdate({
      node: this.node,
      key: 'operationTypes',
      getter: (el) => el.operation,
      factory: Ast.operationTypeDefinitionNode,
      props,
      target: operation,
    })

    return this
  }


  upsertOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    crudUpsert({
      node: this.node,
      key: 'operationTypes',
      getter: (el) => el.operation,
      factory: Ast.operationTypeDefinitionNode,
      props,
    })

    return this
  }


  removeOperationType(operation: GQL.OperationTypeNode): this {
    crudRemove({
      node: this.node,
      key: 'operationTypes',
      getter: (el) => el.operation,
      target: operation,
    })

    return this
  }


  // ────────────────────────────────────────────────────────────────────────────────


  getQuery(): Api.OperationTypeDefinitionApi | undefined {
    return this.getOperationType('query')
  }

  getMutation(): Api.OperationTypeDefinitionApi | undefined {
    return this.getOperationType('mutation')
  }

  getSubscription(): Api.OperationTypeDefinitionApi | undefined {
    return this.getOperationType('subscription')
  }

  getQueryTypename(): Typename |undefined {
    return this.getOperationTypename('query')
  }

  getMutationTypename(): Typename |undefined {
    return this.getOperationTypename('mutation')
  }

  getSubscriptionTypename(): Typename |undefined {
    return this.getOperationTypename('subscription')
  }
}

/**
 * @category API Mixins
 */
export function operationTypeDefinitionApiMixin(
  node: OperationTypeDefinitionApiMixinNode,
): OperationTypeDefinitionApiMixin {
  return new OperationTypeDefinitionApiMixin(node)
}
