import type * as GQL from 'graphql';
import { Api } from '../internal';
/**
 * @category API Mixins
 */
export declare class TypeDefinitionAssertionMixin {
    readonly node: GQL.TypeDefinitionNode;
    constructor(node: GQL.TypeDefinitionNode);
    isEnumType(): this is Api.EnumTypeApi;
    isInputType(): this is Api.InputTypeApi;
    isInterfaceType(): this is Api.InterfaceTypeApi;
    isObjectType(): this is Api.ObjectTypeApi;
    isScalarType(): this is Api.ScalarTypeApi;
    isUnionType(): this is Api.UnionTypeApi;
    assertEnumType(): Api.EnumTypeApi;
    assertInputType(): Api.InputTypeApi;
    assertInterfaceType(): Api.InterfaceTypeApi;
    assertObjectType(): Api.ObjectTypeApi;
    assertScalarType(): Api.ScalarTypeApi;
    assertUnionType(): Api.UnionTypeApi;
}
/**
 * @category API Mixins
 */
export declare function typeDefinitionAssertionMixin(node: GQL.TypeDefinitionNode): TypeDefinitionAssertionMixin;
/**
 * @category API Mixins
 */
export declare class TypeExtensionAssertionMixin {
    readonly node: GQL.TypeExtensionNode;
    constructor(node: GQL.TypeExtensionNode);
    isEnumExt(): this is Api.EnumExtApi;
    isInputExt(): this is Api.InputExtApi;
    isInterfaceExt(): this is Api.InterfaceExtApi;
    isObjectExt(): this is Api.ObjectExtApi;
    isScalarExt(): this is Api.ScalarExtApi;
    isUnionExt(): this is Api.UnionExtApi;
    assertEnumExt(): Api.EnumExtApi;
    assertInputExt(): Api.InputExtApi;
    assertInterfaceExt(): Api.InterfaceExtApi;
    assertObjectExt(): Api.ObjectExtApi;
    assertScalarExt(): Api.ScalarExtApi;
    assertUnionExt(): Api.UnionExtApi;
}
/**
 * @category API Mixins
 */
export declare function typeExtensionAssertionMixin(node: GQL.TypeExtensionNode): TypeExtensionAssertionMixin;
