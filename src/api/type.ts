import {
  DirectiveDefinitionNode,
  DirectiveLocationEnum,
  EnumTypeDefinitionNode,
  InputObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  Kind,
  KindEnum,
  NameNode,
  ObjectTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  TypeDefinitionNode,
  UnionTypeDefinitionNode,
} from 'graphql'
import { getName, applyPropsArr, applyProps, DeepMutable } from '../utils'
import { nameNode } from '../node/ast'
import {
  DescriptionApiMixin,
  descriptionApiMixin,
  DirectivesApiMixin,
  directivesApiMixin,
  FieldDefinitionsApiMixin,
  fieldDefinitionsApiMixin,
  InputValuesAsArgumentsApiMixin,
  inputValuesAsArgumentsApiMixin,
  InputValuesAsFieldsApiMixin,
  inputValuesAsFieldsApiMixin,
  nameApiMixin,
  NameApiMixin,
} from './mixins'

export type TypeDefinitonApi =
  | EnumTypeApi
  | InputObjectTypeApi
  | InterfaceTypeApi
  | ObjectTypeApi
  | ScalarTypeApi
  | UnionTypeApi

// ────────────────────────────────────────────────────────────────────────────────

export interface TypeAssertionMixinApi {
  // guards
  isEnumType(): this is EnumTypeApi
  isInputObjectType(): this is InputObjectTypeApi
  isInterfaceType(): this is InterfaceTypeApi
  isObjectType(): this is ObjectTypeApi
  isScalarType(): this is ScalarTypeApi
  isUnionType(): this is UnionTypeApi

  assertEnumType(): EnumTypeApi
  assertInputObjectType(): InputObjectTypeApi
  assertInterfaceType(): InterfaceTypeApi
  assertObjectType(): ObjectTypeApi
  assertScalarType(): ScalarTypeApi
  assertUnionType(): UnionTypeApi
}

export function typeAssertionApiMixin(node: TypeDefinitionNode): TypeAssertionMixinApi {
  const assertionErr = (kind: KindEnum) =>
    Error(`asserted type '${kind}', but node ${node.name.value} is '${node.kind}'`)

  return {
    isEnumType() {
      return node.kind === Kind.ENUM_TYPE_DEFINITION
    },

    isInputObjectType() {
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

    assertInputObjectType() {
      if (!this.isInputObjectType()) {
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

export interface ObjectTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: ObjectTypeDefinitionNode
}

export function objectTypeApi(node: ObjectTypeDefinitionNode): ObjectTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InterfaceTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    FieldDefinitionsApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: InterfaceTypeDefinitionNode
}

export function interfaceTypeApi(node: InterfaceTypeDefinitionNode): InterfaceTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...fieldDefinitionsApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface UnionTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: UnionTypeDefinitionNode
}

export function unionTypeApi(node: UnionTypeDefinitionNode): UnionTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface ScalarTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: ScalarTypeDefinitionNode
}

export function scalarTypeApi(node: ScalarTypeDefinitionNode): ScalarTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface EnumTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: EnumTypeDefinitionNode
}

export function enumTypeApi(node: EnumTypeDefinitionNode): EnumTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface InputObjectTypeApi
  extends NameApiMixin<ObjectTypeApi>,
    DescriptionApiMixin<ObjectTypeApi>,
    DirectivesApiMixin<ObjectTypeApi>,
    InputValuesAsFieldsApiMixin<ObjectTypeApi>,
    TypeAssertionMixinApi {
  node: InputObjectTypeDefinitionNode
}

export function inputObjectTypeApi(node: InputObjectTypeDefinitionNode): InputObjectTypeApi {
  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...directivesApiMixin(node),
    ...inputValuesAsFieldsApiMixin(node),
    ...typeAssertionApiMixin(node),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export interface DirectiveDefinitionApi
  extends NameApiMixin<DirectiveDefinitionApi>,
    DescriptionApiMixin<DirectiveDefinitionApi>,
    InputValuesAsArgumentsApiMixin<DirectiveDefinitionApi> {
  node: DirectiveDefinitionNode

  isRepeatable(): boolean
  setRepeatable(value: boolean): DirectiveDefinitionApi

  getLocations(): DirectiveLocationEnum[]
  setLocations(values: NameNode[] | DirectiveLocationEnum[]): DirectiveDefinitionApi

  hasLocation(value: NameNode | DirectiveLocationEnum): boolean

  // makes liiitle sense but let's keep convention
  createLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
  upsertLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
  removeLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
}

export function directiveDefinitionApi(node: DirectiveDefinitionNode): DirectiveDefinitionApi {
  const _node = node as DeepMutable<DirectiveDefinitionNode>

  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...inputValuesAsArgumentsApiMixin(node),

    isRepeatable() {
      return node.repeatable
    },

    setRepeatable(value) {
      _node.repeatable = value

      return this as any
    },

    getLocations() {
      return node.locations.map(getName) as DirectiveLocationEnum[]
    },

    setLocations(values) {
      _node.locations = applyPropsArr(nameNode, values) as NameNode[]

      return this as any
    },

    hasLocation(value) {
      const name = getName(value)
      return node.locations.some(loc => loc.value === name)
    },

    createLocation(value) {
      const next = applyProps(nameNode, value)

      if (node.locations.some(loc => loc.value === next.value)) {
        throw Error(`location '${next.value}' on ${node.name.value} already exists`)
      }

      _node.locations.push(next)

      return this as any
    },

    upsertLocation(value) {
      const next = applyProps(nameNode, value)

      const index = node.locations.findIndex(loc => loc.value === next.value)

      if (index !== -1) {
        _node.locations[index] = next
      } else {
        _node.locations.push(next)
      }

      return this as any
    },

    removeLocation(value) {
      const name = getName(value)
      const index = node.locations.findIndex(loc => loc.value === name)

      if (index === -1) {
        throw Error(`location '${name}' on ${node.name.value} does not exist`)
      }

      _node.locations.splice(index, 1)

      return this as any
    },
  }
}
