import type * as GQL from 'graphql'
import { Mix } from 'mix-classes'

import { ArgumentsApiMixin } from '../mixins/argument'
import { NameApiMixin } from '../mixins/name'

/**
 * API for GraphQL `DirectiveNode`
 *
 * @category API Public
 */
export class DirectiveApi extends Mix(NameApiMixin, ArgumentsApiMixin) {
  constructor(readonly node: GQL.DirectiveNode) {
    super([node], [node])
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
