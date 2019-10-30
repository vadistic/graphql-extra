import {
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql'
import {
  DescriptionApiMixin,
  descriptionApiMixin,
  DirectivesApiMixin,
  directivesApiMixin,
  FieldDefinitionsApiMixin,
  fieldDefinitionsApiMixin,
  InputValuesAsFieldsApiMixin,
  inputValuesAsFieldsApiMixin,
  nameApiMixin,
  NameApiMixin,
  TypeDefinitionAssertionMixinApi,
  typeDefinitionAssertionApiMixin,
} from '../mixins'

/**
 * API for GraphQL `TypeDefinitionNode`
 *
 * @category API Public
 */
export type TypeDefinitonApi =
  | EnumTypeApi
  | InputTypeApi
  | InterfaceTypeApi
  | ObjectTypeApi
  | ScalarTypeApi
  | UnionTypeApi

/**
 * API for GraphQL `ObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export interface ObjectTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: ObjectTypeDefinitionNode
}

/**
 * create API for GraphQL `ObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export function objectTypeApi(node: ObjectTypeDefinitionNode): ObjectTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `InterfaceTypeDefinitionNode`
 *
 * @category API Public
 */
export interface InterfaceTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: InterfaceTypeDefinitionNode
}

/**
 * create API for GraphQL `InterfaceTypeDefinitionNode`
 *
 * @category API Public
 */
export function interfaceTypeApi(node: InterfaceTypeDefinitionNode): InterfaceTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `UnionTypeDefinitionNode`
 *
 * @category API Public
 */
export interface UnionTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: UnionTypeDefinitionNode
}

/**
 * create API for GraphQL `UnionTypeDefinitionNode`
 *
 * @category API Public
 */
export function unionTypeApi(node: UnionTypeDefinitionNode): UnionTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `ScalarTypeDefinitionNode`
 *
 * @category API Public
 */
export interface ScalarTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: ScalarTypeDefinitionNode
}

/**
 * create API for GraphQL `ScalarTypeDefinitionNode`
 *
 * @category API Public
 */
export function scalarTypeApi(node: ScalarTypeDefinitionNode): ScalarTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `EnumTypeDefinitionNode`
 *
 * @category API Public
 */
export interface EnumTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: EnumTypeDefinitionNode
}

/**
 * create API for GraphQL `EnumTypeDefinitionNode`
 *
 * @category API Public
 */
export function enumTypeApi(node: EnumTypeDefinitionNode): EnumTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

/**
 * API for GraphQL `InputObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export interface InputTypeApi
  extends NameApiMixin<InputTypeApi>,
    DescriptionApiMixin<InputTypeApi>,
    DirectivesApiMixin<InputTypeApi>,
    InputValuesAsFieldsApiMixin<InputTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: InputObjectTypeDefinitionNode
}

/**
 * create API for GraphQL `InputObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export function inputTypeApi(node: InputObjectTypeDefinitionNode): InputTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...inputValuesAsFieldsApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}
