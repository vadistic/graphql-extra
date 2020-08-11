import type * as GQL from 'graphql';
import { Mixin, Ast } from '../internal';
declare const ValueApi_base: import("ts-mixer/dist/types").Class<[GQL.ASTNode], Mixin.KindAssertionMixin, {
    prototype: Mixin.KindAssertionMixin;
}>;
/**
 *  API for GraphQL `ValueNode`
 *
 * @category API Public
 */
export declare class ValueApi extends ValueApi_base {
    readonly node: GQL.ValueNode;
    constructor(node: GQL.ValueNode);
    toJs(): any;
    set(props: Ast.ValueNodeProps | GQL.ValueNode): this;
}
/**
 * `NameApi` constructor fn
 *
 * @category API Public
 */
export declare function valueApi(node: GQL.ValueNode): ValueApi;
export {};
