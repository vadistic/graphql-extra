import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `VariableNode`
 *
 * @category API Public
 */
export class VariableApi extends Mix(Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.VariableNode) {
    super(node)

    validateNodeKind(Kind.VARIABLE, node)
  }

  // noop - it does not need any functionality
}

/**
 * `VariableApi` constructor fn
 *
 * @category API Public
 */
export function variableApi(node: GQL.VariableNode): VariableApi {
  return new VariableApi(node)
}
