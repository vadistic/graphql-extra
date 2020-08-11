import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Fieldname, Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type InputValuesAsFieldsMixinNode = GQL.InputObjectTypeDefinitionNode | GQL.InputObjectTypeExtensionNode;
/**
 * @category API Mixins
 */
export declare class InputValuesAsFieldsMixin {
    protected node: InputValuesAsFieldsMixinNode;
    constructor(node: InputValuesAsFieldsMixinNode);
    readonly _fields: Crud<GQL.InputValueDefinitionNode, Api.InputValueDefinitionApi, Ast.InputValueDefinitionNodeProps, string>;
    getFieldnames(): Fieldname[];
    getFields(): Api.InputValueDefinitionApi[];
    getFieldsByTypename(typename: Typename): Api.InputValueDefinitionApi[];
    hasField(fieldname: Fieldname): boolean;
    getField(fieldname: Fieldname): Api.InputValueDefinitionApi;
    createField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this;
    upsertField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this;
    updateField(fieldname: Fieldname, props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>): this;
    removeField(fieldname: Fieldname): this;
    getFieldType(fieldname: Fieldname): Api.TypeApi;
    setFieldType(fieldname: Fieldname, props: GQL.TypeNode | Ast.TypeNodeProps): this;
    getFieldDefaultValue(fieldname: Fieldname): Api.ValueApi | undefined;
    setFieldDefualtValue(fieldname: Fieldname, props: GQL.ValueNode): this;
}
/**
 * @category API Mixins
 */
export declare function inputValuesAsFieldsMixin(node: InputValuesAsFieldsMixinNode): InputValuesAsFieldsMixin;
