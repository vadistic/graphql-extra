import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Hooks } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export class EnumValueDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.EnumValueDefinitionNode) {
    super([node])

    validateNodeKind(Kind.ENUM_VALUE_DEFINITION, node)
  }

  readonly name = Hooks.nameMixin(this.node)

  readonly description = Hooks.descriptionMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)
}

/**
 * `EnumValueDefinitionApi` contructor fn
 *
 * @category API Public
 */
export function enumValueDefinitionApi(node: GQL.EnumValueDefinitionNode): EnumValueDefinitionApi {
  return new EnumValueDefinitionApi(node)
}
