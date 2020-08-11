import type * as GQL from 'graphql';
/**
 * @category API Mixins
 */
export declare type NameMixinNode = GQL.ArgumentNode | GQL.DirectiveDefinitionNode | GQL.DirectiveNode | GQL.EnumValueDefinitionNode | GQL.FieldDefinitionNode | GQL.FieldNode | GQL.FragmentSpreadNode | GQL.InputValueDefinitionNode | GQL.TypeDefinitionNode | GQL.TypeExtensionNode | GQL.FragmentDefinitionNode;
/**
 * @category API Mixins
 */
export declare class NameMixin {
    readonly node: NameMixinNode;
    constructor(node: NameMixinNode);
    getName(): string;
    setName(value: string): this;
}
/**
 * @category API Mixins
 */
export declare function nameMixin(node: NameMixinNode): NameMixin;
/**
 * @category API Mixins
 */
export declare type NameOptionalMixinNode = GQL.OperationDefinitionNode;
/**
 * @category API Mixins
 */
export declare class NameOptionalMixin {
    readonly node: NameOptionalMixinNode;
    constructor(node: NameOptionalMixinNode);
    getName(): string | undefined;
    setName(value: string): this;
}
/**
 * @category API Mixins
 */
export declare function nameOptionalMixin(node: NameOptionalMixinNode): NameOptionalMixin;
