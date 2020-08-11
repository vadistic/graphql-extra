import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const OperationDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NameOptionalMixin & Mixin.DirectivesMixin & Mixin.SelectionSetMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NameOptionalMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.SelectionSetMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `OperationDefinitionNode`
 *
 * @category API Public
 */
export declare class OperationDefinitionApi extends OperationDefinitionApi_base {
    readonly node: GQL.OperationDefinitionNode;
    constructor(node: GQL.OperationDefinitionNode);
    getOperationType(): GQL.OperationTypeNode;
    setOperationType(operation: GQL.OperationTypeNode): this;
}
/**
 * `OperationDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function operationDefinitionApi(node: GQL.OperationDefinitionNode): OperationDefinitionApi;
export {};
