import {
  TypeDefinitionNode,
  DirectiveDefinitionNode,
  TypeExtensionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  DirectiveNode,
  ArgumentNode,
} from 'graphql'
import { mutable } from '../../utils'
import { nameNode } from '../../node'

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
