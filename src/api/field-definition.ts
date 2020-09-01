import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export class FieldDefinitionApi extends Mix(
  Mixin.NameMixin,
  Mixin.DescriptionMixin,
  Mixin.DirectivesMixin,
  Mixin.InputValuesAsArgumentsMixin,
  Mixin.TypeMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.FieldDefinitionNode) {
    super(node)

    validateNodeKind(Kind.FIELD_DEFINITION, node)
  }

  toInputValue(): Api.InputValueDefinitionApi {
    const { kind, arguments: args, loc, ...rest } = this.node

    return Api.inputValueDefinitionApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
  }
}

/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fieldDefinitionApi(node: GQL.FieldDefinitionNode): Api.FieldDefinitionApi {
  return new Api.FieldDefinitionApi(node)
}
