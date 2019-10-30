import {
  TypeDefinitionNode,
  DirectiveDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
} from 'graphql'
import { DeepMutable } from '../../utils'
import { stringValueNode } from '../../node'

//
// ─── DESCRIPTION API MIXIN ──────────────────────────────────────────────────────
//

export type DescriptionApiMixinCompatibleNode =
  | TypeDefinitionNode
  | DirectiveDefinitionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode

export interface DescriptionApiMixin<This> {
  hasDescription(): boolean
  getDescription(): string | undefined
  setDescription(value?: string): This
}

export function descriptionApiMixin<This>(
  node: DescriptionApiMixinCompatibleNode,
): DescriptionApiMixin<This> {
  const _node = node as DeepMutable<TypeDefinitionNode>

  return {
    hasDescription() {
      return !!node.description
    },

    getDescription() {
      return node.description ? node.description.value : undefined
    },

    setDescription(value) {
      if (typeof value === 'undefined') {
        _node.description = undefined
      } else {
        _node.description = stringValueNode(value)
      }

      return this as any
    },
  }
}
