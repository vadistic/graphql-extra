import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Hooks } from '../internal'
import { validateNodeKind } from '../utils'


/**
 * @category API Public
 */
export class DirectiveDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.DirectiveDefinitionNode) {
    super([node])

    validateNodeKind(Kind.DIRECTIVE_DEFINITION, node)
  }

  name = Hooks.nameMixin(this.node)

  repeatable = Hooks.repeatableMixin(this.node)

  locations = Hooks.locationsMixin(this.node)
}


/**
 * @category API Public
 */
export function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): DirectiveDefinitionApi {
  return new DirectiveDefinitionApi(node)
}
