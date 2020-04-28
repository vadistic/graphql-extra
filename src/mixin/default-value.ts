import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import {
  Mutable, applyNullable, applyPropsNullable,
} from '../utils'


/**
 * @category API Mixins
 */
export type DefaultValueMixinNode =
  | GQL.InputValueDefinitionNode
  | GQL.VariableDefinitionNode

/**
 * @category API Mixins
 */
export class DefaultValueMixin {
  constructor(readonly node: DefaultValueMixinNode) {}

  hasDefaultValue(): boolean {
    return !!this.node.defaultValue
  }

  getDefaultValue(): Api.ValueApi | undefined {
    return applyNullable(Api.valueApi, this.node.defaultValue)
  }

  setDefaultValue(props: undefined | Ast.ValueNodeProps | GQL.ValueNode): this {
    (this.node as Mutable<DefaultValueMixinNode>).defaultValue = applyPropsNullable(Ast.valueNode, props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function defaultValueMixin(node: DefaultValueMixinNode): DefaultValueMixin {
  return new DefaultValueMixin(node)
}
