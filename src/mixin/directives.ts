import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Directivename } from '../types'
import { Crud } from '../utils'

/**
 * @category API Mixins
 */
export type DirectivesMixinNode =
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
export class DirectivesMixin {
  constructor(readonly node: DirectivesMixinNode) {}

  readonly _directives = new Crud({
    parent: this.node,
    key: 'directives',
    api: Api.directiveApi,
    factory: Ast.directiveNode,
    matcher: (node): Directivename => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getDirectives(): Api.DirectiveApi[] {
    return this._directives.findMany()
  }

  getDirectiveNames(): Directivename[] {
    return this._directives.findManyNames()
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasDirective(directivename: Directivename): boolean {
    return this._directives.has(directivename)
  }

  getDirective(directivename: Directivename): Api.DirectiveApi {
    return this._directives.findOneOrFail(directivename)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this {
    this._directives.create(props)

    return this
  }

  updateDirective(
    directivename: Directivename,
    props: Ast.DirectiveNodeProps | Partial<Ast.DirectiveNodeProps | GQL.DirectiveNode>,
  ): this {
    this._directives.update(directivename, props)

    return this
  }

  upsertDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this {
    this._directives.upsert(props)

    return this
  }

  removeDirective(directivename: Directivename): this {
    this._directives.remove(directivename)

    return this
  }
}

/**
 * @category API Mixins
 */
export function directivesMixin(node: DirectivesMixinNode): DirectivesMixin {
  return new DirectivesMixin(node)
}
