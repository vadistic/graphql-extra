import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname, Typename } from '../types'
import {
  crudFindOne,
  crudCreate,
  crudRemove,
  crudUpdate,
  crudUpsert,
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
    const arg = crudFindOne({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      target: argname,
    })

    return Api.inputValueDefinitionApi(arg)
  }

  createArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    crudCreate({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    crudUpsert({
      node: this.node,
      key: 'arguments',
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
    crudUpdate({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
      target: argname,
    })

    return this
  }

  removeArgument(argname: Argname): this {
    crudRemove({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      target: argname,
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
