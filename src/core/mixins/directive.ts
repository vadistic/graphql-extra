import type * as GQL from 'graphql'

import { DirectiveNodeProps, directiveNode } from '../../node'
import { DirectiveApi, directiveApi } from '../api/directive'
import {
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemoveOrFail,
  oneToManyFindOneOrFail,
} from '../crud'
import { getName } from '../helper'
import type { Directivename } from '../types'

/**
 * @category API Mixins
 */
export type DirectivesApiMixinNode =
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.FragmentSpreadNode
  | GQL.InputValueDefinitionNode
  | GQL.OperationDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.SchemaExtensionNode
  | GQL.TypeDefinitionNode
  | GQL.TypeExtensionNode
  | GQL.InlineFragmentNode

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
    const directive = oneToManyFindOneOrFail({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
    })

    return directiveApi(directive)
  }

  createDirective(props: GQL.DirectiveNode | DirectiveNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'directives',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: directiveNode,
      props,
    })

    return this
  }

  updateDirective(
    directivename: Directivename,
    props: DirectiveNodeProps | Partial<GQL.DirectiveNode | DirectiveNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
      factory: directiveNode,
      props,
    })

    return this
  }

  upsertDirective(props: GQL.DirectiveNode | DirectiveNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'directives',
      target: getName(props),
      getter: (el) => el.name.value,
      factory: directiveNode,
      props,
    })

    return this
  }

  removeDirective(directivename: Directivename): this {
    oneToManyRemoveOrFail({
      node: this.node,
      key: 'directives',
      target: directivename,
      getter: (el) => el.name.value,
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
