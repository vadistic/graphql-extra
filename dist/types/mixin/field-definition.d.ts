import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Fieldname, Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type FieldDefinitionsMixinNode = GQL.InterfaceTypeDefinitionNode | GQL.InterfaceTypeExtensionNode | GQL.ObjectTypeDefinitionNode | GQL.ObjectTypeExtensionNode;
/**
 * @category API Mixins
 */
export declare class FieldDefinitionsMixin {
    readonly node: FieldDefinitionsMixinNode;
    constructor(node: FieldDefinitionsMixinNode);
    readonly _fields: Crud<GQL.FieldDefinitionNode, Api.FieldDefinitionApi, Ast.FieldDefinitionNodeProps, string>;
    getFieldnames(): Fieldname[];
    getFields(): Api.FieldDefinitionApi[];
    getFieldsByTypename(typename: Typename): Api.FieldDefinitionApi[];
    hasField(fieldname: Fieldname): boolean;
    getField(fieldname: Fieldname): Api.FieldDefinitionApi;
    createField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this;
    updateField(fieldname: Fieldname, props: Partial<Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode>): this;
    upsertField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this;
    removeField(fieldname: Fieldname): this;
    getFieldTypename(fieldname: Fieldname): Typename;
    setFieldTypename(fieldname: Fieldname, value: Typename): this;
    getFieldType(fieldname: Fieldname): Api.TypeApi;
    setFieldType(fieldname: Fieldname, props: Ast.TypeNodeProps | GQL.TypeNode): this;
    getFieldArguments(fieldname: Fieldname): Api.InputValueDefinitionApi[];
    getFieldDirectives(fieldname: Fieldname): Api.DirectiveApi[];
}
/**
 * @category API Mixins
 */
export declare function fieldDefinitionsMixin(node: FieldDefinitionsMixinNode): FieldDefinitionsMixin;
