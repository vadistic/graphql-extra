import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Directivename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type DirectivesMixinNode = GQL.EnumValueDefinitionNode | GQL.FieldDefinitionNode | GQL.FieldNode | GQL.FragmentDefinitionNode | GQL.FragmentSpreadNode | GQL.InputValueDefinitionNode | GQL.OperationDefinitionNode | GQL.SchemaDefinitionNode | GQL.SchemaExtensionNode | GQL.TypeDefinitionNode | GQL.TypeExtensionNode | GQL.InlineFragmentNode | GQL.VariableDefinitionNode;
/**
 * @category API Mixins
 */
export declare class DirectivesMixin {
    readonly node: DirectivesMixinNode;
    constructor(node: DirectivesMixinNode);
    readonly _directives: Crud<GQL.DirectiveNode, Api.DirectiveApi, Ast.DirectiveNodeProps, string>;
    getDirectives(): Api.DirectiveApi[];
    getDirectiveNames(): Directivename[];
    hasDirective(directivename: Directivename): boolean;
    getDirective(directivename: Directivename): Api.DirectiveApi;
    createDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this;
    updateDirective(directivename: Directivename, props: Ast.DirectiveNodeProps | Partial<Ast.DirectiveNodeProps | GQL.DirectiveNode>): this;
    upsertDirective(props: Ast.DirectiveNodeProps | GQL.DirectiveNode): this;
    removeDirective(directivename: Directivename): this;
}
/**
 * @category API Mixins
 */
export declare function directivesMixin(node: DirectivesMixinNode): DirectivesMixin;
