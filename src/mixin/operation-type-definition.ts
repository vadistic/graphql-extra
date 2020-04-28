import * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import { Crud } from '../utils'

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

  readonly _operationTypes = new Crud({
    parent: this.node,
    key: 'operationTypes',
    factory: Ast.operationTypeDefinitionNode,
    api: Api.operationTypeDefinitionApi,
    matcher: (node): GQL.OperationTypeNode => node.operation,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getOperationType(operation: GQL.OperationTypeNode): Api.OperationTypeDefinitionApi | undefined {
    return this._operationTypes.findOne(operation)
  }

  getOperationTypename(operation: GQL.OperationTypeNode): string | undefined {
    return this._operationTypes.findOne(operation)?.getTypename()
  }

  hasOperationType(operation: GQL.OperationTypeNode): boolean {
    return !!this._operationTypes.has(operation)
  }

  getOperationTypes(): Api.OperationTypeDefinitionApi[] {
    return this._operationTypes.findMany()
  }

  getOperationTypenames(): Typename[] {
    return this.node.operationTypes?.map((op) => op.type.name.value) ?? []
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    this._operationTypes.create(props)

    return this
  }

  updateOperationType(
    operation: GQL.OperationTypeNode,
    props: Partial<GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps>,
  ): this {
    this._operationTypes.update(operation, props)

    return this
  }

  upsertOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    this._operationTypes.upsert(props)

    return this
  }

  removeOperationType(operation: GQL.OperationTypeNode): this {
    this._operationTypes.remove(operation)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getQuery(): Api.OperationTypeDefinitionApi | undefined {
    return this._operationTypes.findOne('query')
  }

  getMutation(): Api.OperationTypeDefinitionApi | undefined {
    return this._operationTypes.findOne('mutation')
  }

  getSubscription(): Api.OperationTypeDefinitionApi | undefined {
    return this._operationTypes.findOne('subscription')
  }

  getQueryTypename(): Typename |undefined {
    return this._operationTypes.findOne('query')?.getTypename()
  }

  getMutationTypename(): Typename |undefined {
    return this._operationTypes.findOne('mutation')?.getTypename()
  }

  getSubscriptionTypename(): Typename |undefined {
    return this._operationTypes.findOne('subscription')?.getTypename()
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
