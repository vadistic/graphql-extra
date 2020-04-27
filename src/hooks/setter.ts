import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import {
  applyPropsCloned, applyNullable, applyProps, applyPropsNullable, matchNode,
} from '../utils'


/**
 * @category Helper
 */
export interface SimpleSetterConfig <Value> {
  set: (value: Value) => void
  get: () => Value
}

/**
 * @category Helper
 */
export class SimpleSetter <Value> {
  constructor(protected config: SimpleSetterConfig <Value>) {
  }

  get node(): Value {
    return this.config.get()
  }

  get(): Value {
    return this.config.get()
  }

  set(value: Value): void {
    return this.config.set(value)
  }

  is(value: Value): boolean {
    return matchNode(this.config.get(), value)
  }

  static fromKey<Node extends GQL.ASTNode, Key extends keyof Node >(node: Node, key: Key): SimpleSetter<Node[Key]> {
    return new SimpleSetter({
      get: (): Node[Key] => node[key],
      set: (value: Node[Key]): void => {
        // eslint-disable-next-line no-param-reassign
        node[key] = value
      },
    })
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category Helper
 */
export interface SetterConfig<
  Parent extends GQL.ASTNode,
  Key extends keyof Parent,
  Value extends GQL.ASTNode,
  Api,
  Props
> {
  parent: Parent
  key: Key
  factory: (props: Props) => Value
  api: (node: Value) => Api
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category Helper
 */
export class Setter<Parent extends GQL.ASTNode, Key extends keyof Parent, Value extends GQL.ASTNode, Api, Props> {
  constructor(protected config: SetterConfig<Parent, Key, Value, Api, Props>) {}

  get node(): Value {
    return this.config.parent[this.config.key] as unknown as Value
  }

  set node(value: Value) {
    this.config.parent[this.config.key] = value as any
  }

  get(): Api {
    return this.config.api(this.node)
  }

  set(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)

    this.node = next

    return this
  }

  is(props: Props | Value): boolean {
    const next = applyProps(this.config.factory, props)

    return matchNode(this.node, next)
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category Helper
 */
export class OptionalSetter<
  Parent extends GQL.ASTNode,
  Key extends keyof Parent,
  Value extends GQL.ASTNode,
  Api,
  Props
> {
  constructor(protected config: SetterConfig<Parent, Key, Value, Api, Props>) {}

  get node(): Value | undefined {
    return this.config.parent[this.config.key] as unknown as Value | undefined
  }

  set node(value: Value | undefined) {
    this.config.parent[this.config.key] = value as any
  }

  get(): Api | undefined {
    return applyNullable(this.config.api, this.node)
  }

  set(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)

    this.node = next

    return this
  }

  unset(): this {
    this.node = undefined

    return this
  }

  is(props?: Props | Value): boolean {
    if (!props) {
      return !!this.node
    }

    const next = applyPropsNullable(this.config.factory, props)

    return matchNode(this.node, next)
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category Helper
 */
export class TypeSetter<
  Parent extends GQL.ASTNode,
  Key extends keyof Parent,
  Value extends GQL.TypeNode,
  Api,
  Props
  > extends Setter<Parent, Key, Value, Api, Props> {
  isList(deep = true): boolean {
    if (deep) {
      return this._isListDeep(this.node)
    }

    return this.node.kind === Kind.LIST_TYPE
  }


  private _isListDeep(type: GQL.TypeNode): boolean {
    if (type.kind === Kind.LIST_TYPE) return true
    if (type.kind === Kind.NAMED_TYPE) return false

    return this._isListDeep(type.type)
  }
}


// export class TypeApi extends Mix(Mixin.KindAssertionApiMixin) {
//   constructor(readonly node: GQL.TypeNode) {
//     super([node])

//     validateNodeKindsArr([Kind.NAMED_TYPE, Kind.LIST_TYPE, Kind.NON_NULL_TYPE], node)
//   }

//   getNamedType(): GQL.NamedTypeNode {
//     return this._getNamedType(this.node)
//   }

//   getTypename(): Typename {
//     return this._getNamedType(this.node).name.value
//   }

//   setTypename(value: Typename): this {
//     mutable(this._getNamedType(this.node)).name = Ast.nameNode(value)

//     return this
//   }

//   setType(props: Ast.TypeNodeProps | GQL.TypeNode): this {
//     Object.assign(this.node, applyPropsCloned(Ast.typeNode, props))

//     return this
//   }

//   isNonNull(deep = true): boolean {
//     if (!deep) {
//       return this.node.kind === Kind.NON_NULL_TYPE
//     }

//     return this._isNonNullDeep(this.node)
//   }

//   isList(deep = true): boolean {
//     if (!deep) {
//       return this.node.kind === Kind.LIST_TYPE
//     }

//     return this._isListDeep(this.node)
//   }

//   setNonNull(value = true): this {
//     if (value && this.node.kind !== Kind.NON_NULL_TYPE) {
//       Object.assign(this.node, Ast.nonNullTypeNode(this.node))
//     }

//     if (!value && this.node.kind === Kind.NON_NULL_TYPE) {
//       Object.assign(this.node, this.node.type)
//     }

//     return this
//   }

//   setList(value = true): this {
//     if (value && this.node.kind !== Kind.LIST_TYPE) {
//       Object.assign(this.node, Ast.listTypeNode(this.node))
//     }

//     if (!value && this.node.kind === Kind.LIST_TYPE) {
//       Object.assign(this.node, this.node.type)
//     }

//     return this
//   }

//   // ────────────────────────────────────────────────────────────────────────────────

//   private _getNamedType(type: GQL.TypeNode): GQL.NamedTypeNode {
//     return type.kind === Kind.NAMED_TYPE ? type : this._getNamedType(type.type)
//   }

//   private _isNonNullDeep(type: GQL.TypeNode): boolean {
//     if (type.kind === Kind.NON_NULL_TYPE) return true
//     if (type.kind === Kind.NAMED_TYPE) return false

//     return this._isNonNullDeep(type.type)
//   }

//   private _isListDeep(type: GQL.TypeNode): boolean {
//     if (type.kind === Kind.LIST_TYPE) return true
//     if (type.kind === Kind.NAMED_TYPE) return false

//     return this._isListDeep(type.type)
//   }
// }
