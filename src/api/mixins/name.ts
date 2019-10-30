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

//
// ─── NAME API MIXIN ─────────────────────────────────────────────────────────────
//

export type NameApiMixinCompatibleNode =
  | TypeDefinitionNode
  | DirectiveDefinitionNode
  | TypeExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode
  | DirectiveNode
  | ArgumentNode

export interface NameApiMixin<This> {
  getName(): string
  setName(value: string): This
}

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
