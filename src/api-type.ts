import {
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  TypeDefinitionNode,
  Kind,
  UnionTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  EnumTypeDefinitionNode,
  KindEnum,
} from 'graphql'
import {
  FieldsApiMixin,
  fieldsApiMixin,
  DescriptionApiMixin,
  descriptionApiMixin,
  NameApiMixin,
  nameApiMixin,
} from './api-mixins'

export type TypeDefinitonApi =
  | ObjectTypeApi
  | InterfaceTypeApi
  | UnionTypeApi
  | ScalarTypeApi
  | EnumTypeApi

// ────────────────────────────────────────────────────────────────────────────────

export interface TypeDefinitionMixinApi<This>
  extends NameApiMixin<This>,
    DescriptionApiMixin<This> {
  // guards
  isEnumType(): this is EnumTypeApi
  isInterfaceType(): this is InterfaceTypeApi
  isObjectType(): this is ObjectTypeApi
  isScalarType(): this is ScalarTypeApi
  isUnionType(): this is UnionTypeApi

  assertEnumType(): EnumTypeApi
  assertInterfaceType(): InterfaceTypeApi
  assertObjectType(): ObjectTypeApi
  assertScalarType(): ScalarTypeApi
  assertUnionType(): UnionTypeApi
}

export function typeDefinitionApiMixin<This>(
  node: TypeDefinitionNode,
): TypeDefinitionMixinApi<This> {
  const _assertionMsg = (fnName: string, kind: KindEnum) =>
    `${fnName}: asserted type '${kind}', but node ${node.name.value} is '${node.kind}'`

  return {
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),

    isObjectType() {
      return node.kind === Kind.OBJECT_TYPE_DEFINITION
    },

    isInterfaceType() {
      return node.kind === Kind.INTERFACE_TYPE_DEFINITION
    },

    isScalarType() {
      return node.kind === Kind.SCALAR_TYPE_DEFINITION
    },

    isUnionType() {
      return node.kind === Kind.UNION_TYPE_DEFINITION
    },

    isEnumType() {
      return node.kind === Kind.ENUM_TYPE_DEFINITION
    },

    assertEnumType() {
      if (!this.isEnumType()) {
        throw Error(_assertionMsg(this.assertEnumType.name, Kind.ENUM_TYPE_DEFINITION))
      }

      return this as any
    },

    assertInterfaceType() {
      if (!this.isInterfaceType()) {
        throw Error(_assertionMsg(this.assertInterfaceType.name, Kind.INTERFACE_TYPE_DEFINITION))
      }

      return this as any
    },

    assertObjectType() {
      if (!this.isObjectType()) {
        throw Error(_assertionMsg(this.assertObjectType.name, Kind.OBJECT_TYPE_DEFINITION))
      }

      return this as any
    },

    assertScalarType() {
      if (!this.isScalarType()) {
        throw Error(_assertionMsg(this.assertScalarType.name, Kind.SCALAR_TYPE_DEFINITION))
      }

      return this as any
    },

    assertUnionType() {
      if (!this.isUnionType()) {
        throw Error(_assertionMsg(this.assertUnionType.name, Kind.UNION_TYPE_DEFINITION))
      }

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ObjectTypeApi
  extends TypeDefinitionMixinApi<ObjectTypeApi>,
    FieldsApiMixin<ObjectTypeApi> {
  node: ObjectTypeDefinitionNode
}

export function objectTypeApi(node: ObjectTypeDefinitionNode): ObjectTypeApi {
  return {
    node,

    ...typeDefinitionApiMixin(node),
    ...fieldsApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InterfaceTypeApi
  extends TypeDefinitionMixinApi<ObjectTypeApi>,
    FieldsApiMixin<ObjectTypeApi> {
  node: InterfaceTypeDefinitionNode
}

export function interfaceTypeApi(node: InterfaceTypeDefinitionNode): InterfaceTypeApi {
  return {
    node,

    ...typeDefinitionApiMixin(node),
    ...fieldsApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface UnionTypeApi extends TypeDefinitionMixinApi<UnionTypeApi> {
  node: UnionTypeDefinitionNode
}

export function unionTypeApi(node: UnionTypeDefinitionNode): UnionTypeApi {
  return {
    node,

    ...typeDefinitionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ScalarTypeApi extends TypeDefinitionMixinApi<ScalarTypeApi> {
  node: ScalarTypeDefinitionNode
}

export function scalarTypeApi(node: ScalarTypeDefinitionNode): ScalarTypeApi {
  return {
    node,

    ...typeDefinitionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface EnumTypeApi extends TypeDefinitionMixinApi<EnumTypeApi> {
  node: EnumTypeDefinitionNode
}

export function enumTypeApi(node: EnumTypeDefinitionNode): EnumTypeApi {
  return {
    node,

    ...typeDefinitionApiMixin(node),
  }
}
