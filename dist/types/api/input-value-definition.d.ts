import type * as GQL from 'graphql';
import { Api, Mixin } from '../internal';
declare const InputValueDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.TypeMixin & Mixin.DefaultValueMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.TypeMixin;
} & {
    prototype: Mixin.DefaultValueMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * API for GraphQL `InputValueDefinitionNode`
 *
 * @category API Public
 */
export declare class InputValueDefinitionApi extends InputValueDefinitionApi_base {
    readonly node: GQL.InputValueDefinitionNode;
    constructor(node: GQL.InputValueDefinitionNode);
    toField(): Api.FieldDefinitionApi;
}
/**
 * `InputValueApi` constructor fn
 *
 * @category API Public
 */
export declare function inputValueDefinitionApi(node: GQL.InputValueDefinitionNode): Api.InputValueDefinitionApi;
export {};
