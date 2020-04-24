import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import {
  TypeNodeProps, nameNode, nonNullTypeNode, listTypeNode, typeNode,
} from '../../node'
import { applyPropsCloned, mutable } from '../../utils'
import type { Typename } from '../types'

/**
 * API for GraphQL `TypeNode`
 *
 * @category API Public
 */
export class TypeApi {
  constructor(readonly node: GQL.TypeNode) {}

  getNamedType(): GQL.NamedTypeNode {
    return this._getNamedType(this.node)
  }

  getTypename(): Typename {
    return this._getNamedType(this.node).name.value
  }

  setTypename(value: Typename): this {
    mutable(this._getNamedType(this.node)).name = nameNode(value)

    return this
  }

  setType(props: GQL.TypeNode | TypeNodeProps): this {
    Object.assign(this.node, applyPropsCloned(typeNode, props))

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
      Object.assign(this.node, nonNullTypeNode(this.node))
    }

    if (!value && this.node.kind === Kind.NON_NULL_TYPE) {
      Object.assign(this.node, this.node.type)
    }

    return this
  }

  setList(value = true): this {
    if (value && this.node.kind !== Kind.LIST_TYPE) {
      Object.assign(this.node, listTypeNode(this.node))
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
export class NamedTypeApi {
  constructor(readonly node: GQL.NamedTypeNode) {}

  getTypename(): Typename {
    return this.node.name.value
  }

  setTypename(value: Typename): this {
    mutable(this.node).name = nameNode(value)

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
