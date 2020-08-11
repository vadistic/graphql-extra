"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const document_1 = require("./document");
const internal_1 = require("./internal");
exports.kindToApiMap = {
    Name: internal_1.Api.NameApi,
    Document: document_1.DocumentApi,
    OperationDefinition: internal_1.Api.OperationDefinitionApi,
    VariableDefinition: internal_1.Api.VariableDefinitionApi,
    SelectionSet: internal_1.Api.SelectionSetApi,
    Field: internal_1.Api.FieldApi,
    Argument: internal_1.Api.ArgumentApi,
    FragmentSpread: internal_1.Api.FragmentSpreadApi,
    InlineFragment: internal_1.Api.InlineFragmentApi,
    FragmentDefinition: internal_1.Api.FragmentDefinitionApi,
    Variable: internal_1.Api.VariableApi,
    IntValue: internal_1.Api.ValueApi,
    FloatValue: internal_1.Api.ValueApi,
    StringValue: internal_1.Api.ValueApi,
    BooleanValue: internal_1.Api.ValueApi,
    NullValue: internal_1.Api.ValueApi,
    EnumValue: internal_1.Api.ValueApi,
    ListValue: internal_1.Api.ValueApi,
    ObjectValue: internal_1.Api.ValueApi,
    ObjectField: internal_1.Api.ValueApi,
    Directive: internal_1.Api.DirectiveApi,
    NamedType: internal_1.Api.TypeApi,
    ListType: internal_1.Api.TypeApi,
    NonNullType: internal_1.Api.TypeApi,
    SchemaDefinition: internal_1.Api.SchemaDefinitionApi,
    OperationTypeDefinition: internal_1.Api.OperationDefinitionApi,
    ScalarTypeDefinition: internal_1.Api.ScalarTypeApi,
    ObjectTypeDefinition: internal_1.Api.ObjectTypeApi,
    InterfaceTypeDefinition: internal_1.Api.InterfaceTypeApi,
    UnionTypeDefinition: internal_1.Api.UnionTypeApi,
    EnumTypeDefinition: internal_1.Api.EnumTypeApi,
    InputObjectTypeDefinition: internal_1.Api.InputTypeApi,
    FieldDefinition: internal_1.Api.FieldDefinitionApi,
    InputValueDefinition: internal_1.Api.InputValueDefinitionApi,
    EnumValueDefinition: internal_1.Api.EnumValueDefinitionApi,
    DirectiveDefinition: internal_1.Api.DirectiveDefinitionApi,
    SchemaExtension: internal_1.Api.SchemaExtensionApi,
    ScalarTypeExtension: internal_1.Api.ScalarExtApi,
    ObjectTypeExtension: internal_1.Api.ObjectExtApi,
    InterfaceTypeExtension: internal_1.Api.InterfaceExtApi,
    UnionTypeExtension: internal_1.Api.UnionExtApi,
    EnumTypeExtension: internal_1.Api.EnumExtApi,
    InputObjectTypeExtension: internal_1.Api.InputExtApi,
};
function kindToApi(kind) {
    const Clazz = exports.kindToApiMap[kind];
    if (!Clazz) {
        throw Error(nodeToApi.name + ` - not supported kind ${kind}`);
    }
    return (node) => new Clazz(node);
}
exports.kindToApi = kindToApi;
function nodeToApi(node) {
    const Clazz = exports.kindToApiMap[node.kind];
    if (!Clazz) {
        throw Error(nodeToApi.name + ` - not supported kind ${node.kind}`);
    }
    return new Clazz(node);
}
exports.nodeToApi = nodeToApi;
