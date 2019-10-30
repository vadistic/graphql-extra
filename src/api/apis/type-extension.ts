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

/**
 * API for GraphQL `TypeExtensionNode`
 *
 * @category API Public
 */
export type TypeExtensionApi =
  | EnumExtApi
  | InputExtApi
  | InterfaceExtApi
  | ObjectExtApi
  | ScalarExtApi
  | UnionExtApi

/**
 * API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export interface ObjectExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    FieldDefinitionsApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: ObjectTypeExtensionNode
}

/**
 * create API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export function objectExtApi(node: ObjectTypeExtensionNode): ObjectExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export interface InterfaceExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    FieldDefinitionsApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: InterfaceTypeExtensionNode
}

/**
 * create API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export function interfaceExtApi(node: InterfaceTypeExtensionNode): InterfaceExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export interface UnionExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: UnionTypeExtensionNode
}

/**
 * create API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export function unionExtApi(node: UnionTypeExtensionNode): UnionExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export interface ScalarExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: ScalarTypeExtensionNode
}

/**
 * create API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export function scalarExtApi(node: ScalarTypeExtensionNode): ScalarExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export interface EnumExtApi
  extends NameApiMixin<ObjectExtApi>,
    DirectivesApiMixin<ObjectExtApi>,
    TypeExtensionAssertionMixinApi {
  node: EnumTypeExtensionNode
}

/**
 * create API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export function enumExtApi(node: EnumTypeExtensionNode): EnumExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export interface InputExtApi
  extends NameApiMixin<InputExtApi>,
    DirectivesApiMixin<InputExtApi>,
    InputValuesAsFieldsApiMixin<InputExtApi>,
    TypeExtensionAssertionMixinApi {
  node: InputObjectTypeExtensionNode
}

/**
 * create API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export function inputExtApi(node: InputObjectTypeExtensionNode): InputExtApi {
  return {
    node,
    ...nameApiMixin(node),
    ...directivesApiMixin(node),
    ...inputValuesAsFieldsApiMixin(node),
    ...typeExtensionAssertionApiMixin(node),
  }
}
