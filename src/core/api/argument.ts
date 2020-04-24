import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind } from '../errors'
import { NameApiMixin } from '../mixins/name'

/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export class ArgumentApi extends Mix(NameApiMixin) {
  constructor(readonly node: GQL.ArgumentNode) {
    super([node])

    validateNodeKind(Kind.ARGUMENT, node)
  }

  getValue(): GQL.ValueNode {
    return this.node.value
  }

  setValue(value: GQL.ValueNode): this {
    Object.assign(this.node, value)

    return this
  }
}
/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export function argumentApi(node: GQL.ArgumentNode): ArgumentApi {
  return new ArgumentApi(node)
}
