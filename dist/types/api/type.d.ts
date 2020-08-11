import type * as GQL from 'graphql';
import { Ast, Mixin } from '../internal';
import { Typename } from '../types';
declare const TypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.KindAssertionMixin, {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `TypeNode`
 *
 * @category API Public
 */
export declare class TypeApi extends TypeApi_base {
    readonly node: GQL.TypeNode;
    constructor(node: GQL.TypeNode);
    getNamedType(): GQL.NamedTypeNode;
    getTypename(): Typename;
    setTypename(value: Typename): this;
    setType(props: Ast.TypeNodeProps | GQL.TypeNode): this;
    isNonNull(deep?: boolean): boolean;
    isList(deep?: boolean): boolean;
    setNonNull(value?: boolean): this;
    setList(value?: boolean): this;
    private _getNamedType;
    private _isNonNullDeep;
    private _isListDeep;
}
/**
 * `TypeApi` constructor fn
 *
 * @category API Public
 */
export declare function typeApi(node: GQL.TypeNode): TypeApi;
declare const NamedTypeApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.KindAssertionMixin, {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `NamedTypeNode`
 *
 * @category API Public
 */
export declare class NamedTypeApi extends NamedTypeApi_base {
    readonly node: GQL.NamedTypeNode;
    constructor(node: GQL.NamedTypeNode);
    getTypename(): Typename;
    setTypename(value: Typename): this;
}
/**
 * `NamedTypeApi` constructor fn
 *
 * @category API Public
 */
export declare function namedTypeApi(node: GQL.NamedTypeNode): NamedTypeApi;
export {};
