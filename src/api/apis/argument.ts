import type { ArgumentNode, ValueNode } from 'graphql'
import { Mix } from 'mix-classes'

import { NameApiMixin } from '../mixins/name'

/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export class ArgumentApi extends Mix(NameApiMixin) {
  constructor(readonly node: ArgumentNode) {
    super([node])
  }

  getValue(): ValueNode {
    return this.node.value
  }

  setValue(value: ValueNode): this {
    Object.assign(this.node, value)

    return this
  }
}
/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export function argumentApi(node: ArgumentNode): ArgumentApi {
  return new ArgumentApi(node)
}
