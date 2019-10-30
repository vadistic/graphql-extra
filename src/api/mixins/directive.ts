import {
  SchemaDefinitionNode,
  TypeDefinitionNode,
  TypeSystemExtensionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  DirectiveNode,
} from 'graphql'
import { DirectiveApi, directiveApi } from '../apis'
import { DirectiveNodeProps, directiveNode } from '../../node'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemove,
} from '../crud'
import { getName } from '../../utils'

//
// ─── DIRECTIVES API MIXIN ───────────────────────────────────────────────────────
//

export type DirectivesApiMixinCompatibleNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | TypeSystemExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode

export interface DirectivesApiMixin<This> {
  getDirectiveNames(): string[]
  getDirectives(): DirectiveApi[]

  hasDirective(directiveName: string): boolean
  getDirective(directiveName: string): DirectiveApi

  createDirective(props: DirectiveNode | DirectiveNodeProps): This
  updateDirective(directiveName: string, props: DirectiveNode | DirectiveNodeProps): This
  upsertDirective(props: DirectiveNode | DirectiveNodeProps): This
  removeDirective(directiveName: string): This
}

export function directivesApiMixin<This>(
  node: DirectivesApiMixinCompatibleNode,
): DirectivesApiMixin<This> {
  return {
    getDirectiveNames() {
      return (node.directives || []).map(dir => dir.name.value)
    },

    hasDirective(directiveName) {
      return !!node.directives && node.directives.some(dir => dir.name.value === directiveName)
    },

    getDirectives() {
      return (node.directives || []).map(directiveApi)
    },

    getDirective(directiveName) {
      const directive = oneToManyGet<DirectiveNode>({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
      })

      return directiveApi(directive)
    },

    createDirective(props) {
      oneToManyCreate({
        node,
        key: 'directives',
        elementName: getName(props),
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    updateDirective(directiveName, props) {
      oneToManyUpdate({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    upsertDirective(props) {
      oneToManyUpsert({
        node,
        key: 'directives',
        elementName: getName(props),
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    removeDirective(directiveName) {
      oneToManyRemove({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
      })

      return this as any
    },
  }
}
