import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export class EnumValueDefinitionApi extends Mix(
  Mixin.NameMixin,
  Mixin.DescriptionMixin,
  Mixin.DirectivesMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.EnumValueDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.ENUM_VALUE_DEFINITION, node)
  }
}

/**
 * `EnumValueDefinitionApi` contructor fn
 *
 * @category API Public
 */
export function enumValueDefinitionApi(node: GQL.EnumValueDefinitionNode): EnumValueDefinitionApi {
  return new EnumValueDefinitionApi(node)
}
