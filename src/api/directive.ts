import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Hooks } from '../internal'
import { Directivename } from '../types'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `DirectiveNode`
 *
 * @category API Public
 */
export class DirectiveApi extends Mix(Mixin.KindAssertionApiMixin) {
  constructor(readonly node: GQL.DirectiveNode) {
    super([node])


    validateNodeKind(Kind.DIRECTIVE, node)
  }

  readonly name = Hooks.nameMixin<Directivename>(this.node)

  readonly arguments = Hooks.argumentsMixin(this.node)
}

/**
 * `DirectiveApi` constructor fn
 *
 * @category API Public
 */
export function directiveApi(node: GQL.DirectiveNode): DirectiveApi {
  return new DirectiveApi(node)
}
