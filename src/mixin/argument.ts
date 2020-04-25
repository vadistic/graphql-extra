import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname } from '../types'
import {
  crudFindOne,
  crudCreate,
  crudUpdate,
  crudUpsert,
  crudRemove,
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
    const arg = crudFindOne({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      target: argname,
    })

    return Api.argumentApi(arg)
  }

  createArgument(props: Ast.ArgumentNodeProps| GQL.ArgumentNode): this {
    crudCreate({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
      props,
    })

    return this
  }

  updateArgument(argname: Argname, props: Partial<Ast.ArgumentNodeProps | GQL.ArgumentNode>): this {
    crudUpdate({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
      props,
      target: argname,
    })

    return this
  }

  upsertArgument(props: Ast.ArgumentNodeProps | GQL.ArgumentNode): this {
    crudUpsert({
      node: this.node,
      key: 'arguments',
      getter: (el) => el.name.value,
      factory: Ast.argumentNode,
      props,
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
}

/**
 * @category API Mixins
 */
export function argumentsApiMixin(node: ArgumentsApiMixinNode): ArgumentsApiMixin {
  return new ArgumentsApiMixin(node)
}
