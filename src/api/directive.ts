import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `DirectiveNode`
 *
 * @category API Public
 */
export class DirectiveApi extends Mix(
  Mixin.NameMixin,
  Mixin.ArgumentsMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.DirectiveNode) {
    super([node], [node], [node])

    validateNodeKind(Kind.DIRECTIVE, node)
  }
}

/**
 * `DirectiveApi` constructor fn
 *
 * @category API Public
 */
export function directiveApi(node: GQL.DirectiveNode): DirectiveApi {
  return new DirectiveApi(node)
}
