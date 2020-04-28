import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import { Crud } from '../utils'

export type InterfaceMixinNode =
  | GQL.ObjectTypeDefinitionNode
  | GQL.ObjectTypeExtensionNode
  | GQL.InterfaceTypeDefinitionNode
  | GQL.InterfaceTypeExtensionNode

/**
 * @category API Mixins
 */
export class InterfacesMixin {
  constructor(readonly node: InterfaceMixinNode) {}

  readonly _interfaces = new Crud({
    parent: this.node,
    key: 'interfaces',
    api: Api.namedTypeApi,
    factory: Ast.namedTypeNode,
    matcher: (node): Typename => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getInterfaces(): Api.NamedTypeApi[] {
    return this._interfaces.findMany()
  }

  getInterfaceNames(): Typename[] {
    return this._interfaces.findManyNames()
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasInterface(typename: Typename): boolean {
    return this._interfaces.has(typename)
  }

  getInterface(typename: Typename): Api.NamedTypeApi {
    return this._interfaces.findOneOrFail(typename)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createInterface(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    this._interfaces.create(props)

    return this
  }

  updateInterface(
    typename: Typename,
    props: Typename | Partial<Ast.NamedTypeNodeProps | GQL.NamedTypeNode>,
  ): this {
    this._interfaces.update(typename, props)

    return this
  }

  upsertInterface(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    this._interfaces.upsert(props)

    return this
  }

  removeInterface(typename: Typename): this {
    this._interfaces.remove(typename)

    return this
  }
}


/**
 * @category API Mixins
 */
export function interfacesMixin(
  node: InterfaceMixinNode,
): InterfacesMixin {
  return new InterfacesMixin(node)
}
