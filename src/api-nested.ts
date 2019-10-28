import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  TypeNode,
  EnumValueDefinitionNode,
  Kind,
  NamedTypeNode,
  DirectiveNode,
  ArgumentNode,
  ValueNode,
} from 'graphql'
import { DeepMutable, Mutable, nodeFnCloned } from './utils'
import {
  NameApiMixin,
  nameApiMixin,
  DescriptionApiMixin,
  descriptionApiMixin,
  DirectivesApiMixin,
  directivesApiMixin,
  TypeApiMixin,
  typeApiMixin,
  ArgumentsApiMixin,
  argumentsApiMixin,
} from './api-mixins'
import { TypeNodeProps, nameNode, nonNullTypeNode, listTypeNode, typeNode } from './node'

export interface FieldApi
  extends NameApiMixin<FieldApi>,
    DescriptionApiMixin<FieldApi>,
    DirectivesApiMixin<FieldApi>,
    TypeApiMixin<FieldApi> {
  node: FieldDefinitionNode

  toInputValue(): InputValueApi
}

export function fieldApi(node: FieldDefinitionNode): FieldApi {
  return {
    node,

    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeApiMixin(node),

    toInputValue() {
      const { kind, arguments: args, loc, ...rest } = node

      return inputValueApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InputValueApi
  extends NameApiMixin<InputValueApi>,
    DescriptionApiMixin<InputValueApi>,
    DirectivesApiMixin<FieldApi>,
    TypeApiMixin<FieldApi> {
  node: InputValueDefinitionNode

  toField(): FieldApi
}

export function inputValueApi(node: InputValueDefinitionNode): InputValueApi {
  return {
    node,

    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeApiMixin(node),

    toField() {
      const { kind, defaultValue, loc, ...rest } = node

      return fieldApi({ kind: Kind.FIELD_DEFINITION, ...rest })
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface TypeApi {
  node: TypeNode

  // getters
  getNamedType(): NamedTypeNode
  getTypename(): string

  // setters
  setTypename(value: string): TypeApi
  setType(props: TypeNode | TypeNodeProps): TypeApi

  // list-null guards
  isNonNull(deep?: boolean): boolean
  isList(deep?: boolean): boolean

  // list-null setters
  setNonNull(value?: boolean): TypeApi
  setList(value?: boolean): TypeApi
}

export function typeApi(node: TypeNode): TypeApi {
  const _node = node as DeepMutable<TypeNode>

  const _getNamedType = (type: TypeNode): NamedTypeNode =>
    type.kind === Kind.NAMED_TYPE ? type : _getNamedType(type.type)

  const _isNonNullDeep = (type: TypeNode): boolean =>
    type.kind === Kind.NON_NULL_TYPE
      ? true
      : type.kind === Kind.NAMED_TYPE
      ? false
      : _isNonNullDeep(type.type)

  const _isListDeep = (type: TypeNode): boolean =>
    type.kind === Kind.LIST_TYPE
      ? true
      : type.kind === Kind.NAMED_TYPE
      ? false
      : _isListDeep(type.type)

  return {
    node,

    // getters

    getNamedType() {
      return _getNamedType(node)
    },

    getTypename() {
      return _getNamedType(node).name.value
    },

    // setters

    setTypename(value) {
      const namedType: Mutable<NamedTypeNode> = _getNamedType(_node)

      namedType.name = nameNode(value)

      return this as any
    },

    setType(props) {
      Object.assign(node, nodeFnCloned(typeNode)(props))

      return this as any
    },

    // list-null guards

    isNonNull(deep = true) {
      if (!deep) {
        return node.kind === Kind.NON_NULL_TYPE
      }

      return _isNonNullDeep(node)
    },

    isList(deep = true) {
      if (!deep) {
        return node.kind === Kind.LIST_TYPE
      }

      return _isListDeep(node)
    },

    // list-null setters

    setNonNull(value = true) {
      if (value && node.kind !== Kind.NON_NULL_TYPE) {
        Object.assign(node, nonNullTypeNode(node))
      }

      if (!value && node.kind === Kind.NON_NULL_TYPE) {
        Object.assign(node, node.type)
      }

      return this as any
    },

    setList(value = true) {
      if (value && node.kind !== Kind.LIST_TYPE) {
        Object.assign(node, listTypeNode(node))
      }

      if (!value && node.kind === Kind.LIST_TYPE) {
        Object.assign(node, node.type)
      }

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface EnumValueApi
  extends NameApiMixin<EnumValueApi>,
    DescriptionApiMixin<EnumValueApi>,
    DirectivesApiMixin<EnumValueApi> {
  node: EnumValueDefinitionNode
}

export function enumValueApi(node: EnumValueDefinitionNode): EnumValueApi {
  return {
    node,

    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface DirectiveApi extends NameApiMixin<DirectiveApi>, ArgumentsApiMixin<DirectiveApi> {
  node: DirectiveNode
}

export function directiveApi(node: DirectiveNode): DirectiveApi {
  return {
    node,

    ...nameApiMixin(node),
    ...argumentsApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ArgumentApi extends NameApiMixin<ArgumentApi> {
  node: ArgumentNode

  getValue(): ValueNode
  setValue(value: ValueNode): ArgumentApi
}

export function argumentApi(node: ArgumentNode): ArgumentApi {
  return {
    node,

    ...nameApiMixin(node),

    getValue() {
      return node.value
    },

    setValue(value) {
      Object.assign(node, value)

      return this as any
    },
  }
}
