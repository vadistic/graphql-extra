import type * as GQL from 'graphql';
import { Api, Ast } from '../internal';
/**
 * @category API Mixins
 */
export declare type DefaultValueMixinNode = GQL.InputValueDefinitionNode | GQL.VariableDefinitionNode;
/**
 * @category API Mixins
 */
export declare class DefaultValueMixin {
    readonly node: DefaultValueMixinNode;
    constructor(node: DefaultValueMixinNode);
    hasDefaultValue(): boolean;
    getDefaultValue(): Api.ValueApi | undefined;
    setDefaultValue(props: undefined | Ast.ValueNodeProps | GQL.ValueNode): this;
}
/**
 * @category API Mixins
 */
export declare function defaultValueMixin(node: DefaultValueMixinNode): DefaultValueMixin;
