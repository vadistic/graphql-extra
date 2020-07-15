import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class ObjectExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.FieldDefinitionsMixin,
  Mixin.InterfacesMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.ObjectTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.OBJECT_TYPE_EXTENSION, node)
  }
}

/**
 * `ObjectExtApi` constructor fn
 *
 * @category API Public
 */
export function objectExtApi(node: GQL.ObjectTypeExtensionNode): ObjectExtApi {
  return new ObjectExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export class InterfaceExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.FieldDefinitionsMixin,
  Mixin.InterfacesMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.InterfaceTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.INTERFACE_TYPE_EXTENSION, node)
  }
}

/**
 * `InterfaceExtApi` constructor fn
 *
 * @category API Public
 */
export function interfaceExtApi(node: GQL.InterfaceTypeExtensionNode): InterfaceExtApi {
  return new InterfaceExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export class UnionExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.UnionTypesMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.UnionTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.UNION_TYPE_EXTENSION, node)
  }
}

/**
 * `UnionExtApi` constructor fn
 *
 * @category API Public
 */
export function unionExtApi(node: GQL.UnionTypeExtensionNode): UnionExtApi {
  return new UnionExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export class ScalarExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.ScalarTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.SCALAR_TYPE_EXTENSION, node)
  }
}

/**
 * `ScalarExtApi` constructor fn
 *
 * @category API Public
 */
export function scalarExtApi(node: GQL.ScalarTypeExtensionNode): ScalarExtApi {
  return new ScalarExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export class EnumExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.EnumValueDefinitionMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.EnumTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.ENUM_TYPE_EXTENSION, node)
  }
}

/**
 * `EnumExtApi` constructor fn
 *
 * @category API Public
 */
export function enumExtApi(node: GQL.EnumTypeExtensionNode): EnumExtApi {
  return new EnumExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class InputExtApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.InputValuesAsFieldsMixin,
  Mixin.TypeExtensionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.InputObjectTypeExtensionNode) {
    super(node)

    validateNodeKind(Kind.INPUT_OBJECT_TYPE_EXTENSION, node)
  }
}

/**
 * `InputExtApi` constructor fn
 *
 * @category API Public
 */
export function inputExtApi(node: GQL.InputObjectTypeExtensionNode): InputExtApi {
  return new InputExtApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `TypeExtensionNode`
 *
 * @category API Public
 */
export type TypeExtensionApi = EnumExtApi | InputExtApi | InterfaceExtApi | ObjectExtApi | ScalarExtApi | UnionExtApi
