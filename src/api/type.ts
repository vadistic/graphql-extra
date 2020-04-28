import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Ast, Mixin } from '../internal'
import { Typename } from '../types'
import {
  applyPropsCloned,
  mutable,
  validateNodeKindsArr,
  validateNodeKind,
} from '../utils'

/**
 * API for GraphQL `TypeNode`
 *
 * @category API Public
 */
export class TypeApi extends Mix(Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.TypeNode) {
    super([node])

    validateNodeKindsArr([Kind.NAMED_TYPE, Kind.LIST_TYPE, Kind.NON_NULL_TYPE], node)
  }

  getNamedType(): GQL.NamedTypeNode {
    return this._getNamedType(this.node)
  }

  getTypename(): Typename {
    return this._getNamedType(this.node).name.value
  }

  setTypename(value: Typename): this {
    mutable(this._getNamedType(this.node)).name = Ast.nameNode(value)

    return this
  }

  setType(props: Ast.TypeNodeProps | GQL.TypeNode): this {
    Object.assign(this.node, applyPropsCloned(Ast.typeNode, props))

    return this
  }

  isNonNull(deep = true): boolean {
    if (!deep) {
      return this.node.kind === Kind.NON_NULL_TYPE
    }

    return this._isNonNullDeep(this.node)
  }

  isList(deep = true): boolean {
    if (!deep) {
      return this.node.kind === Kind.LIST_TYPE
    }

    return this._isListDeep(this.node)
  }

  setNonNull(value = true): this {
    if (value && this.node.kind !== Kind.NON_NULL_TYPE) {
      Object.assign(this.node, Ast.nonNullTypeNode(this.node))
    }

    if (!value && this.node.kind === Kind.NON_NULL_TYPE) {
      Object.assign(this.node, this.node.type)
    }

    return this
  }

  setList(value = true): this {
    if (value && this.node.kind !== Kind.LIST_TYPE) {
      Object.assign(this.node, Ast.listTypeNode(this.node))
    }

    if (!value && this.node.kind === Kind.LIST_TYPE) {
      Object.assign(this.node, this.node.type)
    }

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  private _getNamedType(type: GQL.TypeNode): GQL.NamedTypeNode {
    return type.kind === Kind.NAMED_TYPE ? type : this._getNamedType(type.type)
  }

  private _isNonNullDeep(type: GQL.TypeNode): boolean {
    if (type.kind === Kind.NON_NULL_TYPE) return true
    if (type.kind === Kind.NAMED_TYPE) return false

    return this._isNonNullDeep(type.type)
  }

  private _isListDeep(type: GQL.TypeNode): boolean {
    if (type.kind === Kind.LIST_TYPE) return true
    if (type.kind === Kind.NAMED_TYPE) return false

    return this._isListDeep(type.type)
  }
}

/**
 * `TypeApi` constructor fn
 *
 * @category API Public
 */
export function typeApi(node: GQL.TypeNode): TypeApi {
  return new TypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `NamedTypeNode`
 *
 * @category API Public
 */
export class NamedTypeApi extends Mix(Mixin.KindAssertionMixin) {
  constructor(readonly node: GQL.NamedTypeNode) {
    super([node])

    validateNodeKind(Kind.NAMED_TYPE, node)
  }

  getTypename(): Typename {
    return this.node.name.value
  }

  setTypename(value: Typename): this {
    mutable(this.node).name = Ast.nameNode(value)

    return this
  }
}

/**
 * `NamedTypeApi` constructor fn
 *
 * @category API Public
 */
export function namedTypeApi(node: GQL.NamedTypeNode): NamedTypeApi {
  return new NamedTypeApi(node)
}
