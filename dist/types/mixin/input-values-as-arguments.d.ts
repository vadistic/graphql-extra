import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Argname, Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type InputValuesAsArgumentsMixinNode = GQL.FieldDefinitionNode | GQL.DirectiveDefinitionNode;
/**
 * @category API Mixins
 */
export declare class InputValuesAsArgumentsMixin {
    readonly node: InputValuesAsArgumentsMixinNode;
    constructor(node: InputValuesAsArgumentsMixinNode);
    readonly _arguments: Crud<GQL.InputValueDefinitionNode, Api.InputValueDefinitionApi, Ast.InputValueDefinitionNodeProps, string>;
    getArgnames(): Argname[];
    getArguments(): Api.InputValueDefinitionApi[];
    getArgumentsByTypename(typename: Typename): Api.InputValueDefinitionApi[];
    hasArgument(argname: Argname): boolean;
    getArgument(argname: Argname): Api.InputValueDefinitionApi;
    createArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this;
    upsertArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this;
    updateArgument(argname: Argname, props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>): this;
    removeArgument(argname: Argname): this;
    getArgumentType(argname: Argname): Api.TypeApi;
    setArgumentType(argname: Argname, props: GQL.TypeNode | Ast.TypeNodeProps): this;
    getArgumentDefaultValue(argname: Argname): Api.ValueApi | undefined;
    setArgumentDefualtValue(argname: Argname, props: GQL.ValueNode): this;
}
