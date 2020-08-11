import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type UnionTypesMixinNode = GQL.UnionTypeDefinitionNode | GQL.UnionTypeExtensionNode;
/**
 * @category API Mixins
 */
export declare class UnionTypesMixin {
    readonly node: UnionTypesMixinNode;
    constructor(node: UnionTypesMixinNode);
    readonly _types: Crud<GQL.NamedTypeNode, Api.NamedTypeApi, string | GQL.NameNode | Ast.NameNodeObjProps, string>;
    getTypenames(): Typename[];
    hasTypename(typename: Typename): boolean;
    getTypes(): Api.NamedTypeApi[];
    getType(typename: Typename): Api.NamedTypeApi;
    createType(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this;
    updateType(typename: Typename, props: Typename | Partial<Ast.NamedTypeNodeProps | GQL.NamedTypeNode>): this;
    upsertType(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this;
    removeType(typename: Typename): this;
}
/**
 * @category API Mixins
 */
export declare function unionTypesMixin(node: UnionTypesMixinNode): UnionTypesMixin;
