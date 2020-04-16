import type {
  InputValueDefinitionNode,
  ValueNode,
  FieldDefinitionNode,
  DirectiveDefinitionNode,
  TypeNode,
} from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { InputValueDefinitionNodeProps, inputValueDefinitionNode, TypeNodeProps } from '../../node'
import { mutable, getName } from '../../utils'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemove,
} from '../crud'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'
import { TypeApiMixin } from '../mixins/type'
import type { Argname, Typename } from '../types'
import { TypeApi } from './type'

// ! 2 apis & mixin together because it's hard to untangle circural dependency

/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsApiMixinNode = FieldDefinitionNode | DirectiveDefinitionNode

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

  hasArgument(argname: Argname) {
    if (!this.node.arguments) return false

    return this.node.arguments.some((arg) => arg.name.value === argname)
  }

  getArgument(argname: Argname) {
    const arg = oneToManyGet<InputValueDefinitionNode>({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
    })

    return inputValueApi(arg)
  }

  createArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateArgument(
    argname: Argname,
    props: Partial<InputValueDefinitionNode | InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  removeArgument(argname: Argname) {
    oneToManyRemove({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
    })

    return this
  }

  getArgumentType(argname: Argname): TypeApi {
    return this.getArgument(argname).getType()
  }

  setArgumentType(argname: Argname, props: TypeNode | TypeNodeProps) {
    this.getArgument(argname).setType(props)

    return this
  }

  getArgumentDefaultValue(argname: Argname): ValueNode | undefined {
    return this.getArgument(argname).getDefaultValue()
  }

  setArgumentDefualtValue(argname: Argname, props: ValueNode) {
    this.getArgument(argname).setDefaultValue(props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function inputValuesAsArgumentsApiMixin(node: InputValuesAsArgumentsApiMixinNode) {
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
  constructor(readonly node: InputValueDefinitionNode) {
    super([node], [node], [node], [node])
  }

  toField(): FieldDefinitionApi {
    const { kind, defaultValue, loc, ...rest } = this.node

    return fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
  }

  getDefaultValue(): ValueNode | undefined {
    return this.node.defaultValue
  }

  setDefaultValue(value: ValueNode): InputValueApi {
    mutable(this.node).defaultValue = value

    return this
  }
}

/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */

export function inputValueApi(node: InputValueDefinitionNode): InputValueApi {
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
  constructor(readonly node: FieldDefinitionNode) {
    super([node], [node], [node], [node], [node])
  }

  toInputValue(): InputValueApi {
    const { kind, arguments: args, loc, ...rest } = this.node

    return inputValueApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
  }
}

/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fieldDefinitionApi(node: FieldDefinitionNode) {
  return new FieldDefinitionApi(node)
}
