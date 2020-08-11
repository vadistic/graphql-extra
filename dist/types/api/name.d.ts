import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const NameApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.KindAssertionMixin, {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `NameNode`
 *
 * @category API Public
 */
export declare class NameApi extends NameApi_base {
    readonly node: GQL.NameNode;
    constructor(node: GQL.NameNode);
}
/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export declare function nameApi(node: GQL.NameNode): NameApi;
export {};
