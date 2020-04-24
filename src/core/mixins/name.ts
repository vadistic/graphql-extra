import type * as GQL from 'graphql'

import { nameNode } from '../../node'
import { mutable } from '../../utils'

/**
 * @category API Mixins
 */
export type NameApiMixinNode =
  | GQL.ArgumentNode
  | GQL.DirectiveDefinitionNode
  | GQL.DirectiveNode
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.FieldNode
  | GQL.FragmentSpreadNode
  | GQL.InputValueDefinitionNode
  | GQL.TypeDefinitionNode
  | GQL.TypeExtensionNode

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

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type NameOptionalApiMixinNode =
  | GQL.FragmentDefinitionNode
  | GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export class NameOptionalApiMixin {
  constructor(readonly node: NameOptionalApiMixinNode) {}

  getName(): string | undefined {
    return this.node.name?.value
  }

  setName(value: string): this {
    mutable(this.node).name = nameNode(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function nameOptionalApiMixin(node: NameOptionalApiMixinNode): NameOptionalApiMixin {
  return new NameOptionalApiMixin(node)
}
