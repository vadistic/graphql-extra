import type * as GQL from 'graphql';
import { Mixin } from '../internal';
declare const SchemaDefinitionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.DescriptionMixin & Mixin.DirectivesMixin & Mixin.OperationTypeDefinitionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.DescriptionMixin;
} & {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.OperationTypeDefinitionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `SchemaDefinitionNode`
 *
 * @category API Public
 */
export declare class SchemaDefinitionApi extends SchemaDefinitionApi_base {
    readonly node: GQL.SchemaDefinitionNode;
    constructor(node: GQL.SchemaDefinitionNode);
}
/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function schemaDefinitionApi(node: GQL.SchemaDefinitionNode): SchemaDefinitionApi;
declare const SchemaExtensionApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.DirectivesMixin & Mixin.OperationTypeDefinitionMixin & Mixin.KindAssertionMixin, {
    prototype: Mixin.DirectivesMixin;
} & {
    prototype: Mixin.OperationTypeDefinitionMixin;
} & {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `SchemaExtensionNode`
 *
 * @category API Public
 */
export declare class SchemaExtensionApi extends SchemaExtensionApi_base {
    readonly node: GQL.SchemaExtensionNode;
    constructor(node: GQL.SchemaExtensionNode);
}
/**
 * `SchemaDefinitionApi` constructor fn
 *
 * @category API Public
 */
export declare function schemaExtensionApi(node: GQL.SchemaExtensionNode): SchemaExtensionApi;
export {};
