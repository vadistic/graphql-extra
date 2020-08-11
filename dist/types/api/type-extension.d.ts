import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const ObjectExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.FieldDefinitionsMixin & Mixin.InterfacesMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.FieldDefinitionsMixin;
} & {
    prototype: Mixin.InterfacesMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `ObjectTypeExtensionNode`
 *
 * @category API Public
 */
export declare class ObjectExtApi extends ObjectExtApi_base {
    readonly node: GQL.ObjectTypeExtensionNode;
    constructor(node: GQL.ObjectTypeExtensionNode);
}
/**
 * `ObjectExtApi` constructor fn
 *
 * @category API Public
 */
export declare function objectExtApi(node: GQL.ObjectTypeExtensionNode): ObjectExtApi;
declare const InterfaceExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.FieldDefinitionsMixin & Mixin.InterfacesMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.FieldDefinitionsMixin;
} & {
    prototype: Mixin.InterfacesMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `InterfaceTypeExtensionNode`
 *
 * @category API Public
 */
export declare class InterfaceExtApi extends InterfaceExtApi_base {
    readonly node: GQL.InterfaceTypeExtensionNode;
    constructor(node: GQL.InterfaceTypeExtensionNode);
}
/**
 * `InterfaceExtApi` constructor fn
 *
 * @category API Public
 */
export declare function interfaceExtApi(node: GQL.InterfaceTypeExtensionNode): InterfaceExtApi;
declare const UnionExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.UnionTypesMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.UnionTypesMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `UnionTypeExtensionNode`
 *
 * @category API Public
 */
export declare class UnionExtApi extends UnionExtApi_base {
    readonly node: GQL.UnionTypeExtensionNode;
    constructor(node: GQL.UnionTypeExtensionNode);
}
/**
 * `UnionExtApi` constructor fn
 *
 * @category API Public
 */
export declare function unionExtApi(node: GQL.UnionTypeExtensionNode): UnionExtApi;
declare const ScalarExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `ScalarTypeExtensionNode`
 *
 * @category API Public
 */
export declare class ScalarExtApi extends ScalarExtApi_base {
    readonly node: GQL.ScalarTypeExtensionNode;
    constructor(node: GQL.ScalarTypeExtensionNode);
}
/**
 * `ScalarExtApi` constructor fn
 *
 * @category API Public
 */
export declare function scalarExtApi(node: GQL.ScalarTypeExtensionNode): ScalarExtApi;
declare const EnumExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.EnumValueDefinitionMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.EnumValueDefinitionMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `EnumTypeExtensionNode`
 *
 * @category API Public
 */
export declare class EnumExtApi extends EnumExtApi_base {
    readonly node: GQL.EnumTypeExtensionNode;
    constructor(node: GQL.EnumTypeExtensionNode);
}
/**
 * `EnumExtApi` constructor fn
 *
 * @category API Public
 */
export declare function enumExtApi(node: GQL.EnumTypeExtensionNode): EnumExtApi;
declare const InputExtApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.InputValuesAsFieldsMixin & Mixin.TypeExtensionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.InputValuesAsFieldsMixin;
} & {
    prototype: Mixin.TypeExtensionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `InputObjectTypeExtensionNode`
 *
 * @category API Public
 */
export declare class InputExtApi extends InputExtApi_base {
    readonly node: GQL.InputObjectTypeExtensionNode;
    constructor(node: GQL.InputObjectTypeExtensionNode);
}
/**
 * `InputExtApi` constructor fn
 *
 * @category API Public
 */
export declare function inputExtApi(node: GQL.InputObjectTypeExtensionNode): InputExtApi;
/**
 * API for GraphQL `TypeExtensionNode`
 *
 * @category API Public
 */
export declare type TypeExtensionApi = EnumExtApi | InputExtApi | InterfaceExtApi | ObjectExtApi | ScalarExtApi | UnionExtApi;
export {};
