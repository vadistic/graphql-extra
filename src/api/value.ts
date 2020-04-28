import type * as GQL from 'graphql'
import { Kind, valueFromASTUntyped } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Ast } from '../internal'
import { validateNodeKindsArr, applyProps } from '../utils'

/**
 *  API for GraphQL `ValueNode`
 *
 * @category API Public
 */
export class ValueApi extends Mix(
  Mixin.KindAssertionMixin,
) {
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

  set(props: Ast.ValueNodeProps | GQL.ValueNode): this {
    Object.assign(this.node, applyProps(Ast.valueNode, props))

    return this
  }

  // TODO: list/ object helpers?
  // TODO: coerce to other types?
  // TODO: separate for api for each kind?
}

/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export function valueApi(node: GQL.ValueNode): ValueApi {
  return new ValueApi(node)
}
