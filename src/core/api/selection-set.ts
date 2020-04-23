import type * as GQL from 'graphql'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */
export class SelectionSetApi {
  constructor(readonly node: GQL.SelectionSetNode) {
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
