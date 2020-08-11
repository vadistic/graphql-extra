import { Kind } from 'graphql';
export function isNameNode(node) {
    return node.kind === Kind.NAME;
}
export function isDocumentNode(node) {
    return node.kind === Kind.DOCUMENT;
}
export function isOperationDefinitionNode(node) {
    return node.kind === Kind.OPERATION_DEFINITION;
}
export function isVariableDefinitionNode(node) {
    return node.kind === Kind.VARIABLE_DEFINITION;
}
export function isSelectionSetNode(node) {
    return node.kind === Kind.SELECTION_SET;
}
export function isFieldNode(node) {
    return node.kind === Kind.FIELD;
}
export function isArgumentNode(node) {
    return node.kind === Kind.ARGUMENT;
}
export function isFragmentSpreadNode(node) {
    return node.kind === Kind.FRAGMENT_SPREAD;
}
export function isInlineFragmentNode(node) {
    return node.kind === Kind.INLINE_FRAGMENT;
}
export function isFragmentDefinitionNode(node) {
    return node.kind === Kind.FRAGMENT_DEFINITION;
}
export function isVariableNode(node) {
    return node.kind === Kind.VARIABLE;
}
export function isIntValueNode(node) {
    return node.kind === Kind.INT;
}
export function isFloatValueNode(node) {
    return node.kind === Kind.FLOAT;
}
export function isStringValueNode(node) {
    return node.kind === Kind.STRING;
}
export function isBooleanValueNode(node) {
    return node.kind === Kind.BOOLEAN;
}
export function isNullValueNode(node) {
    return node.kind === Kind.NULL;
}
export function iEnumValueNode(node) {
    return node.kind === Kind.ENUM;
}
export function isListValueNode(node) {
    return node.kind === Kind.LIST;
}
export function isObjectValueNode(node) {
    return node.kind === Kind.OBJECT;
}
export function isObjectFieldNode(node) {
    return node.kind === Kind.OBJECT_FIELD;
}
export function isDirectiveNode(node) {
    return node.kind === Kind.DIRECTIVE;
}
export function isNamedTypeNode(node) {
    return node.kind === Kind.NAMED_TYPE;
}
export function isListTypeNode(node) {
    return node.kind === Kind.LIST_TYPE;
}
export function isNonNullTypeNode(node) {
    return node.kind === Kind.NON_NULL_TYPE;
}
export function isSchemaDefinitionNode(node) {
    return node.kind === Kind.SCHEMA_DEFINITION;
}
export function isOperationTypeDefinitionNode(node) {
    return node.kind === Kind.OPERATION_TYPE_DEFINITION;
}
export function isScalarTypeDefinitionNode(node) {
    return node.kind === Kind.SCALAR_TYPE_DEFINITION;
}
export function isObjectTypeDefinitionNode(node) {
    return node.kind === Kind.OBJECT_TYPE_DEFINITION;
}
export function isFieldDefinitionNode(node) {
    return node.kind === Kind.FIELD_DEFINITION;
}
export function isInputValueDefinitionNode(node) {
    return node.kind === Kind.INPUT_VALUE_DEFINITION;
}
export function isInterfaceTypeDefinitionNode(node) {
    return node.kind === Kind.INTERFACE_TYPE_DEFINITION;
}
export function isUnionTypeDefinitionNode(node) {
    return node.kind === Kind.UNION_TYPE_DEFINITION;
}
export function isEnumTypeDefinitionNode(node) {
    return node.kind === Kind.ENUM_TYPE_DEFINITION;
}
export function isEnumValueDefinitionNode(node) {
    return node.kind === Kind.ENUM_VALUE_DEFINITION;
}
export function isInputObjectTypeDefinitionNode(node) {
    return node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
export function isDirectiveDefinitionNode(node) {
    return node.kind === Kind.DIRECTIVE_DEFINITION;
}
export function isSchemaExtensionNode(node) {
    return node.kind === Kind.SCHEMA_EXTENSION;
}
export function isScalarTypeExtensionNode(node) {
    return node.kind === Kind.SCALAR_TYPE_EXTENSION;
}
export function isObjectTypeExtensionNode(node) {
    return node.kind === Kind.OBJECT_TYPE_EXTENSION;
}
export function isInterfaceTypeExtensionNode(node) {
    return node.kind === Kind.INTERFACE_TYPE_EXTENSION;
}
export function isUnionTypeExtensionNode(node) {
    return node.kind === Kind.UNION_TYPE_EXTENSION;
}
export function isEnumTypeExtensionNode(node) {
    return node.kind === Kind.ENUM_TYPE_EXTENSION;
}
export function isInputObjectTypeExtensionNode(node) {
    return node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
