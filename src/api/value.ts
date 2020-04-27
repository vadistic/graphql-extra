import type * as GQL from 'graphql'
import { Kind, valueFromASTUntyped } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKindsArr } from '../utils'

/**
 *  API for GraphQL `ValueNode`
 *
 * @category API Public
 */
export class ValueApi extends Mix(Mixin.KindAssertionApiMixin) {
  constructor(readonly node: GQL.ValueNode) {
    super([node])

    validateNodeKindsArr([
      Kind.INT,
      Kind.BOOLEAN,
      Kind.VARIABLE,
      Kind.FLOAT,
      Kind.STRING,
      Kind.NULL,
      Kind.ENUM,
      Kind.LIST,
      Kind.OBJECT,
    ], node)
  }

  toJs(): any {
    return valueFromASTUntyped(this.node)
  }

  set(props: GQL.ValueNode): this {
    Object.assign(this.node, props)

    return this
  }
}

/**
 *  `NameApi` constructor fn
 *
 * @category API Public
 */
export function valueApi(node: GQL.ValueNode): ValueApi {
  return new ValueApi(node)
}
