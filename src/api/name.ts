import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `NameNode`
 *
 * @category API Public
 */
export class NameApi extends Mix(Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.NameNode) {
    super(node)

    validateNodeKind(Kind.NAME, node)
  }

  // noop - it does not need any functionality
}

/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export function nameApi(node: GQL.NameNode): NameApi {
  return new NameApi(node)
}
