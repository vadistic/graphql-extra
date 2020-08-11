import type * as GQL from 'graphql';
import { Api, Mixin, Ast } from '../internal';
import { Crud } from '../utils';
declare const DirectiveDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameMixin & Mixin.DescriptionMixin & Mixin.InputValuesAsArgumentsMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameMixin;
} & {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.InputValuesAsArgumentsMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 * @category API Public
 */
export declare class DirectiveDefinitionApi extends DirectiveDefinitionApi_base {
    readonly node: GQL.DirectiveDefinitionNode;
    constructor(node: GQL.DirectiveDefinitionNode);
    readonly _locations: Crud<GQL.NameNode, "QUERY" | "MUTATION" | "SUBSCRIPTION" | "FIELD" | "FRAGMENT_DEFINITION" | "FRAGMENT_SPREAD" | "INLINE_FRAGMENT" | "VARIABLE_DEFINITION" | "SCHEMA" | "SCALAR" | "OBJECT" | "FIELD_DEFINITION" | "ARGUMENT_DEFINITION" | "INTERFACE" | "UNION" | "ENUM" | "ENUM_VALUE" | "INPUT_OBJECT" | "INPUT_FIELD_DEFINITION", Ast.NameNodeProps, "QUERY" | "MUTATION" | "SUBSCRIPTION" | "FIELD" | "FRAGMENT_DEFINITION" | "FRAGMENT_SPREAD" | "INLINE_FRAGMENT" | "VARIABLE_DEFINITION" | "SCHEMA" | "SCALAR" | "OBJECT" | "FIELD_DEFINITION" | "ARGUMENT_DEFINITION" | "INTERFACE" | "UNION" | "ENUM" | "ENUM_VALUE" | "INPUT_OBJECT" | "INPUT_FIELD_DEFINITION">;
    isRepeatable(): boolean;
    setRepeatable(value?: boolean): this;
    hasLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): boolean;
    getLocations(): GQL.DirectiveLocationEnum[];
    setLocations(locations: (GQL.NameNode | GQL.DirectiveLocationEnum)[]): this;
    createLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this;
    removeLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this;
}
/**
 * @category API Public
 */
export declare function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): Api.DirectiveDefinitionApi;
export {};
