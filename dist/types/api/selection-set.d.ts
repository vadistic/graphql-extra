import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const SelectionSetApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.SelectionSetMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.SelectionSetMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */
export declare class SelectionSetApi extends SelectionSetApi_base {
    readonly node: GQL.SelectionSetNode;
    constructor(node: GQL.SelectionSetNode);
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export declare function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi;
export {};
