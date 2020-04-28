import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Variablename } from '../types'
import { applyProps, Mutable } from '../utils'

/**
 * @category API Mixins
 */
export type VariableMixinNode =
  | GQL.VariableDefinitionNode

/**
 * @category API Mixins
 */
export class VariableMixin {
  constructor(readonly node: VariableMixinNode) {}

  getVariableName(): Variablename {
    return this.node.variable.name.value
  }

  getVariable(): Api.VariableApi {
    return Api.variableApi(this.node.variable)
  }

  hasVariable(variablename: Variablename): boolean {
    return this.node.variable.name.value === variablename
  }

  setVariable(props: Variablename | Ast.VariableNodeProps | GQL.VariableNode): this {
    (this.node as Mutable<GQL.VariableDefinitionNode>).variable = applyProps(Ast.variableNode, props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function variableMixin(node: VariableMixinNode): VariableMixin {
  return new VariableMixin(node)
}
