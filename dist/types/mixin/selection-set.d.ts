import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Fieldname, Fragmentname, Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type SelectionSetMixinNode = GQL.FieldNode | GQL.FragmentDefinitionNode | GQL.InlineFragmentNode | GQL.OperationDefinitionNode | GQL.SelectionSetNode;
/**
 * @category API Mixins
 */
export declare class SelectionSetMixin {
    readonly node: SelectionSetMixinNode;
    constructor(node: SelectionSetMixinNode);
    protected _selectionsRef: ((next?: GQL.SelectionNode[] | undefined) => GQL.SelectionNode[]) | undefined;
    readonly _selections: Crud<GQL.SelectionNode, Api.SelectionApi, Ast.SelectionNodeProps, string>;
    readonly _fields: Crud<GQL.FieldNode, Api.FieldApi, Ast.FieldNodeProps, string>;
    readonly _fragmentSpreads: Crud<GQL.FragmentSpreadNode, Api.FragmentSpreadApi, Ast.FragmentSpreadNodeProps, string>;
    readonly _inlineFragments: Crud<GQL.InlineFragmentNode, Api.InlineFragmentApi, Ast.InlineFragmentNodeProps, string | undefined>;
    hasSelectionSet(): boolean;
    removeSelectionSet(): this;
    getSelectionSet(): Api.SelectionSetApi;
    getSelections(): Api.SelectionApi[];
    hasField(fieldname: Fieldname): boolean;
    getFields(): Api.FieldApi[];
    getField(fieldname: Fieldname): Api.FieldApi;
    createField(props: Ast.FieldNodeProps | GQL.FieldNode): this;
    updateField(fieldname: Fieldname, props: Ast.FieldNodeProps | GQL.FieldNode): this;
    upsertField(props: Ast.FieldNodeProps | GQL.FieldNode): this;
    removeField(fieldname: Fieldname): this;
    hasFragmentSpread(fragmentname: Fragmentname): boolean;
    getFragmentSpreads(): Api.FragmentSpreadApi[];
    getFragmentSpead(fragmentname: Fragmentname): Api.FragmentSpreadApi;
    createFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this;
    updateFragmentSpread(fragmentname: Fragmentname, props: Ast.FragmentSpreadNodeProps | Partial<Ast.FragmentSpreadNodeProps> | GQL.FragmentSpreadNode): this;
    upsertFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this;
    removeFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this;
    hasInlineFragment(typeCondition?: Typename): boolean;
    getInlineFragment(typeCondition?: Typename): Api.InlineFragmentApi;
    getInlineFragments(): Api.InlineFragmentApi[];
    createInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this;
    updateInlineFragment(typeCondition: Typename | undefined, props: Partial<Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode>): this;
    upsertInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this;
    removeInlineFragment(typeCondition: Typename): this;
}
/**
 * @category API Mixins
 */
export declare function selectionSetMixin(node: SelectionSetMixinNode): SelectionSetMixin;
