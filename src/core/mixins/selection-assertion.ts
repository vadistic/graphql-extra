import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import type { FieldApi, FragmentSpreadApi, InlineFragmentApi } from '../api/selection'
import { assertionError } from '../errors'


/**
 * @category API Mixins
 */
export type SelectionAssertionApiMixinNode =
  | GQL.FieldNode
  | GQL.InlineFragmentNode
  | GQL.FragmentSpreadNode

/**
 * @category API Mixins
 */
export class SelectionAssertionApiMixin {
  constructor(readonly node: SelectionAssertionApiMixinNode) {}

  isField(): this is FieldApi {
    return this.node.kind === Kind.FIELD
  }

  isFragmentSpread(): this is FragmentSpreadApi {
    return this.node.kind === Kind.FRAGMENT_SPREAD
  }

  isInflineFragment(): this is InlineFragmentApi {
    return this.node.kind === Kind.INLINE_FRAGMENT
  }


  // ────────────────────────────────────────────────────────────────────────────────

  assertField(): FieldApi {
    if (this.isField()) return this

    throw assertionError(Kind.FIELD, this.node)
  }

  assertFragmentSpread(): FragmentSpreadApi {
    if (this.isFragmentSpread()) return this

    throw assertionError(Kind.FRAGMENT_SPREAD, this.node)
  }

  assertInflineFragment(): InlineFragmentApi {
    if (this.isInflineFragment()) return this

    throw assertionError(Kind.INLINE_FRAGMENT, this.node)
  }
}

/**
 * @category API Mixins
 */
export function selectionApiMixin(node: SelectionAssertionApiMixinNode): SelectionAssertionApiMixin {
  return new SelectionAssertionApiMixin(node)
}
