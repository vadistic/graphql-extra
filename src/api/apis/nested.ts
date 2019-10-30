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
import { DeepMutable, Mutable, applyPropsCloned } from '../../utils'
import { TypeNodeProps, nameNode, nonNullTypeNode, listTypeNode, typeNode } from '../../node'
import {
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  InputValuesAsArgumentsApiMixin,
  TypeApiMixin,
  nameApiMixin,
  descriptionApiMixin,
  directivesApiMixin,
  inputValuesAsArgumentsApiMixin,
  typeApiMixin,
  ArgumentsApiMixin,
  argumentsApiMixin,
} from '../mixins'

// ────────────────────────────────────────────────────────────────────────────────

export interface FieldDefinitionApi
  extends NameApiMixin<FieldDefinitionApi>,
    DescriptionApiMixin<FieldDefinitionApi>,
    DirectivesApiMixin<FieldDefinitionApi>,
    InputValuesAsArgumentsApiMixin<FieldDefinitionApi>,
    TypeApiMixin<FieldDefinitionApi> {
  node: FieldDefinitionNode

  toInputValue(): InputValueApi
}

export function fieldDefinitionApi(node: FieldDefinitionNode): FieldDefinitionApi {
  return {
    node,

    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...inputValuesAsArgumentsApiMixin(node),
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
    DirectivesApiMixin<FieldDefinitionApi>,
    TypeApiMixin<FieldDefinitionApi> {
  node: InputValueDefinitionNode

  toField(): FieldDefinitionApi

  getDefaultValue(): ValueNode | undefined
  setDefaultValue(value: ValueNode): InputValueApi
}

export function inputValueApi(node: InputValueDefinitionNode): InputValueApi {
  const _node = node as Mutable<InputValueDefinitionNode>

  return {
    node,

    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeApiMixin(node),

    toField() {
      const { kind, defaultValue, loc, ...rest } = node

      return fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest })
    },

    getDefaultValue() {
      return node.defaultValue
    },

    setDefaultValue(value) {
      _node.defaultValue = value

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface TypeApi {
  node: TypeNode

  getNamedType(): NamedTypeNode
  getTypename(): string

  setTypename(value: string): TypeApi
  setType(props: TypeNode | TypeNodeProps): TypeApi

  isNonNull(deep?: boolean): boolean
  isList(deep?: boolean): boolean

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
      Object.assign(node, applyPropsCloned(typeNode, props))

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
