"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
function isNameNode(node) {
    return node.kind === graphql_1.Kind.NAME;
}
exports.isNameNode = isNameNode;
function isDocumentNode(node) {
    return node.kind === graphql_1.Kind.DOCUMENT;
}
exports.isDocumentNode = isDocumentNode;
function isOperationDefinitionNode(node) {
    return node.kind === graphql_1.Kind.OPERATION_DEFINITION;
}
exports.isOperationDefinitionNode = isOperationDefinitionNode;
function isVariableDefinitionNode(node) {
    return node.kind === graphql_1.Kind.VARIABLE_DEFINITION;
}
exports.isVariableDefinitionNode = isVariableDefinitionNode;
function isSelectionSetNode(node) {
    return node.kind === graphql_1.Kind.SELECTION_SET;
}
exports.isSelectionSetNode = isSelectionSetNode;
function isFieldNode(node) {
    return node.kind === graphql_1.Kind.FIELD;
}
exports.isFieldNode = isFieldNode;
function isArgumentNode(node) {
    return node.kind === graphql_1.Kind.ARGUMENT;
}
exports.isArgumentNode = isArgumentNode;
function isFragmentSpreadNode(node) {
    return node.kind === graphql_1.Kind.FRAGMENT_SPREAD;
}
exports.isFragmentSpreadNode = isFragmentSpreadNode;
function isInlineFragmentNode(node) {
    return node.kind === graphql_1.Kind.INLINE_FRAGMENT;
}
exports.isInlineFragmentNode = isInlineFragmentNode;
function isFragmentDefinitionNode(node) {
    return node.kind === graphql_1.Kind.FRAGMENT_DEFINITION;
}
exports.isFragmentDefinitionNode = isFragmentDefinitionNode;
function isVariableNode(node) {
    return node.kind === graphql_1.Kind.VARIABLE;
}
exports.isVariableNode = isVariableNode;
function isIntValueNode(node) {
    return node.kind === graphql_1.Kind.INT;
}
exports.isIntValueNode = isIntValueNode;
function isFloatValueNode(node) {
    return node.kind === graphql_1.Kind.FLOAT;
}
exports.isFloatValueNode = isFloatValueNode;
function isStringValueNode(node) {
    return node.kind === graphql_1.Kind.STRING;
}
exports.isStringValueNode = isStringValueNode;
function isBooleanValueNode(node) {
    return node.kind === graphql_1.Kind.BOOLEAN;
}
exports.isBooleanValueNode = isBooleanValueNode;
function isNullValueNode(node) {
    return node.kind === graphql_1.Kind.NULL;
}
exports.isNullValueNode = isNullValueNode;
function iEnumValueNode(node) {
    return node.kind === graphql_1.Kind.ENUM;
}
exports.iEnumValueNode = iEnumValueNode;
function isListValueNode(node) {
    return node.kind === graphql_1.Kind.LIST;
}
exports.isListValueNode = isListValueNode;
function isObjectValueNode(node) {
    return node.kind === graphql_1.Kind.OBJECT;
}
exports.isObjectValueNode = isObjectValueNode;
function isObjectFieldNode(node) {
    return node.kind === graphql_1.Kind.OBJECT_FIELD;
}
exports.isObjectFieldNode = isObjectFieldNode;
function isDirectiveNode(node) {
    return node.kind === graphql_1.Kind.DIRECTIVE;
}
exports.isDirectiveNode = isDirectiveNode;
function isNamedTypeNode(node) {
    return node.kind === graphql_1.Kind.NAMED_TYPE;
}
exports.isNamedTypeNode = isNamedTypeNode;
function isListTypeNode(node) {
    return node.kind === graphql_1.Kind.LIST_TYPE;
}
exports.isListTypeNode = isListTypeNode;
function isNonNullTypeNode(node) {
    return node.kind === graphql_1.Kind.NON_NULL_TYPE;
}
exports.isNonNullTypeNode = isNonNullTypeNode;
function isSchemaDefinitionNode(node) {
    return node.kind === graphql_1.Kind.SCHEMA_DEFINITION;
}
exports.isSchemaDefinitionNode = isSchemaDefinitionNode;
function isOperationTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.OPERATION_TYPE_DEFINITION;
}
exports.isOperationTypeDefinitionNode = isOperationTypeDefinitionNode;
function isScalarTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.SCALAR_TYPE_DEFINITION;
}
exports.isScalarTypeDefinitionNode = isScalarTypeDefinitionNode;
function isObjectTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.OBJECT_TYPE_DEFINITION;
}
exports.isObjectTypeDefinitionNode = isObjectTypeDefinitionNode;
function isFieldDefinitionNode(node) {
    return node.kind === graphql_1.Kind.FIELD_DEFINITION;
}
exports.isFieldDefinitionNode = isFieldDefinitionNode;
function isInputValueDefinitionNode(node) {
    return node.kind === graphql_1.Kind.INPUT_VALUE_DEFINITION;
}
exports.isInputValueDefinitionNode = isInputValueDefinitionNode;
function isInterfaceTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.INTERFACE_TYPE_DEFINITION;
}
exports.isInterfaceTypeDefinitionNode = isInterfaceTypeDefinitionNode;
function isUnionTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.UNION_TYPE_DEFINITION;
}
exports.isUnionTypeDefinitionNode = isUnionTypeDefinitionNode;
function isEnumTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.ENUM_TYPE_DEFINITION;
}
exports.isEnumTypeDefinitionNode = isEnumTypeDefinitionNode;
function isEnumValueDefinitionNode(node) {
    return node.kind === graphql_1.Kind.ENUM_VALUE_DEFINITION;
}
exports.isEnumValueDefinitionNode = isEnumValueDefinitionNode;
function isInputObjectTypeDefinitionNode(node) {
    return node.kind === graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION;
}
exports.isInputObjectTypeDefinitionNode = isInputObjectTypeDefinitionNode;
function isDirectiveDefinitionNode(node) {
    return node.kind === graphql_1.Kind.DIRECTIVE_DEFINITION;
}
exports.isDirectiveDefinitionNode = isDirectiveDefinitionNode;
function isSchemaExtensionNode(node) {
    return node.kind === graphql_1.Kind.SCHEMA_EXTENSION;
}
exports.isSchemaExtensionNode = isSchemaExtensionNode;
function isScalarTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.SCALAR_TYPE_EXTENSION;
}
exports.isScalarTypeExtensionNode = isScalarTypeExtensionNode;
function isObjectTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.OBJECT_TYPE_EXTENSION;
}
exports.isObjectTypeExtensionNode = isObjectTypeExtensionNode;
function isInterfaceTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.INTERFACE_TYPE_EXTENSION;
}
exports.isInterfaceTypeExtensionNode = isInterfaceTypeExtensionNode;
function isUnionTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.UNION_TYPE_EXTENSION;
}
exports.isUnionTypeExtensionNode = isUnionTypeExtensionNode;
function isEnumTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.ENUM_TYPE_EXTENSION;
}
exports.isEnumTypeExtensionNode = isEnumTypeExtensionNode;
function isInputObjectTypeExtensionNode(node) {
    return node.kind === graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION;
}
exports.isInputObjectTypeExtensionNode = isInputObjectTypeExtensionNode;
