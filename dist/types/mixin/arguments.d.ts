import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Argname } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type ArgumentsMixinNode = GQL.DirectiveNode | GQL.FieldNode;
/**
 * @category API Mixins
 */
export declare class ArgumentsMixin {
    protected node: ArgumentsMixinNode;
    constructor(node: ArgumentsMixinNode);
    readonly _arguments: Crud<GQL.ArgumentNode, Api.ArgumentApi, Ast.ArgumentNodeProps, string>;
    getArgumentNames(): Argname[];
    hasArgument(argname: Argname): boolean;
    getArguments(): Api.ArgumentApi[];
    getArgument(argname: Argname): Api.ArgumentApi;
    createArgument(props: Ast.ArgumentNodeProps | GQL.ArgumentNode): this;
    updateArgument(argname: Argname, props: Partial<Ast.ArgumentNodeProps | GQL.ArgumentNode>): this;
    upsertArgument(props: Ast.ArgumentNodeProps | GQL.ArgumentNode): this;
    removeArgument(argname: Argname): this;
}
/**
 * @category API Mixins
 */
export declare function argumentsMixin(node: ArgumentsMixinNode): ArgumentsMixin;
