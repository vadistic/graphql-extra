import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export class InputValueDefinitionApi extends Mix(
  Mixin.NameMixin,
  Mixin.DescriptionMixin,
  Mixin.DirectivesMixin,
  Mixin.TypeMixin,
  Mixin.DefaultValueMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.InputValueDefinitionNode) {
    super(node)

    validateNodeKind(Kind.INPUT_VALUE_DEFINITION, node)
  }

  toField(): Api.FieldDefinitionApi {
    const { kind, defaultValue, loc, ...rest } = this.node

    return Api.fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
  }
}

/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */

export function inputValueDefinitionApi(node: GQL.InputValueDefinitionNode): Api.InputValueDefinitionApi {
  return new Api.InputValueDefinitionApi(node)
}
