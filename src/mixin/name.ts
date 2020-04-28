import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Ast } from '../internal'
import { mutable } from '../utils'

/**
 * @category API Mixins
 */
export type NameMixinNode =
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
  | GQL.FragmentDefinitionNode

/**
 * @category API Mixins
 */
export class NameMixin {
  constructor(readonly node: NameMixinNode) {}

  getName(): string {
    return this.node.name.value
  }

  setName(value: string): this {
    mutable(this.node).name = Ast.nameNode(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function nameMixin(node: NameMixinNode): NameMixin {
  return new NameMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type NameOptionalMixinNode =
  | GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export class NameOptionalMixin {
  constructor(readonly node: NameOptionalMixinNode) {}

  getName(): string | undefined {
    return this.node.name?.value
  }

  setName(value: string): this {
    mutable(this.node).name = Ast.nameNode(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function nameOptionalMixin(node: NameOptionalMixinNode): NameOptionalMixin {
  return new NameOptionalMixin(node)
}
