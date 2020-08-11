import type * as GQL from 'graphql';
import { Api } from '../internal';
/**
 * map `TypeDefinitionNode` kind to api
 *
 * @category API Public
 */
export declare const kindToTypeDefinitionApi: {
    EnumTypeDefinition: typeof Api.EnumTypeApi;
    InputObjectTypeDefinition: typeof Api.InputTypeApi;
    InterfaceTypeDefinition: typeof Api.InterfaceTypeApi;
    ObjectTypeDefinition: typeof Api.ObjectTypeApi;
    ScalarTypeDefinition: typeof Api.ScalarTypeApi;
    UnionTypeDefinition: typeof Api.UnionTypeApi;
};
/**
 *  polymorfic contructor fn for `TypeDefinitonApi`
 *
 * @category API Public
 */
export declare function typeDefinitionApi(node: GQL.TypeDefinitionNode): Api.TypeDefinitonApi;
/**
 * map `TypeDefinitionNode` kind to api
 *
 * @category API Public
 */
export declare const kindToTypeExtensionApi: {
    EnumTypeExtension: typeof Api.EnumExtApi;
    InputObjectTypeExtension: typeof Api.InputExtApi;
    InterfaceTypeExtension: typeof Api.InterfaceExtApi;
    ObjectTypeExtension: typeof Api.ObjectExtApi;
    ScalarTypeExtension: typeof Api.ScalarExtApi;
    UnionTypeExtension: typeof Api.UnionExtApi;
};
/**
 *  polymorfic contructor fn for `TypeDefinitonApi`
 *
 * @category API Public
 */
export declare function typeExtensionApi(node: GQL.TypeExtensionNode): Api.TypeExtensionApi;
/**
 * API for GraphQL `DefinitionNode`
 *
 * @category API Public
 */
export declare type DefinitionApi = Api.TypeDefinitonApi | Api.TypeExtensionApi | Api.OperationDefinitionApi | Api.FragmentDefinitionApi | Api.DirectiveDefinitionApi | Api.SchemaDefinitionApi | Api.SchemaExtensionApi;
/**
 * map `DefinitionNode` kind to api
 *
 * @category API Public
 */
export declare const kindToDefinitionApi: {
    OperationDefinition: typeof Api.OperationDefinitionApi;
    FragmentDefinition: typeof Api.FragmentDefinitionApi;
    SchemaDefinition: typeof Api.SchemaDefinitionApi;
    SchemaExtension: typeof Api.SchemaExtensionApi;
    DirectiveDefinition: typeof Api.DirectiveDefinitionApi;
    EnumTypeExtension: typeof Api.EnumExtApi;
    InputObjectTypeExtension: typeof Api.InputExtApi;
    InterfaceTypeExtension: typeof Api.InterfaceExtApi;
    ObjectTypeExtension: typeof Api.ObjectExtApi;
    ScalarTypeExtension: typeof Api.ScalarExtApi;
    UnionTypeExtension: typeof Api.UnionExtApi;
    EnumTypeDefinition: typeof Api.EnumTypeApi;
    InputObjectTypeDefinition: typeof Api.InputTypeApi;
    InterfaceTypeDefinition: typeof Api.InterfaceTypeApi;
    ObjectTypeDefinition: typeof Api.ObjectTypeApi;
    ScalarTypeDefinition: typeof Api.ScalarTypeApi;
    UnionTypeDefinition: typeof Api.UnionTypeApi;
};
/**
 *  polymorfic contructor fn for `DefinitionNode`
 *
 * @category API Public
 */
export declare function definitionApi(node: GQL.DefinitionNode): DefinitionApi;
