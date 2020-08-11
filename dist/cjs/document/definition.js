"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
exports.kindToTypeDefinitionApi = {
    EnumTypeDefinition: internal_1.Api.EnumTypeApi,
    InputObjectTypeDefinition: internal_1.Api.InputTypeApi,
    InterfaceTypeDefinition: internal_1.Api.InterfaceTypeApi,
    ObjectTypeDefinition: internal_1.Api.ObjectTypeApi,
    ScalarTypeDefinition: internal_1.Api.ScalarTypeApi,
    UnionTypeDefinition: internal_1.Api.UnionTypeApi,
};
function typeDefinitionApi(node) {
    const Clazz = exports.kindToTypeDefinitionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw utils_1.validationError(Object.keys(exports.kindToTypeDefinitionApi), node);
}
exports.typeDefinitionApi = typeDefinitionApi;
exports.kindToTypeExtensionApi = {
    EnumTypeExtension: internal_1.Api.EnumExtApi,
    InputObjectTypeExtension: internal_1.Api.InputExtApi,
    InterfaceTypeExtension: internal_1.Api.InterfaceExtApi,
    ObjectTypeExtension: internal_1.Api.ObjectExtApi,
    ScalarTypeExtension: internal_1.Api.ScalarExtApi,
    UnionTypeExtension: internal_1.Api.UnionExtApi,
};
function typeExtensionApi(node) {
    const Clazz = exports.kindToTypeExtensionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw utils_1.validationError(Object.keys(exports.kindToTypeExtensionApi), node);
}
exports.typeExtensionApi = typeExtensionApi;
exports.kindToDefinitionApi = {
    ...exports.kindToTypeDefinitionApi,
    ...exports.kindToTypeExtensionApi,
    OperationDefinition: internal_1.Api.OperationDefinitionApi,
    FragmentDefinition: internal_1.Api.FragmentDefinitionApi,
    SchemaDefinition: internal_1.Api.SchemaDefinitionApi,
    SchemaExtension: internal_1.Api.SchemaExtensionApi,
    DirectiveDefinition: internal_1.Api.DirectiveDefinitionApi,
};
function definitionApi(node) {
    const Clazz = exports.kindToDefinitionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw utils_1.validationError(Object.keys(exports.kindToDefinitionApi), node);
}
exports.definitionApi = definitionApi;
