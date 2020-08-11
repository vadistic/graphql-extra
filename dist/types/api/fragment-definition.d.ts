import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const FragmentDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.SelectionSetMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.SelectionSetMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `FragmentDefinitionNode`
 *
 * @category API Public
 */
export declare class FragmentDefinitionApi extends FragmentDefinitionApi_base {
    readonly node: GQL.FragmentDefinitionNode;
    constructor(node: GQL.FragmentDefinitionNode);
}
/**
 * `FragmentDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function fragmentDefinitionApi(node: GQL.FragmentDefinitionNode): FragmentDefinitionApi;
export {};
