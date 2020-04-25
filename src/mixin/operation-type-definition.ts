import * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import { applyNullable, mutable, concat } from '../utils'

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

  protected _findOperationNode(operation: GQL.OperationTypeNode): {
    opType: GQL.OperationTypeDefinitionNode | undefined
    index: number
  } {
    const index = this.node.operationTypes?.findIndex((type) => type.operation === operation) ?? -1

    return { opType: this.node.operationTypes?.[index], index }
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getOperationType(operation: GQL.OperationTypeNode): Api.OperationTypeDefinitionApi | undefined {
    const { opType } = this._findOperationNode(operation)

    return applyNullable(Api.operationTypeDefinitionApi)(opType)
  }

  getOperationTypename(operation: GQL.OperationTypeNode): string | undefined {
    return this.getOperationType(operation)?.getTypename()
  }

  hasOperationType(operation: GQL.OperationTypeNode): boolean {
    return !!this._findOperationNode(operation).opType
  }

  getOperationTypes(): Api.OperationTypeDefinitionApi[] {
    return this.node.operationTypes?.map(Api.operationTypeDefinitionApi) ?? []
  }

  getOperationTypenames(): Typename[] {
    return this.node.operationTypes?.map((op) => op.type.name.value) ?? []
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    const { opType } = this._findOperationNode(props.operation)

    if (opType) {
      throw Error(
        `cannot create - '${props.operation}' in ${this.node.kind} `
        + `'${opType.operation}: ${opType.type.name.value}' already exists`,
      )
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    concat(this.node.operationTypes!, Ast.operationTypeDefinitionNode(props))

    return this
  }

  updateOperationType(
    operation: GQL.OperationTypeNode,
    props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps | Ast.NamedTypeNodeProps,
  ): this {
    const { opType } = this._findOperationNode(operation)

    if (!opType) {
      throw Error(
        `cannot update - '${operation}' in ${this.node.kind} `
        + `'${operation}' does not exists`,
      )
    }

    if (typeof props === 'object' && 'operation' in props) {
      Object.assign(opType, Ast.operationTypeDefinitionNode(props))
    }
    else {
      Object.assign(opType, Ast.operationTypeDefinitionNode({ operation, type: Ast.namedTypeNode(props) }))
    }

    return this
  }


  upsertOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this {
    const { opType } = this._findOperationNode(props.operation)

    if (opType) {
      Object.assign(opType, Ast.operationTypeDefinitionNode(props))
    }
    else {
      if (!this.node.operationTypes) {
        mutable(this.node).operationTypes = []
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      concat(this.node.operationTypes!, Ast.operationTypeDefinitionNode(props))
    }

    return this
  }


  removeOperationType(operation: GQL.OperationTypeNode): this {
    const { opType, index } = this._findOperationNode(operation)

    if (!opType) {
      throw Error(
        `cannot remove - '${operation}' in ${this.node.kind} `
        + `'${operation}' does not exists`,
      )
    }

    mutable(this.node.operationTypes)?.splice(index, 1)

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
