import type * as GQL from 'graphql'

import { ArgumentNodeProps, argumentNode } from '../../node'
import { ArgumentApi, argumentApi } from '../api/argument'
import {
  oneToManyFindOneOrFail,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemoveOrFail,
} from '../crud'
import { getName } from '../helper'
import type { Argname } from '../types'

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

  getArguments(): ArgumentApi[] {
    return this.node.arguments?.map(argumentApi) ?? []
  }

  getArgument(argname: Argname): ArgumentApi {
    const arg = oneToManyFindOneOrFail({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
    })

    return argumentApi(arg)
  }

  createArgument(props: GQL.ArgumentNode | ArgumentNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: argumentNode,
      props,
    })

    return this
  }

  updateArgument(argname: Argname, props: Partial<ArgumentNodeProps | GQL.ArgumentNode>): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      target: argname,
      getter: (el) => el.name.value,
      factory: argumentNode,
      props,
    })

    return this
  }

  upsertArgument(props: ArgumentNodeProps | GQL.ArgumentNode): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: argumentNode,
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
