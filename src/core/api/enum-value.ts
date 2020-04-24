import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind } from '../errors'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'

/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export class EnumValueApi extends Mix(NameApiMixin, DescriptionApiMixin, DirectivesApiMixin) {
  constructor(readonly node: GQL.EnumValueDefinitionNode) {
    super([node], [node], [node])

    validateNodeKind(Kind.ENUM_VALUE_DEFINITION, node)
  }
}

/**
 * `EnumValueApi` contructor fn
 *
 * @category API Public
 */
export function enumValueApi(node: GQL.EnumValueDefinitionNode): EnumValueApi {
  return new EnumValueApi(node)
}
