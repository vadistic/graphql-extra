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

// ────────────────────────────────────────────────────────────────────────────────

export interface ObjectTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: ObjectTypeDefinitionNode
}

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

// ────────────────────────────────────────────────────────────────────────────────

export interface InterfaceTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: InterfaceTypeDefinitionNode
}

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

// ────────────────────────────────────────────────────────────────────────────────

export interface UnionTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: UnionTypeDefinitionNode
}

export function unionTypeApi(node: UnionTypeDefinitionNode): UnionTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ScalarTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: ScalarTypeDefinitionNode
}

export function scalarTypeApi(node: ScalarTypeDefinitionNode): ScalarTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface EnumTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: EnumTypeDefinitionNode
}

export function enumTypeApi(node: EnumTypeDefinitionNode): EnumTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeDefinitionAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InputTypeApi
  extends NameApiMixin<InputTypeApi>,
    DescriptionApiMixin<InputTypeApi>,
    DirectivesApiMixin<InputTypeApi>,
    InputValuesAsFieldsApiMixin<InputTypeApi>,
    TypeDefinitionAssertionMixinApi {
  node: InputObjectTypeDefinitionNode
}

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
