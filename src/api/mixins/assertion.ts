import type { TypeDefinitionNode, KindEnum, TypeExtensionNode } from 'graphql'
import { Kind } from 'graphql'

import type {
  EnumTypeApi,
  InputTypeApi,
  InterfaceTypeApi,
  ObjectTypeApi,
  ScalarTypeApi,
  UnionTypeApi,
} from '../apis/type-definition'
import type {
  EnumExtApi,
  InputExtApi,
  InterfaceExtApi,
  ObjectExtApi,
  ScalarExtApi,
  UnionExtApi,
} from '../apis/type-extension'

/**
 * @category API Mixins
 */
export class TypeDefinitionAssertionApiMixin {
  constructor(readonly node: TypeDefinitionNode) {}

  private readonly assertionErr = (kind: KindEnum) =>
    Error(`asserted type '${kind}', but node ${this.node.name.value} is '${this.node.kind}'`)

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
    if (!this.isEnumType()) {
      throw this.assertionErr(Kind.ENUM_TYPE_DEFINITION)
    }

    return this
  }

  assertInputType(): InputTypeApi {
    if (!this.isInputType()) {
      throw this.assertionErr(Kind.INPUT_OBJECT_TYPE_DEFINITION)
    }

    return this
  }

  assertInterfaceType(): InterfaceTypeApi {
    if (!this.isInterfaceType()) {
      throw this.assertionErr(Kind.INTERFACE_TYPE_DEFINITION)
    }

    return this
  }

  assertObjectType(): ObjectTypeApi {
    if (!this.isObjectType()) {
      throw this.assertionErr(Kind.OBJECT_TYPE_DEFINITION)
    }

    return this
  }

  assertScalarType(): ScalarTypeApi {
    if (!this.isScalarType()) {
      throw this.assertionErr(Kind.SCALAR_TYPE_DEFINITION)
    }

    return this
  }

  assertUnionType(): UnionTypeApi {
    if (!this.isUnionType()) {
      throw this.assertionErr(Kind.UNION_TYPE_DEFINITION)
    }

    return this
  }
}

/**
 * @category API Mixins
 */
export function typeDefinitionAssertionApiMixin(
  node: TypeDefinitionNode,
): TypeDefinitionAssertionApiMixin {
  return new TypeDefinitionAssertionApiMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export class TypeExtensionAssertionApiMixin {
  constructor(readonly node: TypeExtensionNode) {}

  private readonly assertionErr = (kind: KindEnum) =>
    Error(`asserted type '${kind}', but node ${this.node.name.value} is '${this.node.kind}'`)

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

  assertEnumExt(): EnumExtApi {
    if (!this.isEnumExt()) {
      throw this.assertionErr(Kind.ENUM_TYPE_EXTENSION)
    }

    return this
  }

  assertInputExt(): InputExtApi {
    if (!this.isInputExt()) {
      throw this.assertionErr(Kind.INPUT_OBJECT_TYPE_EXTENSION)
    }

    return this
  }

  assertInterfaceExt(): InterfaceExtApi {
    if (!this.isInterfaceExt()) {
      throw this.assertionErr(Kind.INTERFACE_TYPE_EXTENSION)
    }

    return this
  }

  assertObjectExt(): ObjectExtApi {
    if (!this.isObjectExt()) {
      throw this.assertionErr(Kind.OBJECT_TYPE_EXTENSION)
    }

    return this
  }

  assertScalarExt(): ScalarExtApi {
    if (!this.isScalarExt()) {
      throw this.assertionErr(Kind.SCALAR_TYPE_EXTENSION)
    }

    return this
  }

  assertUnionExt(): UnionExtApi {
    if (!this.isUnionExt()) {
      throw this.assertionErr(Kind.UNION_TYPE_EXTENSION)
    }

    return this
  }
}

/**
 * @category API Mixins
 */
export function typeExtensionAssertionApiMixin(
  node: TypeExtensionNode,
): TypeExtensionAssertionApiMixin {
  return new TypeExtensionAssertionApiMixin(node)
}
