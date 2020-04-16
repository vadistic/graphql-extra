import type { DirectiveNode, FieldNode, ArgumentNode } from 'graphql'

import { ArgumentNodeProps, argumentNode } from '../../node'
import { ArgumentApi, argumentApi } from '../apis/argument'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemove,
} from '../crud'
import { getName } from '../helper'
import type { Argname } from '../types'

/**
 * @category API Mixins
 */
export type ArgumentsApiMixinNode = DirectiveNode | FieldNode

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
    const arg = oneToManyGet<ArgumentNode>({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
    })

    return argumentApi(arg)
  }

  createArgument(props: ArgumentNode | ArgumentNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      elementName: getName(props.name),
      parentName: this.node.name.value,
      nodeCreateFn: argumentNode,
      props,
    })

    return this
  }

  updateArgument(argname: Argname, props: Partial<ArgumentNodeProps | ArgumentNode>): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
      nodeCreateFn: argumentNode,
      props,
    })

    return this
  }

  upsertArgument(props: ArgumentNodeProps | ArgumentNode): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      elementName: getName(props.name),
      parentName: this.node.name.value,
      nodeCreateFn: argumentNode,
      props,
    })

    return this
  }

  removeArgument(argname: Argname): this {
    oneToManyRemove({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
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
