import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Variablename } from '../types';
/**
 * @category API Mixins
 */
export declare type VariableMixinNode = GQL.VariableDefinitionNode;
/**
 * @category API Mixins
 */
export declare class VariableMixin {
    readonly node: VariableMixinNode;
    constructor(node: VariableMixinNode);
    getVariableName(): Variablename;
    getVariable(): Api.VariableApi;
    hasVariable(variablename: Variablename): boolean;
    setVariable(props: Variablename | Ast.VariableNodeProps | GQL.VariableNode): this;
}
/**
 * @category API Mixins
 */
export declare function variableMixin(node: VariableMixinNode): VariableMixin;
