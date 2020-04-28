import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import type { Api } from '../internal'
import { assertionError } from '../utils'

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

  isField(): this is Api.FieldApi {
    return this.node.kind === Kind.FIELD
  }

  isFragmentSpread(): this is Api.FragmentSpreadApi {
    return this.node.kind === Kind.FRAGMENT_SPREAD
  }

  isInflineFragment(): this is Api.InlineFragmentApi {
    return this.node.kind === Kind.INLINE_FRAGMENT
  }

  // ────────────────────────────────────────────────────────────────────────────────

  assertField(): Api.FieldApi {
    if (this.isField()) return this

    throw assertionError(Kind.FIELD, this.node)
  }

  assertFragmentSpread(): Api.FragmentSpreadApi {
    if (this.isFragmentSpread()) return this

    throw assertionError(Kind.FRAGMENT_SPREAD, this.node)
  }

  assertInflineFragment(): Api.InlineFragmentApi {
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
