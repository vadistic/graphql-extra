import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Ast } from '../internal'
import { mutable } from '../utils'

/**
 * @category API Mixins
 */
export type DescriptionMixinNode =
  | GQL.DirectiveDefinitionNode
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.TypeDefinitionNode

/**
 * @category API Mixins
 */
export class DescriptionMixin {
  constructor(readonly node: DescriptionMixinNode) {}

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
    if (!value) {
      mutable(this.node).description = undefined
    }

    else {
      mutable(this.node).description = Ast.stringValueNode(value)
    }

    return this
  }
}

/**
 * @category API Mixins
 */
export function descriptionMixin(node: DescriptionMixinNode): DescriptionMixin {
  return new DescriptionMixin(node)
}
