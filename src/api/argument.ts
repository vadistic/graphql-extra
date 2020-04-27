import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Hooks } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export class ArgumentApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.ArgumentNode) {
    super([node])

    validateNodeKind(Kind.ARGUMENT, node)
  }

  readonly name = Hooks.nameMixin(this.node)

  readonly value = Hooks.valueMixin(this.node)
}

/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export function argumentApi(node: GQL.ArgumentNode): ArgumentApi {
  return new ArgumentApi(node)
}
