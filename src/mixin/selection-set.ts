import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { mutable } from '../utils'

/**
 * @category API Mixins
 */
export type SelectionSetApiMixinNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export class SelectionSetApiMixin {
  constructor(readonly node: SelectionSetApiMixinNode) {}

  hasSelectionSet(): boolean {
    return !!this.node.selectionSet
  }

  getSelectionSet(): Api.SelectionSetApi {
    // TODO: do not create on default?
    if (!this.node.selectionSet) {
      mutable(this.node).selectionSet = Ast.selectionSetNode({ selections: [] })
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Api.selectionSetApi(this.node.selectionSet!)
  }

  getSelections(): Api.SelectionApi[] {
    return this.node.selectionSet?.selections.map(Api.selectionApi) ?? []
  }
}

/**
 * @category API Mixins
 */
export function selectionSetApiMixin(node: SelectionSetApiMixinNode): SelectionSetApiMixin {
  return new SelectionSetApiMixin(node)
}
