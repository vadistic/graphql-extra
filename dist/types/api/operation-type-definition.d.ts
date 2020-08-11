import type * as GQL from 'graphql';
import { Api, Ast, Mixin } from '../internal';
declare const OperationTypeDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.NamedTypeMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.NamedTypeMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export declare class OperationTypeDefinitionApi extends OperationTypeDefinitionApi_base {
    readonly node: GQL.OperationTypeDefinitionNode;
    constructor(node: GQL.OperationTypeDefinitionNode);
    getOperation(): GQL.OperationTypeNode;
    setOperation(operation: GQL.OperationTypeNode): this;
    getType(): Api.NamedTypeApi;
    setType(type: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this;
}
/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function operationTypeDefinitionApi(node: GQL.OperationTypeDefinitionNode): OperationTypeDefinitionApi;
export {};
