import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */
export class SelectionSetApi {
  constructor(readonly node: GQL.SelectionSetNode) {
    validateNodeKind(Kind.SELECTION_SET, node)
  }

  isEmpty(): boolean {
    return this.node.selections.length === 0
  }

  // createField(props: FieldNodeProps | GQL.FieldNode) {
  //   oneToManyCreate({
  //     node: this.node,
  //     nodeCreateFn: fieldNode,
  //     key: 'selections',

  //   })
  // }
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi {
  return new SelectionSetApi(node)
}
