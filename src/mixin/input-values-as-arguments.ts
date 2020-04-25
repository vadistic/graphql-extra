import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname, Typename } from '../types'
import {
  oneToManyFindOneOrFail,
  oneToManyCreate,
  oneToManyRemoveOrFail,
  oneToManyUpdate,
  oneToManyUpsert,
  getName,
} from '../utils'


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

  getArguments(): Api.InputValueDefinitionApi[] {
    return this.node.arguments?.map(Api.inputValueDefinitionApi) ?? []
  }

  getArgumentsByTypename(typename: Typename): Api.InputValueDefinitionApi[] {
    return this.getArguments().filter((arg) => arg.getTypename() === typename)
  }

  hasArgument(argname: Argname): boolean {
    if (!this.node.arguments) return false

    return this.node.arguments.some((arg) => arg.name.value === argname)
  }

  getArgument(argname: Argname): Api.InputValueDefinitionApi {
    const arg = oneToManyFindOneOrFail({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
    })

    return Api.inputValueDefinitionApi(arg)
  }

  createArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateArgument(
    argname: Argname,
    props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
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

  getArgumentType(argname: Argname): Api.TypeApi {
    return this.getArgument(argname).getType()
  }

  setArgumentType(argname: Argname, props: GQL.TypeNode | Ast.TypeNodeProps): this {
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
