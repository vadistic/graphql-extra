import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const VariableApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.KindAssertionMixin, {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `VariableNode`
 *
 * @category API Public
 */
export declare class VariableApi extends VariableApi_base {
    readonly node: GQL.VariableNode;
    constructor(node: GQL.VariableNode);
}
/**
 * `VariableApi` constructor fn
 *
 * @category API Public
 */
export declare function variableApi(node: GQL.VariableNode): VariableApi;
export {};
