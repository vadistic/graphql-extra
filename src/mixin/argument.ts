import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname } from '../types'
import {
  oneToManyFindOneOrFail,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemoveOrFail,
  getName,
} from '../utils'

/**
 * @category API Mixins
 */
export type ArgumentsApiMixinNode =
  | GQL.DirectiveNode
  | GQL.FieldNode

/**
 * @category API Mixins
 */
export class ArgumentsApiMixin {
  constructor(protected node: ArgumentsApiMixinNode) {}

  getArgumentNames(): Argname[] {
    return this.node.arguments?.map((argument) => argument.name.value) ?? []
  }

  hasArgument(argname: Argname): boolean {
    if (!this.node.arguments) return false

    return this.node.arguments.some((argument) => argument.name.value === argname)
  }

  getArguments(): Api.ArgumentApi[] {
    return this.node.arguments?.map(Api.argumentApi) ?? []
  }

  getArgument(argname: Argname): Api.ArgumentApi {
    const arg = oneToManyFindOneOrFail({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
    })

    return Api.argumentApi(arg)
  }

  createArgument(props: GQL.ArgumentNode | Ast.ArgumentNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
      props,
    })

    return this
  }

  updateArgument(argname: Argname, props: Partial<Ast.ArgumentNodeProps | GQL.ArgumentNode>): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
      props,
    })

    return this
  }

  upsertArgument(props: Ast.ArgumentNodeProps | GQL.ArgumentNode): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
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
}

/**
 * @category API Mixins
 */
export function argumentsApiMixin(node: ArgumentsApiMixinNode): ArgumentsApiMixin {
  return new ArgumentsApiMixin(node)
}
