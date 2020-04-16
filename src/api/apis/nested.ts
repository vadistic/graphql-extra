import {
  ArgumentNode,
  DirectiveNode,
  EnumValueDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  Kind,
  NamedTypeNode,
  TypeNode,
  ValueNode,
} from 'graphql'
import { Mix } from 'mix-classes'
import { applyPropsCloned, mutable } from '../../utils'
import { TypeNodeProps, nameNode, nonNullTypeNode, listTypeNode, typeNode } from '../../node'
import {
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  InputValuesAsArgumentsApiMixin,
  TypeApiMixin,
  ArgumentsApiMixin,
} from '../mixins'
import { Typename } from '../types'

/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export class FieldDefinitionApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  InputValuesAsArgumentsApiMixin,
  TypeApiMixin,
) {
  constructor(readonly node: FieldDefinitionNode) {
    super([node], [node], [node], [node], [node])
  }

  toInputValue(): InputValueApi {
    const { kind, arguments: args, loc, ...rest } = this.node

    return inputValueApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
  }
}

/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fieldDefinitionApi(node: FieldDefinitionNode) {
  return new FieldDefinitionApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export class InputValueApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  TypeApiMixin,
) {
  constructor(readonly node: InputValueDefinitionNode) {
    super([node], [node], [node], [node])
  }

  toField(): FieldDefinitionApi {
    const { kind, defaultValue, loc, ...rest } = this.node

    return fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
  }

  getDefaultValue(): ValueNode | undefined {
    return this.node.defaultValue
  }

  setDefaultValue(value: ValueNode): InputValueApi {
    mutable(this.node).defaultValue = value

    return this
  }
}

/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */

export function inputValueApi(node: InputValueDefinitionNode): InputValueApi {
  return new InputValueApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `TypeNode`
 *
 * @category API Public
 */
export class TypeApi {
  constructor(readonly node: TypeNode) {}

  private readonly _getNamedType = (type: TypeNode): NamedTypeNode =>
    type.kind === Kind.NAMED_TYPE ? type : this._getNamedType(type.type)

  private readonly _isNonNullDeep = (type: TypeNode): boolean =>
    type.kind === Kind.NON_NULL_TYPE
      ? true
      : type.kind === Kind.NAMED_TYPE
      ? false
      : this._isNonNullDeep(type.type)

  private readonly _isListDeep = (type: TypeNode): boolean =>
    type.kind === Kind.LIST_TYPE
      ? true
      : type.kind === Kind.NAMED_TYPE
      ? false
      : this._isListDeep(type.type)

  getNamedType(): NamedTypeNode {
    return this._getNamedType(this.node)
  }

  getTypename(): Typename {
    return this._getNamedType(this.node).name.value
  }

  setTypename(value: Typename): this {
    mutable(this._getNamedType(this.node)).name = nameNode(value)

    return this
  }

  setType(props: TypeNode | TypeNodeProps): this {
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
}

/**
 * `TypeApi` constructor fn
 *
 * @category API Public
 */
export function typeApi(node: TypeNode) {
  return new TypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export class EnumValueApi extends Mix(NameApiMixin, DescriptionApiMixin, DirectivesApiMixin) {
  constructor(readonly node: EnumValueDefinitionNode) {
    super([node], [node], [node])
  }
}

/**
 * `EnumValueApi` contructor fn
 *
 * @category API Public
 */
export function enumValueApi(node: EnumValueDefinitionNode) {
  return new EnumValueApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `DirectiveNode`
 *
 * @category API Public
 */
export class DirectiveApi extends Mix(NameApiMixin, ArgumentsApiMixin) {
  constructor(readonly node: DirectiveNode) {
    super([node], [node])
  }
}

/**
 * `DirectiveApi` constructor fn
 *
 * @category API Public
 */
export function directiveApi(node: DirectiveNode) {
  return new DirectiveApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export class ArgumentApi extends Mix(NameApiMixin) {
  constructor(readonly node: ArgumentNode) {
    super([node])
  }

  getValue(): ValueNode {
    return this.node.value
  }

  setValue(value: ValueNode): this {
    Object.assign(this.node, value)

    return this
  }
}
/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export function argumentApi(node: ArgumentNode): ArgumentApi {
  return new ArgumentApi(node)
}
