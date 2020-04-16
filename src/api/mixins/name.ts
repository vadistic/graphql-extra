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

  getName(): string {
    return this.node.name.value
  }

  setName(value: string): this {
    mutable(this.node).name = nameNode(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function nameApiMixin(node: NameApiMixinNode): NameApiMixin {
  return new NameApiMixin(node)
}
