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
export class VariableDefinitionApi extends Mix(
  Mixin.TypeMixin,
  Mixin.DirectivesMixin,
  Mixin.VariableMixin,
  Mixin.DefaultValueMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.VariableDefinitionNode) {
    super(node)

    validateNodeKind(Kind.VARIABLE_DEFINITION, node)
  }
}

/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export function variableDefinitionApi(node: GQL.VariableDefinitionNode): VariableDefinitionApi {
  return new VariableDefinitionApi(node)
}
