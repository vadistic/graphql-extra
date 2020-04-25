import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export class FieldDefinitionApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.DescriptionApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.InputValuesAsArgumentsApiMixin,
  Mixin.TypeApiMixin,
) {
  constructor(readonly node: GQL.FieldDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.FIELD_DEFINITION, node)
  }

  toInputValue(): Api.InputValueApi {
    const {
      kind, arguments: args, loc, ...rest
    } = this.node

    return Api.inputValueApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
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
