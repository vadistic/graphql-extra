import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const ObjectTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.FieldDefinitionsMixin & Mixin.InterfacesMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.FieldDefinitionsMixin;
} & {
    prototype: Mixin.InterfacesMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `ObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class ObjectTypeApi extends ObjectTypeApi_base {
    readonly node: GQL.ObjectTypeDefinitionNode;
    constructor(node: GQL.ObjectTypeDefinitionNode);
}
/**
 * `ObjectTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function objectTypeApi(node: GQL.ObjectTypeDefinitionNode): ObjectTypeApi;
declare const InterfaceTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.FieldDefinitionsMixin & Mixin.InterfacesMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.FieldDefinitionsMixin;
} & {
    prototype: Mixin.InterfacesMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `InterfaceTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class InterfaceTypeApi extends InterfaceTypeApi_base {
    readonly node: GQL.InterfaceTypeDefinitionNode;
    constructor(node: GQL.InterfaceTypeDefinitionNode);
}
/**
 * `InterfaceTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function interfaceTypeApi(node: GQL.InterfaceTypeDefinitionNode): InterfaceTypeApi;
declare const UnionTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.UnionTypesMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.UnionTypesMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `UnionTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class UnionTypeApi extends UnionTypeApi_base {
    readonly node: GQL.UnionTypeDefinitionNode;
    constructor(node: GQL.UnionTypeDefinitionNode);
}
/**
 * `UnionTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function unionTypeApi(node: GQL.UnionTypeDefinitionNode): UnionTypeApi;
declare const ScalarTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `ScalarTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class ScalarTypeApi extends ScalarTypeApi_base {
    readonly node: GQL.ScalarTypeDefinitionNode;
    constructor(node: GQL.ScalarTypeDefinitionNode);
}
/**
 * `ScalarTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function scalarTypeApi(node: GQL.ScalarTypeDefinitionNode): ScalarTypeApi;
declare const EnumTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.EnumValueDefinitionMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.EnumValueDefinitionMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `EnumTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class EnumTypeApi extends EnumTypeApi_base {
    readonly node: GQL.EnumTypeDefinitionNode;
    constructor(node: GQL.EnumTypeDefinitionNode);
}
/**
 * `EnumTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function enumTypeApi(node: GQL.EnumTypeDefinitionNode): EnumTypeApi;
declare const InputTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.InputValuesAsFieldsMixin & Mixin.TypeDefinitionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.InputValuesAsFieldsMixin;
} & {
    prototype: Mixin.TypeDefinitionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `InputObjectTypeDefinitionNode`
 *
 * @category API Public
 */
export declare class InputTypeApi extends InputTypeApi_base {
    readonly node: GQL.InputObjectTypeDefinitionNode;
    constructor(node: GQL.InputObjectTypeDefinitionNode);
}
/**
 * `InputTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function inputTypeApi(node: GQL.InputObjectTypeDefinitionNode): InputTypeApi;
/**
 * API for GraphQL `TypeDefinitionNode`
 *
 * @category API Public
 */
export declare type TypeDefinitonApi = EnumTypeApi | InputTypeApi | InterfaceTypeApi | ObjectTypeApi | ScalarTypeApi | UnionTypeApi;
export {};
