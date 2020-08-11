import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Typename } from '../types';
import { Crud } from '../utils';
export declare type InterfaceMixinNode = GQL.ObjectTypeDefinitionNode | GQL.ObjectTypeExtensionNode | GQL.InterfaceTypeDefinitionNode | GQL.InterfaceTypeExtensionNode;
/**
 * @category API Mixins
 */
export declare class InterfacesMixin {
    readonly node: InterfaceMixinNode;
    constructor(node: InterfaceMixinNode);
    readonly _interfaces: Crud<GQL.NamedTypeNode, Api.NamedTypeApi, string | GQL.NameNode | Ast.NameNodeObjProps, string>;
    getInterfaces(): Api.NamedTypeApi[];
    getInterfaceNames(): Typename[];
    hasInterface(typename: Typename): boolean;
    getInterface(typename: Typename): Api.NamedTypeApi;
    createInterface(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this;
    updateInterface(typename: Typename, props: Typename | Partial<Ast.NamedTypeNodeProps | GQL.NamedTypeNode>): this;
    upsertInterface(props: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this;
    removeInterface(typename: Typename): this;
}
/**
 * @category API Mixins
 */
export declare function interfacesMixin(node: InterfaceMixinNode): InterfacesMixin;
