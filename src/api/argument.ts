import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin } from '../internal'
import { mutable, validateNodeKind } from '../utils'

/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export class ArgumentApi extends Mix(Mixin.NameMixin, Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.ArgumentNode) {
    super(node)

    validateNodeKind(Kind.ARGUMENT, node)
  }

  getValue(): GQL.ValueNode {
    return this.node.value
  }

  setValue(value: GQL.ValueNode): this {
    mutable(this.node).value = value

    return this
  }
}

/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export function argumentApi(node: GQL.ArgumentNode): Api.ArgumentApi {
  return new Api.ArgumentApi(node)
}
