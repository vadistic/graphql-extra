import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import { Crud } from '../utils'
/**
 * @category API Mixins
 */
export type UnionTypesMixinNode =
  | GQL.UnionTypeDefinitionNode
  | GQL.UnionTypeExtensionNode

/**
 * @category API Mixins
 */
export class UnionTypesMixin {
  constructor(readonly node: UnionTypesMixinNode) {}

  readonly _types = new Crud({
    parent: this.node,
    key: 'types',
    api: Api.namedTypeApi,
    factory: Ast.namedTypeNode,
    matcher: (node): Typename => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getTypenames(): Typename[] {
    return this._types.findManyNames()
  }

  hasTypename(typename: Typename): boolean {
    return this._types.has(typename)
  }

  getTypes(): Api.NamedTypeApi[] {
    return this._types.findMany()
  }

  getType(typename: Typename): Api.NamedTypeApi {
    return this._types.findOneOrFail(typename)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createType(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    this._types.create(props)

    return this
  }

  updateType(
    typename: Typename,
    props: Typename | Partial<Ast.NamedTypeNodeProps | GQL.NamedTypeNode>,
  ): this {
    this._types.update(typename, props)

    return this
  }

  upsertType(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    this._types.upsert(props)

    return this
  }

  removeType(typename: Typename): this {
    this._types.remove(typename)

    return this
  }
}

/**
 * @category API Mixins
 */
export function unionTypesMixin(node: UnionTypesMixinNode): UnionTypesMixin {
  return new UnionTypesMixin(node)
}
