import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Typename } from '../types'
import { mutable } from '../utils'

/**
 * @category API Mixins
 */
export type TypeApiMixinNode =
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode
  | GQL.VariableDefinitionNode

/**
 * @category API Mixins
 */
export class TypeApiMixin {
  constructor(protected node: TypeApiMixinNode) {}

  getType(): Api.TypeApi {
    return Api.typeApi(this.node.type)
  }

  getTypename(): Typename {
    return this.getType().getTypename()
  }

  getNamedType(): GQL.NamedTypeNode {
    return this.getType().getNamedType()
  }

  setTypename(typename: Typename): this {
    this.getType().setTypename(typename)

    return this
  }

  setType(props: Ast.TypeNodeProps | GQL.TypeNode): this {
    this.getType().setType(props)

    return this
  }

  isNonNullType(deep?: boolean): boolean {
    return this.getType().isNonNull(deep)
  }

  isListType(deep?: boolean): boolean {
    return this.getType().isList(deep)
  }

  setNonNullType(to = true): this {
    this.getType().setNonNull(to)

    return this
  }

  setListType(to = true): this {
    this.getType().setList(to)

    return this
  }
}

/**
 * @category API Mixins
 */
export function typeApiMixin(node: TypeApiMixinNode): TypeApiMixin {
  return new TypeApiMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type NamedTypeApiMixinNode =
  | GQL.OperationTypeDefinitionNode

/**
 * @category API Mixins
 */
export class NamedTypeApiMixin {
  constructor(protected node: NamedTypeApiMixinNode) {}

  getNamedType(): Api.NamedTypeApi {
    return Api.namedTypeApi(this.node.type)
  }

  getTypename(): Typename {
    return this.node.type.name.value
  }

  setTypename(typename: Typename): this {
    mutable(this.node.type.name).value = typename

    return this
  }
}

/**
 * @category API Mixins
 */
export function namedTypeApiMixin(node: TypeApiMixinNode): TypeApiMixin {
  return new TypeApiMixin(node)
}
