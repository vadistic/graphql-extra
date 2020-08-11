import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const VariableDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.TypeMixin & Mixin.DirectivesMixin & Mixin.VariableMixin & Mixin.DefaultValueMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.TypeMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.VariableMixin;
} & {
    prototype: Mixin.DefaultValueMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `NameNode`
 *
 * @category API Public
 */
export declare class VariableDefinitionApi extends VariableDefinitionApi_base {
    readonly node: GQL.VariableDefinitionNode;
    constructor(node: GQL.VariableDefinitionNode);
}
/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export declare function variableDefinitionApi(node: GQL.VariableDefinitionNode): VariableDefinitionApi;
export {};
