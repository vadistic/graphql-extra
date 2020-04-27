import type * as GQL from 'graphql'
import { Kind } from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Hooks } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `NameNode`
 *
 * @category API Public
 */
export class NameApi {
  constructor(readonly node: GQL.NameNode) {
    validateNodeKind(Kind.NAME, node)
  }

  readonly value = Hooks.nameValueHook(this.node)
}

/**
 *  `NameApi` constructor fn
 *
 * @category API Public
 */
export function nameApi(node: GQL.NameNode): NameApi {
  return new NameApi(node)
}
