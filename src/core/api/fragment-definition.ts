import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind } from '../errors'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'
import { SelectionSetApiMixin } from './selection'

/**
 *  API for GraphQL `FragmentDefinitionNode`
 *
 * @category API Public
 */
export class FragmentDefinitionApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  SelectionSetApiMixin,
) {
  constructor(readonly node: GQL.FragmentDefinitionNode) {
    super([node], [node], [node])

    validateNodeKind(Kind.FRAGMENT_DEFINITION, node)
  }
}
/**
 * `OperationDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fragmentDefinitionApi(node: GQL.FragmentDefinitionNode): FragmentDefinitionApi {
  return new FragmentDefinitionApi(node)
}
