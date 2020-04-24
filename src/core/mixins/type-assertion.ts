import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import type {
  EnumTypeApi,
  InputTypeApi,
  InterfaceTypeApi,
  ObjectTypeApi,
  ScalarTypeApi,
  UnionTypeApi,
} from '../api/type-definition'
import type {
  EnumExtApi,
  InputExtApi,
  InterfaceExtApi,
  ObjectExtApi,
  ScalarExtApi,
  UnionExtApi,
} from '../api/type-extension'
import { assertionError } from '../errors'

/**
 * @category API Mixins
 */
export class TypeDefinitionAssertionApiMixin {
  constructor(readonly node: GQL.TypeDefinitionNode) {}

  isEnumType(): this is EnumTypeApi {
    return this.node.kind === Kind.ENUM_TYPE_DEFINITION
  }

  isInputType(): this is InputTypeApi {
    return this.node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
  }

  isInterfaceType(): this is InterfaceTypeApi {
    return this.node.kind === Kind.INTERFACE_TYPE_DEFINITION
  }

  isObjectType(): this is ObjectTypeApi {
    return this.node.kind === Kind.OBJECT_TYPE_DEFINITION
  }

  isScalarType(): this is ScalarTypeApi {
    return this.node.kind === Kind.SCALAR_TYPE_DEFINITION
  }

  isUnionType(): this is UnionTypeApi {
    return this.node.kind === Kind.UNION_TYPE_DEFINITION
  }

  assertEnumType(): EnumTypeApi {
    if (this.isEnumType()) return this

    throw assertionError(Kind.ENUM_TYPE_DEFINITION, this.node)
  }

  assertInputType(): InputTypeApi {
    if (this.isInputType()) return this

    throw assertionError(Kind.INPUT_OBJECT_TYPE_DEFINITION, this.node)
  }

  assertInterfaceType(): InterfaceTypeApi {
    if (this.isInterfaceType()) return this

    throw assertionError(Kind.INTERFACE_TYPE_DEFINITION, this.node)
  }

  assertObjectType(): ObjectTypeApi {
    if (this.isObjectType()) return this

    throw assertionError(Kind.OBJECT_TYPE_DEFINITION, this.node)
  }

  assertScalarType(): ScalarTypeApi {
    if (this.isScalarType()) return this

    throw assertionError(Kind.SCALAR_TYPE_DEFINITION, this.node)
  }

  assertUnionType(): UnionTypeApi {
    if (this.isUnionType()) return this

    throw assertionError(Kind.UNION_TYPE_DEFINITION, this.node)
  }
}

/**
 * @category API Mixins
 */
export function typeDefinitionAssertionApiMixin(
  node: GQL.TypeDefinitionNode,
): TypeDefinitionAssertionApiMixin {
  return new TypeDefinitionAssertionApiMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export class TypeExtensionAssertionApiMixin {
  constructor(readonly node: GQL.TypeExtensionNode) {}

  isEnumExt(): this is EnumExtApi {
    return this.node.kind === Kind.ENUM_TYPE_EXTENSION
  }

  isInputExt(): this is InputExtApi {
    return this.node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
  }

  isInterfaceExt(): this is InterfaceExtApi {
    return this.node.kind === Kind.INTERFACE_TYPE_EXTENSION
  }

  isObjectExt(): this is ObjectExtApi {
    return this.node.kind === Kind.OBJECT_TYPE_EXTENSION
  }

  isScalarExt(): this is ScalarExtApi {
    return this.node.kind === Kind.SCALAR_TYPE_EXTENSION
  }

  isUnionExt(): this is UnionExtApi {
    return this.node.kind === Kind.UNION_TYPE_EXTENSION
  }

  // ────────────────────────────────────────────────────────────────────────────────

  assertEnumExt(): EnumExtApi {
    if (this.isEnumExt()) return this

    throw assertionError(Kind.ENUM_TYPE_EXTENSION, this.node)
  }

  assertInputExt(): InputExtApi {
    if (this.isInputExt()) return this

    throw assertionError(Kind.INPUT_OBJECT_TYPE_EXTENSION, this.node)
  }

  assertInterfaceExt(): InterfaceExtApi {
    if (this.isInterfaceExt()) return this

    throw assertionError(Kind.INTERFACE_TYPE_EXTENSION, this.node)
  }

  assertObjectExt(): ObjectExtApi {
    if (this.isObjectExt()) return this

    throw assertionError(Kind.OBJECT_TYPE_EXTENSION, this.node)
  }

  assertScalarExt(): ScalarExtApi {
    if (this.isScalarExt()) return this

    throw assertionError(Kind.SCALAR_TYPE_EXTENSION, this.node)
  }

  assertUnionExt(): UnionExtApi {
    if (this.isUnionExt()) return this

    throw assertionError(Kind.UNION_TYPE_EXTENSION, this.node)
  }
}

/**
 * @category API Mixins
 */
export function typeExtensionAssertionApiMixin(
  node: GQL.TypeExtensionNode,
): TypeExtensionAssertionApiMixin {
  return new TypeExtensionAssertionApiMixin(node)
}
