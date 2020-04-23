import type * as GQL from 'graphql'
import { Mix } from 'mix-classes'

import { NameOptionalApiMixin } from '../mixins/name'

/**
 *  API for GraphQL `FragmentDefinitionNode`
 *
 * @category API Public
 */
export class FragmentDefinitionApi extends Mix(NameOptionalApiMixin) {
  constructor(readonly node: GQL.FragmentDefinitionNode) {
    super([node])
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
