import type * as GQL from 'graphql'

import { stringValueNode } from '../../node'
import { mutable } from '../../utils'

//
// ─── DESCRIPTION API MIXIN ──────────────────────────────────────────────────────
//

/**
 * @category API Mixins
 */
export type DescriptionApiMixinNode =
  | GQL.TypeDefinitionNode
  | GQL.DirectiveDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode
  | GQL.EnumValueDefinitionNode

/**
 * @category API Mixins
 */
export class DescriptionApiMixin {
  constructor(readonly node: DescriptionApiMixinNode) {}

  // FIXME: by undefined??
  hasDescription(): boolean {
    return !!this.node.description
  }

  getDescription(): string | undefined {
    return this.node.description?.value
  }

  setDescription(value: string): this {
    if (typeof value === 'undefined') {
      mutable(this.node).description = undefined
    }
    else {
      mutable(this.node).description = stringValueNode(value)
    }

    return this
  }
}

/**
 * @category API Mixins
 */
export function descriptionApiMixin(node: DescriptionApiMixinNode): DescriptionApiMixin {
  return new DescriptionApiMixin(node)
}
