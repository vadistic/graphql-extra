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
export class InputValueApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.DescriptionApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.TypeApiMixin,
) {
  constructor(readonly node: GQL.InputValueDefinitionNode) {
    super([node], [node], [node], [node])

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
  setDefaultValue(value: GQL.ValueNode): InputValueApi {
    mutable(this.node).defaultValue = value

    return this
  }
}

/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */

export function inputValueApi(node: GQL.InputValueDefinitionNode): Api.InputValueApi {
  return new Api.InputValueApi(node)
}
