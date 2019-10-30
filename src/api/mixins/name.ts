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
import { DeepMutable } from '../../utils'
import { nameNode } from '../../node'

/**
 * @category API Mixins
 */
export type NameApiMixinCompatibleNode =
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
export interface NameApiMixin<This> {
  getName(): string
  setName(value: string): This
}

/**
 * @category API Mixins
 */
export function nameApiMixin<This>(node: NameApiMixinCompatibleNode): NameApiMixin<This> {
  const _node = node as DeepMutable<NameApiMixinCompatibleNode>

  return {
    getName() {
      return node.name.value
    },

    setName(value) {
      _node.name = nameNode(value)

      return this as any
    },
  }
}
