import type { ASTKindToNode, KindEnum, ASTNode } from 'graphql';
import { DocumentApi } from './document';
import { Api } from './internal';
import { ContstructorType } from './types';
/**
 * @category Helper
 */
export declare const kindToApiMap: {
    Name: typeof Api.NameApi;
    Document: typeof DocumentApi;
    OperationDefinition: typeof Api.OperationDefinitionApi;
    VariableDefinition: typeof Api.VariableDefinitionApi;
    SelectionSet: typeof Api.SelectionSetApi;
    Field: typeof Api.FieldApi;
    Argument: typeof Api.ArgumentApi;
    FragmentSpread: typeof Api.FragmentSpreadApi;
    InlineFragment: typeof Api.InlineFragmentApi;
    FragmentDefinition: typeof Api.FragmentDefinitionApi;
    Variable: typeof Api.VariableApi;
    IntValue: typeof Api.ValueApi;
    FloatValue: typeof Api.ValueApi;
    StringValue: typeof Api.ValueApi;
    BooleanValue: typeof Api.ValueApi;
    NullValue: typeof Api.ValueApi;
    EnumValue: typeof Api.ValueApi;
    ListValue: typeof Api.ValueApi;
    ObjectValue: typeof Api.ValueApi;
    ObjectField: typeof Api.ValueApi;
    Directive: typeof Api.DirectiveApi;
    NamedType: typeof Api.TypeApi;
    ListType: typeof Api.TypeApi;
    NonNullType: typeof Api.TypeApi;
    SchemaDefinition: typeof Api.SchemaDefinitionApi;
    OperationTypeDefinition: typeof Api.OperationDefinitionApi;
    ScalarTypeDefinition: typeof Api.ScalarTypeApi;
    ObjectTypeDefinition: typeof Api.ObjectTypeApi;
    InterfaceTypeDefinition: typeof Api.InterfaceTypeApi;
    UnionTypeDefinition: typeof Api.UnionTypeApi;
    EnumTypeDefinition: typeof Api.EnumTypeApi;
    InputObjectTypeDefinition: typeof Api.InputTypeApi;
    FieldDefinition: typeof Api.FieldDefinitionApi;
    InputValueDefinition: typeof Api.InputValueDefinitionApi;
    EnumValueDefinition: typeof Api.EnumValueDefinitionApi;
    DirectiveDefinition: typeof Api.DirectiveDefinitionApi;
    SchemaExtension: typeof Api.SchemaExtensionApi;
    ScalarTypeExtension: typeof Api.ScalarExtApi;
    ObjectTypeExtension: typeof Api.ObjectExtApi;
    InterfaceTypeExtension: typeof Api.InterfaceExtApi;
    UnionTypeExtension: typeof Api.UnionExtApi;
    EnumTypeExtension: typeof Api.EnumExtApi;
    InputObjectTypeExtension: typeof Api.InputExtApi;
};
/**
 * @category Helper
 */
export declare type KindToApiMap = typeof kindToApiMap;
/**
 * @category Helper
 */
export declare type KindToApiType<K> = K extends keyof typeof kindToApiMap ? ContstructorType<typeof kindToApiMap[K]> : never;
/**
 * @category Helper
 */
export declare function kindToApi<K extends KindEnum>(kind: K): (node: ASTKindToNode[K]) => KindToApiType<K>;
/**
 * @category Helper
 */
export declare function nodeToApi<N extends ASTNode>(node: N): KindToApiType<N['kind']>;
