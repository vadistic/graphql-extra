import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Hooks, Mixin } from '../internal'
import { validateNodeKind } from '../utils'

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
 * API for GraphQL `ObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export class ObjectTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.ObjectTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.OBJECT_TYPE_DEFINITION, node)
  }

  // export interface ObjectTypeDefinitionNode {
  //   readonly kind: 'ObjectTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly interfaces = Hooks.interfacesMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly fields = Hooks.fieldDefinitionsMixin(this.node)
}

/**
 * `ObjectTypeApi` constructor fn
 *
 * @category API Public
 */
export function objectTypeApi(node: GQL.ObjectTypeDefinitionNode): ObjectTypeApi {
  return new ObjectTypeApi(node)
}


/**
 * API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class ObjectExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.ObjectTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.OBJECT_TYPE_EXTENSION, node)
  }

  // export interface ObjectTypeExtensionNode {
  //   readonly kind: 'ObjectTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly interfaces = Hooks.interfacesMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly fields = Hooks.fieldDefinitionsMixin(this.node)
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
 * API for GraphQL `InterfaceTypeDefinitionNode`
 *
 * @category API Public
 */
export class InterfaceTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InterfaceTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.INTERFACE_TYPE_DEFINITION, node)
  }

  // export interface InterfaceTypeDefinitionNode {
  //   readonly kind: 'InterfaceTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly interfaces = Hooks.interfacesMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly field = Hooks.fieldDefinitionsMixin(this.node)
}

/**
 * `InterfaceTypeApi` constructor fn
 *
 * @category API Public
 */
export function interfaceTypeApi(node: GQL.InterfaceTypeDefinitionNode): InterfaceTypeApi {
  return new InterfaceTypeApi(node)
}


/**
 * API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export class InterfaceExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InterfaceTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.INTERFACE_TYPE_EXTENSION, node)
  }

  // export interface InterfaceTypeExtensionNode {
  //   readonly kind: 'InterfaceTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly interfaces?: ReadonlyArray<NamedTypeNode>;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<FieldDefinitionNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly interfaces = Hooks.interfacesMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly field = Hooks.fieldDefinitionsMixin(this.node)
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
 * API for GraphQL `UnionTypeDefinitionNode`
 *
 * @category API Public
 */
export class UnionTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.UnionTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.UNION_TYPE_DEFINITION, node)
  }

  // export interface UnionTypeDefinitionNode {
  //   readonly kind: 'UnionTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly types?: ReadonlyArray<NamedTypeNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly types = Hooks.unionTypesMixin(this.node)
}

/**
 * `UnionTypeApi` constructor fn
 *
 * @category API Public
 */
export function unionTypeApi(node: GQL.UnionTypeDefinitionNode): UnionTypeApi {
  return new UnionTypeApi(node)
}


/**
 * API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export class UnionExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.UnionTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.UNION_TYPE_EXTENSION, node)
  }

  // export interface UnionTypeExtensionNode {
  //   readonly kind: 'UnionTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly types?: ReadonlyArray<NamedTypeNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly types = Hooks.unionTypesMixin(this.node)
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
 * API for GraphQL `ScalarTypeDefinitionNode`
 *
 * @category API Public
 */
export class ScalarTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.ScalarTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.SCALAR_TYPE_DEFINITION, node)
  }

  // export interface ScalarTypeDefinitionNode {
  //   readonly kind: 'ScalarTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)
}

/**
 * `ScalarTypeApi` constructor fn
 *
 * @category API Public
 */
export function scalarTypeApi(node: GQL.ScalarTypeDefinitionNode): ScalarTypeApi {
  return new ScalarTypeApi(node)
}


/**
 * API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export class ScalarExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.ScalarTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.SCALAR_TYPE_EXTENSION, node)
  }

  // export interface ScalarTypeExtensionNode {
  //   readonly kind: 'ScalarTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)
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
 * API for GraphQL `EnumTypeDefinitionNode`
 *
 * @category API Public
 */
export class EnumTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.EnumTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.ENUM_TYPE_DEFINITION, node)
  }

  // export interface EnumTypeDefinitionNode {
  //   readonly kind: 'EnumTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly values = Hooks.enumValuesDefinitionsMixin(this.node)
}

/**
 * `EnumTypeApi` constructor fn
 *
 * @category API Public
 */
export function enumTypeApi(node: GQL.EnumTypeDefinitionNode): EnumTypeApi {
  return new EnumTypeApi(node)
}


/**
 * API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export class EnumExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.EnumTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.ENUM_TYPE_EXTENSION, node)
  }

  // export interface EnumTypeExtensionNode {
  //   readonly kind: 'EnumTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly values?: ReadonlyArray<EnumValueDefinitionNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly values = Hooks.enumValuesDefinitionsMixin(this.node)
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
 * API for GraphQL `InputObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export class InputTypeApi extends Mix(
  Mixin.TypeDefinitionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InputObjectTypeDefinitionNode) {
    super([node], [node])

    validateNodeKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, node)
  }

  // export interface InputObjectTypeDefinitionNode {
  //   readonly kind: 'InputObjectTypeDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
  // }

  readonly description = Hooks.descriptionMixin(this.node)

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly field = Hooks.inputValuesAsFieldsMixin(this.node)
}

/**
 * `InputTypeApi` constructor fn
 *
 * @category API Public
 */
export function inputTypeApi(node: GQL.InputObjectTypeDefinitionNode): InputTypeApi {
  return new InputTypeApi(node)
}


/**
 * API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export class InputExtApi extends Mix(
  Mixin.TypeExtensionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InputObjectTypeExtensionNode) {
    super([node], [node])

    validateNodeKind(Kind.INPUT_OBJECT_TYPE_EXTENSION, node)
  }

  // export interface InputObjectTypeExtensionNode {
  //   readonly kind: 'InputObjectTypeExtension';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly fields?: ReadonlyArray<InputValueDefinitionNode>;
  // }

  readonly name = Hooks.nameMixin(this.node)

  readonly directives = Hooks.directivesMixin(this.node)

  readonly field = Hooks.inputValuesAsFieldsMixin(this.node)
}

/**
 * `InputExtApi` constructor fn
 *
 * @category API Public
 */
export function inputExtApi(node: GQL.InputObjectTypeExtensionNode): InputExtApi {
  return new InputExtApi(node)
}
