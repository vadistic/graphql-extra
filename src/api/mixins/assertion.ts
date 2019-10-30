import { TypeDefinitionNode, KindEnum, Kind, TypeExtensionNode } from 'graphql'
import {
  EnumTypeApi,
  InputTypeApi,
  InterfaceTypeApi,
  ObjectTypeApi,
  ScalarTypeApi,
  UnionTypeApi,
  EnumExtApi,
  InputExtApi,
  InterfaceExtApi,
  ObjectExtApi,
  ScalarExtApi,
  UnionExtApi,
} from '../apis'

/**
 * @category API Mixins
 */
export interface TypeDefinitionAssertionMixinApi {
  // guards
  isEnumType(): this is EnumTypeApi
  isInputType(): this is InputTypeApi
  isInterfaceType(): this is InterfaceTypeApi
  isObjectType(): this is ObjectTypeApi
  isScalarType(): this is ScalarTypeApi
  isUnionType(): this is UnionTypeApi

  assertEnumType(): EnumTypeApi
  assertInputType(): InputTypeApi
  assertInterfaceType(): InterfaceTypeApi
  assertObjectType(): ObjectTypeApi
  assertScalarType(): ScalarTypeApi
  assertUnionType(): UnionTypeApi
}

/**
 * @category API Mixins
 */
export function typeDefinitionAssertionApiMixin(
  node: TypeDefinitionNode,
): TypeDefinitionAssertionMixinApi {
  const assertionErr = (kind: KindEnum) =>
    Error(`asserted type '${kind}', but node ${node.name.value} is '${node.kind}'`)

  return {
    isEnumType() {
      return node.kind === Kind.ENUM_TYPE_DEFINITION
    },

    isInputType() {
      return node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
    },

    isInterfaceType() {
      return node.kind === Kind.INTERFACE_TYPE_DEFINITION
    },

    isObjectType() {
      return node.kind === Kind.OBJECT_TYPE_DEFINITION
    },

    isScalarType() {
      return node.kind === Kind.SCALAR_TYPE_DEFINITION
    },

    isUnionType() {
      return node.kind === Kind.UNION_TYPE_DEFINITION
    },

    assertEnumType() {
      if (!this.isEnumType()) {
        throw assertionErr(Kind.ENUM_TYPE_DEFINITION)
      }

      return this as any
    },

    assertInputType() {
      if (!this.isInputType()) {
        throw assertionErr(Kind.INPUT_OBJECT_TYPE_DEFINITION)
      }

      return this as any
    },

    assertInterfaceType() {
      if (!this.isInterfaceType()) {
        throw assertionErr(Kind.INTERFACE_TYPE_DEFINITION)
      }

      return this as any
    },

    assertObjectType() {
      if (!this.isObjectType()) {
        throw assertionErr(Kind.OBJECT_TYPE_DEFINITION)
      }

      return this as any
    },

    assertScalarType() {
      if (!this.isScalarType()) {
        throw assertionErr(Kind.SCALAR_TYPE_DEFINITION)
      }

      return this as any
    },

    assertUnionType() {
      if (!this.isUnionType()) {
        throw assertionErr(Kind.UNION_TYPE_DEFINITION)
      }

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export interface TypeExtensionAssertionMixinApi {
  // guards
  isEnumExt(): this is EnumExtApi
  isInputExt(): this is InputExtApi
  isInterfaceExt(): this is InterfaceExtApi
  isObjectExt(): this is ObjectExtApi
  isScalarExt(): this is ScalarExtApi
  isUnionExt(): this is UnionExtApi

  assertEnumExt(): EnumExtApi
  assertInputExt(): InputExtApi
  assertInterfaceExt(): InterfaceExtApi
  assertObjectExt(): ObjectExtApi
  assertScalarExt(): ScalarExtApi
  assertUnionExt(): UnionExtApi
}

/**
 * @category API Mixins
 */
export function typeExtensionAssertionApiMixin(
  node: TypeExtensionNode,
): TypeExtensionAssertionMixinApi {
  const assertionErr = (kind: KindEnum) =>
    Error(`asserted type '${kind}', but node ${node.name.value} is '${node.kind}'`)

  return {
    isEnumExt() {
      return node.kind === Kind.ENUM_TYPE_EXTENSION
    },

    isInputExt() {
      return node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
    },

    isInterfaceExt() {
      return node.kind === Kind.INTERFACE_TYPE_EXTENSION
    },

    isObjectExt() {
      return node.kind === Kind.OBJECT_TYPE_EXTENSION
    },

    isScalarExt() {
      return node.kind === Kind.SCALAR_TYPE_EXTENSION
    },

    isUnionExt() {
      return node.kind === Kind.UNION_TYPE_EXTENSION
    },

    assertEnumExt() {
      if (!this.isEnumExt()) {
        throw assertionErr(Kind.ENUM_TYPE_EXTENSION)
      }

      return this as any
    },

    assertInputExt() {
      if (!this.isInputExt()) {
        throw assertionErr(Kind.INPUT_OBJECT_TYPE_EXTENSION)
      }

      return this as any
    },

    assertInterfaceExt() {
      if (!this.isInterfaceExt()) {
        throw assertionErr(Kind.INTERFACE_TYPE_EXTENSION)
      }

      return this as any
    },

    assertObjectExt() {
      if (!this.isObjectExt()) {
        throw assertionErr(Kind.OBJECT_TYPE_EXTENSION)
      }

      return this as any
    },

    assertScalarExt() {
      if (!this.isScalarExt()) {
        throw assertionErr(Kind.SCALAR_TYPE_EXTENSION)
      }

      return this as any
    },

    assertUnionExt() {
      if (!this.isUnionExt()) {
        throw assertionErr(Kind.UNION_TYPE_EXTENSION)
      }

      return this as any
    },
  }
}
