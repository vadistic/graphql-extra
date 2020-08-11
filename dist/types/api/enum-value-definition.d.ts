import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const EnumValueDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `EnumValueDefinitionNode`
 *
 * @category API Public
 */
export declare class EnumValueDefinitionApi extends EnumValueDefinitionApi_base {
    readonly node: GQL.EnumValueDefinitionNode;
    constructor(node: GQL.EnumValueDefinitionNode);
}
/**
 * `EnumValueDefinitionApi` contructor fn
 *
 * @category API Public
 */
export declare function enumValueDefinitionApi(node: GQL.EnumValueDefinitionNode): EnumValueDefinitionApi;
export {};
