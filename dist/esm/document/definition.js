import { Api } from '../internal';
import { validationError } from '../utils';
export const kindToTypeDefinitionApi = {
    EnumTypeDefinition: Api.EnumTypeApi,
    InputObjectTypeDefinition: Api.InputTypeApi,
    InterfaceTypeDefinition: Api.InterfaceTypeApi,
    ObjectTypeDefinition: Api.ObjectTypeApi,
    ScalarTypeDefinition: Api.ScalarTypeApi,
    UnionTypeDefinition: Api.UnionTypeApi,
};
export function typeDefinitionApi(node) {
    const Clazz = kindToTypeDefinitionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw validationError(Object.keys(kindToTypeDefinitionApi), node);
}
export const kindToTypeExtensionApi = {
    EnumTypeExtension: Api.EnumExtApi,
    InputObjectTypeExtension: Api.InputExtApi,
    InterfaceTypeExtension: Api.InterfaceExtApi,
    ObjectTypeExtension: Api.ObjectExtApi,
    ScalarTypeExtension: Api.ScalarExtApi,
    UnionTypeExtension: Api.UnionExtApi,
};
export function typeExtensionApi(node) {
    const Clazz = kindToTypeExtensionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw validationError(Object.keys(kindToTypeExtensionApi), node);
}
export const kindToDefinitionApi = {
    ...kindToTypeDefinitionApi,
    ...kindToTypeExtensionApi,
    OperationDefinition: Api.OperationDefinitionApi,
    FragmentDefinition: Api.FragmentDefinitionApi,
    SchemaDefinition: Api.SchemaDefinitionApi,
    SchemaExtension: Api.SchemaExtensionApi,
    DirectiveDefinition: Api.DirectiveDefinitionApi,
};
export function definitionApi(node) {
    const Clazz = kindToDefinitionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw validationError(Object.keys(kindToDefinitionApi), node);
}
