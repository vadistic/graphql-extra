import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `FragmentDefinitionNode`
 *
 * @category API Public
 */
export class FragmentDefinitionApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.SelectionSetApiMixin,
) {
  constructor(readonly node: GQL.FragmentDefinitionNode) {
    super([node], [node], [node])

    validateNodeKind(Kind.FRAGMENT_DEFINITION, node)
  }
}

/**
 * `FragmentDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fragmentDefinitionApi(node: GQL.FragmentDefinitionNode): FragmentDefinitionApi {
  return new FragmentDefinitionApi(node)
}
