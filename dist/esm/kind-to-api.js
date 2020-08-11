import { DocumentApi } from './document';
import { Api } from './internal';
export const kindToApiMap = {
    Name: Api.NameApi,
    Document: DocumentApi,
    OperationDefinition: Api.OperationDefinitionApi,
    VariableDefinition: Api.VariableDefinitionApi,
    SelectionSet: Api.SelectionSetApi,
    Field: Api.FieldApi,
    Argument: Api.ArgumentApi,
    FragmentSpread: Api.FragmentSpreadApi,
    InlineFragment: Api.InlineFragmentApi,
    FragmentDefinition: Api.FragmentDefinitionApi,
    Variable: Api.VariableApi,
    IntValue: Api.ValueApi,
    FloatValue: Api.ValueApi,
    StringValue: Api.ValueApi,
    BooleanValue: Api.ValueApi,
    NullValue: Api.ValueApi,
    EnumValue: Api.ValueApi,
    ListValue: Api.ValueApi,
    ObjectValue: Api.ValueApi,
    ObjectField: Api.ValueApi,
    Directive: Api.DirectiveApi,
    NamedType: Api.TypeApi,
    ListType: Api.TypeApi,
    NonNullType: Api.TypeApi,
    SchemaDefinition: Api.SchemaDefinitionApi,
    OperationTypeDefinition: Api.OperationDefinitionApi,
    ScalarTypeDefinition: Api.ScalarTypeApi,
    ObjectTypeDefinition: Api.ObjectTypeApi,
    InterfaceTypeDefinition: Api.InterfaceTypeApi,
    UnionTypeDefinition: Api.UnionTypeApi,
    EnumTypeDefinition: Api.EnumTypeApi,
    InputObjectTypeDefinition: Api.InputTypeApi,
    FieldDefinition: Api.FieldDefinitionApi,
    InputValueDefinition: Api.InputValueDefinitionApi,
    EnumValueDefinition: Api.EnumValueDefinitionApi,
    DirectiveDefinition: Api.DirectiveDefinitionApi,
    SchemaExtension: Api.SchemaExtensionApi,
    ScalarTypeExtension: Api.ScalarExtApi,
    ObjectTypeExtension: Api.ObjectExtApi,
    InterfaceTypeExtension: Api.InterfaceExtApi,
    UnionTypeExtension: Api.UnionExtApi,
    EnumTypeExtension: Api.EnumExtApi,
    InputObjectTypeExtension: Api.InputExtApi,
};
export function kindToApi(kind) {
    const Clazz = kindToApiMap[kind];
    if (!Clazz) {
        throw Error(nodeToApi.name + ` - not supported kind ${kind}`);
    }
    return (node) => new Clazz(node);
}
export function nodeToApi(node) {
    const Clazz = kindToApiMap[node.kind];
    if (!Clazz) {
        throw Error(nodeToApi.name + ` - not supported kind ${node.kind}`);
    }
    return new Clazz(node);
}
