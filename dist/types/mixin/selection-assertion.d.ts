import type * as GQL from 'graphql';
import type { Api } from '../internal';
/**
 * @category API Mixins
 */
export declare type SelectionAssertionMixinNode = GQL.FieldNode | GQL.InlineFragmentNode | GQL.FragmentSpreadNode;
/**
 * @category API Mixins
 */
export declare class SelectionAssertionMixin {
    readonly node: SelectionAssertionMixinNode;
    constructor(node: SelectionAssertionMixinNode);
    isField(): this is Api.FieldApi;
    isFragmentSpread(): this is Api.FragmentSpreadApi;
    isInflineFragment(): this is Api.InlineFragmentApi;
    assertField(): Api.FieldApi;
    assertFragmentSpread(): Api.FragmentSpreadApi;
    assertInflineFragment(): Api.InlineFragmentApi;
}
/**
 * @category API Mixins
 */
export declare function selectionMixin(node: SelectionAssertionMixinNode): SelectionAssertionMixin;
