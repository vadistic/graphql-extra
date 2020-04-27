import type * as GQL from 'graphql'
import { Kind } from 'graphql'

import type { Api } from '../internal'
import { assertionError } from '../utils'

/**
 * @category API Mixins
 */
export class TypeDefinitionAssertionApiMixin {
  constructor(readonly node: GQL.TypeDefinitionNode) {}

  isEnumType(): this is Api.EnumTypeApi {
    return this.node.kind === Kind.ENUM_TYPE_DEFINITION
  }

  isInputType(): this is Api.InputTypeApi {
    return this.node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
  }

  isInterfaceType(): this is Api.InterfaceTypeApi {
    return this.node.kind === Kind.INTERFACE_TYPE_DEFINITION
  }

  isObjectType(): this is Api.ObjectTypeApi {
    return this.node.kind === Kind.OBJECT_TYPE_DEFINITION
  }

  isScalarType(): this is Api.ScalarTypeApi {
    return this.node.kind === Kind.SCALAR_TYPE_DEFINITION
  }

  isUnionType(): this is Api.UnionTypeApi {
    return this.node.kind === Kind.UNION_TYPE_DEFINITION
  }

  assertEnumType(): Api.EnumTypeApi {
    if (this.isEnumType()) return this

    throw assertionError(Kind.ENUM_TYPE_DEFINITION, this.node)
  }

  assertInputType(): Api.InputTypeApi {
    if (this.isInputType()) return this

    throw assertionError(Kind.INPUT_OBJECT_TYPE_DEFINITION, this.node)
  }

  assertInterfaceType(): Api.InterfaceTypeApi {
    if (this.isInterfaceType()) return this

    throw assertionError(Kind.INTERFACE_TYPE_DEFINITION, this.node)
  }

  assertObjectType(): Api.ObjectTypeApi {
    if (this.isObjectType()) return this

    throw assertionError(Kind.OBJECT_TYPE_DEFINITION, this.node)
  }

  assertScalarType(): Api.ScalarTypeApi {
    if (this.isScalarType()) return this

    throw assertionError(Kind.SCALAR_TYPE_DEFINITION, this.node)
  }

  assertUnionType(): Api.UnionTypeApi {
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

  isEnumExt(): this is Api.EnumExtApi {
    return this.node.kind === Kind.ENUM_TYPE_EXTENSION
  }

  isInputExt(): this is Api.InputExtApi {
    return this.node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
  }

  isInterfaceExt(): this is Api.InterfaceExtApi {
    return this.node.kind === Kind.INTERFACE_TYPE_EXTENSION
  }

  isObjectExt(): this is Api.ObjectExtApi {
    return this.node.kind === Kind.OBJECT_TYPE_EXTENSION
  }

  isScalarExt(): this is Api.ScalarExtApi {
    return this.node.kind === Kind.SCALAR_TYPE_EXTENSION
  }

  isUnionExt(): this is Api.UnionExtApi {
    return this.node.kind === Kind.UNION_TYPE_EXTENSION
  }

  // ────────────────────────────────────────────────────────────────────────────────

  assertEnumExt(): Api.EnumExtApi {
    if (this.isEnumExt()) return this

    throw assertionError(Kind.ENUM_TYPE_EXTENSION, this.node)
  }

  assertInputExt(): Api.InputExtApi {
    if (this.isInputExt()) return this

    throw assertionError(Kind.INPUT_OBJECT_TYPE_EXTENSION, this.node)
  }

  assertInterfaceExt(): Api.InterfaceExtApi {
    if (this.isInterfaceExt()) return this

    throw assertionError(Kind.INTERFACE_TYPE_EXTENSION, this.node)
  }

  assertObjectExt(): Api.ObjectExtApi {
    if (this.isObjectExt()) return this

    throw assertionError(Kind.OBJECT_TYPE_EXTENSION, this.node)
  }

  assertScalarExt(): Api.ScalarExtApi {
    if (this.isScalarExt()) return this

    throw assertionError(Kind.SCALAR_TYPE_EXTENSION, this.node)
  }

  assertUnionExt(): Api.UnionExtApi {
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
