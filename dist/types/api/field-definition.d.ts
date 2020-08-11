import type * as GQL from 'graphql';
import { Api, Mixin } from '../internal';
declare const FieldDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.InputValuesAsArgumentsMixin & Mixin.TypeMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.InputValuesAsArgumentsMixin;
} & {
    prototype: Mixin.TypeMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export declare class FieldDefinitionApi extends FieldDefinitionApi_base {
    readonly node: GQL.FieldDefinitionNode;
    constructor(node: GQL.FieldDefinitionNode);
    toInputValue(): Api.InputValueDefinitionApi;
}
/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function fieldDefinitionApi(node: GQL.FieldDefinitionNode): Api.FieldDefinitionApi;
export {};
