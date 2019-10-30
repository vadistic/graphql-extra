import {
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  UnionTypeExtensionNode,
  ScalarTypeExtensionNode,
  EnumTypeExtensionNode,
  InputObjectTypeExtensionNode,
} from 'graphql'
import {
  NameApiMixin,
  DirectivesApiMixin,
  FieldDefinitionsApiMixin,
  TypeExtensionAssertionMixinApi,
  nameApiMixin,
  directivesApiMixin,
  fieldDefinitionsApiMixin,
  typeExtensionAssertionApiMixin,
  InputValuesAsFieldsApiMixin,
  inputValuesAsFieldsApiMixin,
} from '../mixins'

// ────────────────────────────────────────────────────────────────────────────────

export interface ObjectExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    FieldDefinitionsApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: ObjectTypeExtensionNode
}

export function objectExtApi(node: ObjectTypeExtensionNode): ObjectExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InterfaceExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    FieldDefinitionsApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: InterfaceTypeExtensionNode
}

export function interfaceExtApi(node: InterfaceTypeExtensionNode): InterfaceExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface UnionExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: UnionTypeExtensionNode
}

export function unionExtApi(node: UnionTypeExtensionNode): UnionExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ScalarExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: ScalarTypeExtensionNode
}

export function scalarExtApi(node: ScalarTypeExtensionNode): ScalarExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface EnumExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: EnumTypeExtensionNode
}

export function enumExtApi(node: EnumTypeExtensionNode): EnumExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InputExtApi
  extends NameApiMixin<InputExtApi>,
    DirectivesApiMixin<InputExtApi>,
    InputValuesAsFieldsApiMixin<InputExtApi>,
    TypeExtensionAssertionMixinApi {
  node: InputObjectTypeExtensionNode
}

export function inputExtApi(node: InputObjectTypeExtensionNode): InputExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...inputValuesAsFieldsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}
