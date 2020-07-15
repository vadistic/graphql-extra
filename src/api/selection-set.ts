import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */

export class SelectionSetApi extends Mix(Mixin.SelectionSetMixin, Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.SelectionSetNode) {
    super(node)

    validateNodeKind(Kind.SELECTION_SET, node)
  }
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi {
  return new SelectionSetApi(node)
}
