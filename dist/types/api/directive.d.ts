import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const DirectiveApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.ArgumentsMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.ArgumentsMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `DirectiveNode`
 *
 * @category API Public
 */
export declare class DirectiveApi extends DirectiveApi_base {
    readonly node: GQL.DirectiveNode;
    constructor(node: GQL.DirectiveNode);
}
/**
 * `DirectiveApi` constructor fn
 *
 * @category API Public
 */
export declare function directiveApi(node: GQL.DirectiveNode): DirectiveApi;
export {};
