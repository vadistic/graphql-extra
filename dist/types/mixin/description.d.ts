import type * as GQL from 'graphql';
/**
 * @category API Mixins
 */
export declare type DescriptionMixinNode = GQL.DirectiveDefinitionNode | GQL.EnumValueDefinitionNode | GQL.FieldDefinitionNode | GQL.InputValueDefinitionNode | GQL.SchemaDefinitionNode | GQL.TypeDefinitionNode;
/**
 * @category API Mixins
 */
export declare class DescriptionMixin {
    readonly node: DescriptionMixinNode;
    constructor(node: DescriptionMixinNode);
    hasDescription(value?: string): boolean;
    getDescription(): string | undefined;
    setDescription(value: string | undefined): this;
}
/**
 * @category API Mixins
 */
export declare function descriptionMixin(node: DescriptionMixinNode): DescriptionMixin;
