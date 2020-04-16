import type { EnumValueDefinitionNode } from 'graphql'
import { Mix } from 'mix-classes'

import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'

/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export class EnumValueApi extends Mix(NameApiMixin, DescriptionApiMixin, DirectivesApiMixin) {
  constructor(readonly node: EnumValueDefinitionNode) {
    super([node], [node], [node])
  }
}

/**
 * `EnumValueApi` contructor fn
 *
 * @category API Public
 */
export function enumValueApi(node: EnumValueDefinitionNode): EnumValueApi {
  return new EnumValueApi(node)
}
