import type {
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  UnionTypeExtensionNode,
  ScalarTypeExtensionNode,
  EnumTypeExtensionNode,
  InputObjectTypeExtensionNode,
} from 'graphql'
import { Mix } from 'mix-classes'

import { TypeExtensionAssertionApiMixin } from '../mixins/assertion'
import { DirectivesApiMixin } from '../mixins/directive'
import { FieldDefinitionsApiMixin } from '../mixins/field-definition'
import { InputValuesAsFieldsApiMixin } from '../mixins/input-values-as-fields'
import { NameApiMixin } from '../mixins/name'

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

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class ObjectExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  FieldDefinitionsApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: ObjectTypeExtensionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `ObjectExtApi` constructor fn
 *
 * @category API Public
 */
export function objectExtApi(node: ObjectTypeExtensionNode): ObjectExtApi {
  return new ObjectExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export class InterfaceExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  FieldDefinitionsApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: InterfaceTypeExtensionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `InterfaceExtApi` constructor fn
 *
 * @category API Public
 */
export function interfaceExtApi(node: InterfaceTypeExtensionNode): InterfaceExtApi {
  return new InterfaceExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export class UnionExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: UnionTypeExtensionNode) {
    super([node], [node], [node])
  }
}

/**
 * `UnionExtApi` constructor fn
 *
 * @category API Public
 */
export function unionExtApi(node: UnionTypeExtensionNode): UnionExtApi {
  return new UnionExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export class ScalarExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: ScalarTypeExtensionNode) {
    super([node], [node], [node])
  }
}

/**
 * `ScalarExtApi` constructor fn
 *
 * @category API Public
 */
export function scalarExtApi(node: ScalarTypeExtensionNode): ScalarExtApi {
  return new ScalarExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export class EnumExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: EnumTypeExtensionNode) {
    super([node], [node], [node])
  }
}

/**
 * `EnumExtApi` constructor fn
 *
 * @category API Public
 */
export function enumExtApi(node: EnumTypeExtensionNode): EnumExtApi {
  return new EnumExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class InputExtApi extends Mix(
  NameApiMixin,
  DirectivesApiMixin,
  InputValuesAsFieldsApiMixin,
  TypeExtensionAssertionApiMixin,
) {
  constructor(readonly node: InputObjectTypeExtensionNode) {
    super([node], [node], [node], [node])
  }
}

/**
 * `InputExtApi` constructor fn
 *
 * @category API Public
 */
export function inputExtApi(node: InputObjectTypeExtensionNode): InputExtApi {
  return new InputExtApi(node)
}
