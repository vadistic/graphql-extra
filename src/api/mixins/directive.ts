import type {
  SchemaDefinitionNode,
  TypeDefinitionNode,
  TypeSystemExtensionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  DirectiveNode,
} from 'graphql'

import { DirectiveNodeProps, directiveNode } from '../../node'
import { DirectiveApi, directiveApi } from '../apis/directive'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemove,
} from '../crud'
import { getName } from '../helper'
import type { Directivename } from '../types'

/**
 * @category API Mixins
 */
export type DirectivesApiMixinNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | TypeSystemExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode

/**
 * @category API Mixins
 */
export class DirectivesApiMixin {
  constructor(readonly node: DirectivesApiMixinNode) {}

  getDirectiveNames(): Directivename[] {
    return this.node.directives?.map((dir) => dir.name.value) ?? []
  }

  hasDirective(directivename: Directivename): boolean {
    if (!this.node.directives) return false

    return this.node.directives.some((dir) => dir.name.value === directivename)
  }

  getDirectives(): DirectiveApi[] {
    return this.node.directives?.map(directiveApi) ?? []
  }

  getDirective(directivename: Directivename): DirectiveApi {
    const directive = oneToManyGet<DirectiveNode>({
      node: this.node,
      key: 'directives',
      elementName: directivename,
      parentName: getName(this.node),
    })

    return directiveApi(directive)
  }

  createDirective(props: DirectiveNode | DirectiveNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'directives',
      elementName: getName(props),
      parentName: getName(this.node),
      nodeCreateFn: directiveNode,
      props,
    })

    return this
  }

  updateDirective(
    directivename: Directivename,
    props: DirectiveNodeProps | Partial<DirectiveNode | DirectiveNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'directives',
      elementName: directivename,
      parentName: getName(this.node),
      nodeCreateFn: directiveNode,
      props,
    })

    return this
  }

  upsertDirective(props: DirectiveNode | DirectiveNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'directives',
      elementName: getName(props),
      parentName: getName(this.node),
      nodeCreateFn: directiveNode,
      props,
    })

    return this
  }

  removeDirective(directivename: Directivename): this {
    oneToManyRemove({
      node: this.node,
      key: 'directives',
      elementName: directivename,
      parentName: getName(this.node),
    })

    return this
  }
}

/**
 * @category API Mixins
 */
export function directivesApiMixin(node: DirectivesApiMixinNode): DirectivesApiMixin {
  return new DirectivesApiMixin(node)
}
