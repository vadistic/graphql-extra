import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind } from '../errors'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { FieldDefinitionsApiMixin } from '../mixins/field-definition'
import { InputValuesAsFieldsApiMixin } from '../mixins/input-values-as-fields'
import { NameApiMixin } from '../mixins/name'
import { TypeDefinitionAssertionApiMixin } from '../mixins/type-assertion'

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
  constructor(readonly node: GQL.ObjectTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.OBJECT_TYPE_DEFINITION, node)
  }
}

/**
 * `ObjectTypeApi` constructor fn
 *
 * @category API Public
 */
export function objectTypeApi(node: GQL.ObjectTypeDefinitionNode): ObjectTypeApi {
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
  constructor(readonly node: GQL.InterfaceTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.INTERFACE_TYPE_DEFINITION, node)
  }
}

/**
 * `InterfaceTypeApi` constructor fn
 *
 * @category API Public
 */
export function interfaceTypeApi(node: GQL.InterfaceTypeDefinitionNode): InterfaceTypeApi {
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
  constructor(readonly node: GQL.UnionTypeDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.UNION_TYPE_DEFINITION, node)
  }
}

/**
 * `UnionTypeApi` constructor fn
 *
 * @category API Public
 */
export function unionTypeApi(node: GQL.UnionTypeDefinitionNode): UnionTypeApi {
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
  constructor(readonly node: GQL.ScalarTypeDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.SCALAR_TYPE_DEFINITION, node)
  }
}

/**
 * `ScalarTypeApi` constructor fn
 *
 * @category API Public
 */
export function scalarTypeApi(node: GQL.ScalarTypeDefinitionNode): ScalarTypeApi {
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
  constructor(readonly node: GQL.EnumTypeDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.ENUM_TYPE_DEFINITION, node)
  }
}

/**
 * `EnumTypeApi` constructor fn
 *
 * @category API Public
 */
export function enumTypeApi(node: GQL.EnumTypeDefinitionNode): EnumTypeApi {
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
  constructor(readonly node: GQL.InputObjectTypeDefinitionNode) {
    super([node], [node], [node], [node], [node])

    validateNodeKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, node)
  }
}

/**
 * `InputTypeApi` constructor fn
 *
 * @category API Public
 */
export function inputTypeApi(node: GQL.InputObjectTypeDefinitionNode): InputTypeApi {
  return new InputTypeApi(node)
}