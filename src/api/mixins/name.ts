import type {
  TypeDefinitionNode,
  DirectiveDefinitionNode,
  TypeExtensionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  DirectiveNode,
  ArgumentNode,
} from 'graphql'

import { nameNode } from '../../node'
import { mutable } from '../../utils'

/**
 * @category API Mixins
 */
export type NameApiMixinNode =
  | TypeDefinitionNode
  | DirectiveDefinitionNode
  | TypeExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode
  | DirectiveNode
  | ArgumentNode

/**
 * @category API Mixins
 */
export class NameApiMixin {
  constructor(readonly node: NameApiMixinNode) {}

  getName() {
    return this.node.name.value
  }

  setName(value: string) {
    mutable(this.node).name = nameNode(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function nameApiMixin(node: NameApiMixinNode) {
  return new NameApiMixin(node)
}
