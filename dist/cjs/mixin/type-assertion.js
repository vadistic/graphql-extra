"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const utils_1 = require("../utils");
class TypeDefinitionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isEnumType() {
        return this.node.kind === graphql_1.Kind.ENUM_TYPE_DEFINITION;
    }
    isInputType() {
        return this.node.kind === graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION;
    }
    isInterfaceType() {
        return this.node.kind === graphql_1.Kind.INTERFACE_TYPE_DEFINITION;
    }
    isObjectType() {
        return this.node.kind === graphql_1.Kind.OBJECT_TYPE_DEFINITION;
    }
    isScalarType() {
        return this.node.kind === graphql_1.Kind.SCALAR_TYPE_DEFINITION;
    }
    isUnionType() {
        return this.node.kind === graphql_1.Kind.UNION_TYPE_DEFINITION;
    }
    assertEnumType() {
        if (this.isEnumType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.ENUM_TYPE_DEFINITION, this.node);
    }
    assertInputType() {
        if (this.isInputType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION, this.node);
    }
    assertInterfaceType() {
        if (this.isInterfaceType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.INTERFACE_TYPE_DEFINITION, this.node);
    }
    assertObjectType() {
        if (this.isObjectType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.OBJECT_TYPE_DEFINITION, this.node);
    }
    assertScalarType() {
        if (this.isScalarType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.SCALAR_TYPE_DEFINITION, this.node);
    }
    assertUnionType() {
        if (this.isUnionType())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.UNION_TYPE_DEFINITION, this.node);
    }
}
exports.TypeDefinitionAssertionMixin = TypeDefinitionAssertionMixin;
function typeDefinitionAssertionMixin(node) {
    return new TypeDefinitionAssertionMixin(node);
}
exports.typeDefinitionAssertionMixin = typeDefinitionAssertionMixin;
class TypeExtensionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isEnumExt() {
        return this.node.kind === graphql_1.Kind.ENUM_TYPE_EXTENSION;
    }
    isInputExt() {
        return this.node.kind === graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION;
    }
    isInterfaceExt() {
        return this.node.kind === graphql_1.Kind.INTERFACE_TYPE_EXTENSION;
    }
    isObjectExt() {
        return this.node.kind === graphql_1.Kind.OBJECT_TYPE_EXTENSION;
    }
    isScalarExt() {
        return this.node.kind === graphql_1.Kind.SCALAR_TYPE_EXTENSION;
    }
    isUnionExt() {
        return this.node.kind === graphql_1.Kind.UNION_TYPE_EXTENSION;
    }
    assertEnumExt() {
        if (this.isEnumExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.ENUM_TYPE_EXTENSION, this.node);
    }
    assertInputExt() {
        if (this.isInputExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION, this.node);
    }
    assertInterfaceExt() {
        if (this.isInterfaceExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.INTERFACE_TYPE_EXTENSION, this.node);
    }
    assertObjectExt() {
        if (this.isObjectExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.OBJECT_TYPE_EXTENSION, this.node);
    }
    assertScalarExt() {
        if (this.isScalarExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.SCALAR_TYPE_EXTENSION, this.node);
    }
    assertUnionExt() {
        if (this.isUnionExt())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.UNION_TYPE_EXTENSION, this.node);
    }
}
exports.TypeExtensionAssertionMixin = TypeExtensionAssertionMixin;
function typeExtensionAssertionMixin(node) {
    return new TypeExtensionAssertionMixin(node);
}
exports.typeExtensionAssertionMixin = typeExtensionAssertionMixin;
