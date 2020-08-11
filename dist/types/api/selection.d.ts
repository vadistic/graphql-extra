import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const FieldApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.ArgumentsMixin & Mixin.DirectivesMixin & Mixin.SelectionSetMixin & Mixin.SelectionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.ArgumentsMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.SelectionSetMixin;
} & {
    prototype: Mixin.SelectionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `FieldNode`
 *
 * @category API Public
 */
export declare class FieldApi extends FieldApi_base {
    readonly node: GQL.FieldNode;
    constructor(node: GQL.FieldNode);
}
/**
 * `FieldApi` constructor fn
 *
 * @category API Public
 */
export declare function fieldApi(node: GQL.FieldNode): FieldApi;
declare const FragmentSpreadApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DirectivesMixin & Mixin.SelectionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.SelectionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `FragmentSpreadNode`
 *
 * @category API Public
 */
export declare class FragmentSpreadApi extends FragmentSpreadApi_base {
    readonly node: GQL.FragmentSpreadNode;
    constructor(node: GQL.FragmentSpreadNode);
}
/**
 * `FragmentSpreadApi` constructor fn
 *
 * @category API Public
 */
export declare function fragmentSpreadApi(node: GQL.FragmentSpreadNode): FragmentSpreadApi;
declare const InlineFragmentApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.DirectivesMixin & Mixin.SelectionSetMixin & Mixin.SelectionAssertionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.SelectionSetMixin;
} & {
    prototype: Mixin.SelectionAssertionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `InlineFragmentNode`
 *
 * @category API Public
 */
export declare class InlineFragmentApi extends InlineFragmentApi_base {
    readonly node: GQL.InlineFragmentNode;
    constructor(node: GQL.InlineFragmentNode);
}
/**
 * `InlineFragmentApi` constructor fn
 *
 * @category API Public
 */
export declare function inlineFragmentApi(node: GQL.InlineFragmentNode): InlineFragmentApi;
/**
 * API for GraphQL `SelectionNode`
 *
 * @category API Public
 */
export declare type SelectionApi = FragmentSpreadApi | InlineFragmentApi | FieldApi;
/**
 * map `SelectionNode` kind to api
 *
 * @category API Public
 */
export declare const kindToSelectionApi: {
    Field: typeof FieldApi;
    FragmentSpread: typeof FragmentSpreadApi;
    InlineFragment: typeof InlineFragmentApi;
};
/**
 *  polymorfic contructor fn for `SelectionApi`
 *
 * @category API Public
 */
export declare function selectionApi(node: GQL.SelectionNode): SelectionApi;
export {};
