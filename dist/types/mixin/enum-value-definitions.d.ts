import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Fieldname } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type EnumValueDefinitionMixinNode = GQL.EnumTypeDefinitionNode | GQL.EnumTypeExtensionNode;
/**
 * @category API Mixins
 */
export declare class EnumValueDefinitionMixin {
    readonly node: EnumValueDefinitionMixinNode;
    constructor(node: EnumValueDefinitionMixinNode);
    readonly _values: Crud<GQL.EnumValueDefinitionNode, Api.EnumValueDefinitionApi, Ast.EnumValueDefinitionNodeProps, string>;
    hasValue(fieldname: Fieldname): boolean;
    getValue(fieldname: Fieldname): Api.EnumValueDefinitionApi;
    getValues(): Api.EnumValueDefinitionApi[];
    getValueNames(): Fieldname[];
    createValue(props: Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode): this;
    updateValue(fieldname: Fieldname, props: Fieldname | Partial<Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode>): this;
    upsertValue(props: Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode): this;
    removeValue(fieldname: Fieldname): this;
}
/**
 * @category API Mixins
 */
export declare function enumValueDefinitionMixin(node: EnumValueDefinitionMixinNode): EnumValueDefinitionMixin;
