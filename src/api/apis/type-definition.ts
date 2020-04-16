import type {
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql'
import { Mix } from 'mix-classes'

import { TypeDefinitionAssertionApiMixin } from '../mixins/assertion'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { FieldDefinitionsApiMixin } from '../mixins/field-definition'
import { InputValuesAsFieldsApiMixin } from '../mixins/input-values-as-fields'
import { NameApiMixin } from '../mixins/name'

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

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `ObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export class ObjectTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  FieldDefinitionsApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: ObjectTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])
  }
}

/**
 * `ObjectTypeApi` constructor fn
 *
 * @category API Public
 */
export function objectTypeApi(node: ObjectTypeDefinitionNode): ObjectTypeApi {
  return new ObjectTypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InterfaceTypeDefinitionNode`
 *
 * @category API Public
 */
export class InterfaceTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  FieldDefinitionsApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: InterfaceTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])
  }
}

/**
 * `InterfaceTypeApi` constructor fn
 *
 * @category API Public
 */
export function interfaceTypeApi(node: InterfaceTypeDefinitionNode): InterfaceTypeApi {
  return new InterfaceTypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `UnionTypeDefinitionNode`
 *
 * @category API Public
 */
export class UnionTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: UnionTypeDefinitionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `UnionTypeApi` constructor fn
 *
 * @category API Public
 */
export function unionTypeApi(node: UnionTypeDefinitionNode): UnionTypeApi {
  return new UnionTypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `ScalarTypeDefinitionNode`
 *
 * @category API Public
 */
export class ScalarTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: ScalarTypeDefinitionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `ScalarTypeApi` constructor fn
 *
 * @category API Public
 */
export function scalarTypeApi(node: ScalarTypeDefinitionNode): ScalarTypeApi {
  return new ScalarTypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `EnumTypeDefinitionNode`
 *
 * @category API Public
 */
export class EnumTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: EnumTypeDefinitionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `EnumTypeApi` constructor fn
 *
 * @category API Public
 */
export function enumTypeApi(node: EnumTypeDefinitionNode): EnumTypeApi {
  return new EnumTypeApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InputObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export class InputTypeApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  DirectivesApiMixin,
  InputValuesAsFieldsApiMixin,
  TypeDefinitionAssertionApiMixin,
) {
  constructor(readonly node: InputObjectTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])
  }
}

/**
 * `InputTypeApi` constructor fn
 *
 * @category API Public
 */
export function inputTypeApi(node: InputObjectTypeDefinitionNode): InputTypeApi {
  return new InputTypeApi(node)
}
