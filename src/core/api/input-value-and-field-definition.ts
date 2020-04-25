import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { InputValueDefinitionNodeProps, inputValueDefinitionNode, TypeNodeProps } from '../../node'
import { mutable } from '../../utils'
import {
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemoveOrFail,
  oneToManyFindOneOrFail,
} from '../crud'
import { validateNodeKind } from '../errors'
import { getName } from '../helper'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'
import { TypeApiMixin } from '../mixins/type'
import type { Argname, Typename } from '../types'
import { TypeApi } from './type'

// ! apis & mixins together to resolve import cycles

/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsApiMixinNode =
  | GQL.FieldDefinitionNode
  | GQL.DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export class InputValuesAsArgumentsApiMixin {
  constructor(readonly node: InputValuesAsArgumentsApiMixinNode) {}

  getArgnames(): Argname[] {
    return this.node.arguments?.map(getName) ?? []
  }

  getArguments(): InputValueApi[] {
    return this.node.arguments?.map(inputValueApi) ?? []
  }

  getArgumentsByTypename(typename: Typename): InputValueApi[] {
    return this.getArguments().filter((arg) => arg.getTypename() === typename)
  }

  hasArgument(argname: Argname): boolean {
    if (!this.node.arguments) return false

    return this.node.arguments.some((arg) => arg.name.value === argname)
  }

  getArgument(argname: Argname): InputValueApi {
    const arg = oneToManyFindOneOrFail({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
    })

    return inputValueApi(arg)
  }

  createArgument(props: GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertArgument(props: GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateArgument(
    argname: Argname,
    props: Partial<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
      factory: inputValueDefinitionNode,
      props,
    })

    return this
  }

  removeArgument(argname: Argname): this {
    oneToManyRemoveOrFail({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
    })

    return this
  }

  getArgumentType(argname: Argname): TypeApi {
    return this.getArgument(argname).getType()
  }

  setArgumentType(argname: Argname, props: GQL.TypeNode | TypeNodeProps): this {
    this.getArgument(argname).setType(props)

    return this
  }

  getArgumentDefaultValue(argname: Argname): GQL.ValueNode | undefined {
    return this.getArgument(argname).getDefaultValue()
  }

  setArgumentDefualtValue(argname: Argname, props: GQL.ValueNode): this {
    this.getArgument(argname).setDefaultValue(props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function inputValuesAsArgumentsApiMixin(
  node: InputValuesAsArgumentsApiMixinNode,
): InputValuesAsArgumentsApiMixin {
  return new InputValuesAsArgumentsApiMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export class InputValueApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  TypeApiMixin,
) {
  constructor(readonly node: GQL.InputValueDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.INPUT_VALUE_DEFINITION, node)
  }

  toField(): FieldDefinitionApi {
    const {
      kind, defaultValue, loc, ...rest
    } = this.node

    return fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
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

export function inputValueApi(node: GQL.InputValueDefinitionNode): InputValueApi {
  return new InputValueApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export class FieldDefinitionApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  InputValuesAsArgumentsApiMixin,
  TypeApiMixin,
) {
  constructor(readonly node: GQL.FieldDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.FIELD_DEFINITION, node)
  }

  toInputValue(): InputValueApi {
    const {
      kind, arguments: args, loc, ...rest
    } = this.node

    return inputValueApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
  }
}

/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fieldDefinitionApi(node: GQL.FieldDefinitionNode): FieldDefinitionApi {
  return new FieldDefinitionApi(node)
}
