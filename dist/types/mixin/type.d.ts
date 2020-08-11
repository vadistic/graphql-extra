import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Typename } from '../types';
/**
 * @category API Mixins
 */
export declare type TypeMixinNode = GQL.FieldDefinitionNode | GQL.InputValueDefinitionNode | GQL.VariableDefinitionNode;
/**
 * @category API Mixins
 */
export declare class TypeMixin {
    protected node: TypeMixinNode;
    constructor(node: TypeMixinNode);
    getType(): Api.TypeApi;
    getTypename(): Typename;
    getNamedType(): GQL.NamedTypeNode;
    setTypename(typename: Typename): this;
    setType(props: Ast.TypeNodeProps | GQL.TypeNode): this;
    isNonNullType(deep?: boolean): boolean;
    isListType(deep?: boolean): boolean;
    setNonNullType(to?: boolean): this;
    setListType(to?: boolean): this;
}
/**
 * @category API Mixins
 */
export declare function typeMixin(node: TypeMixinNode): TypeMixin;
/**
 * @category API Mixins
 */
export declare type NamedTypeMixinNode = GQL.OperationTypeDefinitionNode;
/**
 * @category API Mixins
 */
export declare class NamedTypeMixin {
    protected node: NamedTypeMixinNode;
    constructor(node: NamedTypeMixinNode);
    getNamedType(): Api.NamedTypeApi;
    getTypename(): Typename;
    setTypename(typename: Typename): this;
}
/**
 * @category API Mixins
 */
export declare function namedTypeMixin(node: TypeMixinNode): TypeMixin;
