import type * as GQL from 'graphql';
import { Api, Mixin } from '../internal';
declare const ArgumentApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `ArgumentNode`
 *
 * @category API Public
 */
export declare class ArgumentApi extends ArgumentApi_base {
    readonly node: GQL.ArgumentNode;
    constructor(node: GQL.ArgumentNode);
    getValue(): GQL.ValueNode;
    setValue(value: GQL.ValueNode): this;
}
/**
 * `ArgumentApi` constructor fn
 *
 * @category API Public
 */
export declare function argumentApi(node: GQL.ArgumentNode): Api.ArgumentApi;
export {};
