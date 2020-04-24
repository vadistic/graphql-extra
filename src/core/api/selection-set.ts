import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import { validateNodeKind } from '../errors'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */
export class SelectionSetApi {
  constructor(readonly node: GQL.SelectionSetNode) {
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
