import type * as GQL from 'graphql'

import { stringValueNode } from '../../node'
import { mutable } from '../../utils'

/**
 * @category API Mixins
 */
export type DescriptionApiMixinNode =
  | GQL.TypeDefinitionNode
  | GQL.DirectiveDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode
  | GQL.EnumValueDefinitionNode

/**
 * @category API Mixins
 */
export class DescriptionApiMixin {
  constructor(readonly node: DescriptionApiMixinNode) {}

  hasDescription(value?: string): boolean {
    if (value) {
      return this.node.description?.value === value
    }

    return !!this.node.description?.value
  }

  getDescription(): string | undefined {
    return this.node.description?.value
  }

  setDescription(value: string | undefined): this {
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
