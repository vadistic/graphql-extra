import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin } from '../internal'
import { mutable, validateNodeKind } from '../utils'

/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export class InputValueDefinitionApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.DescriptionApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.TypeApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InputValueDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.INPUT_VALUE_DEFINITION, node)
  }

  toField(): Api.FieldDefinitionApi {
    const {
      kind, defaultValue, loc, ...rest
    } = this.node

    return Api.fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
  }

  // TODO: value node helper
  getDefaultValue(): GQL.ValueNode | undefined {
    return this.node.defaultValue
  }

  // TODO: value node helper
  setDefaultValue(value: GQL.ValueNode): InputValueDefinitionApi {
    mutable(this.node).defaultValue = value

    return this
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
