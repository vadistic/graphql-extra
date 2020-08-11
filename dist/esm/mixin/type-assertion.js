import { Kind } from 'graphql';
import { assertionError } from '../utils';
export class TypeDefinitionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isEnumType() {
        return this.node.kind === Kind.ENUM_TYPE_DEFINITION;
    }
    isInputType() {
        return this.node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION;
    }
    isInterfaceType() {
        return this.node.kind === Kind.INTERFACE_TYPE_DEFINITION;
    }
    isObjectType() {
        return this.node.kind === Kind.OBJECT_TYPE_DEFINITION;
    }
    isScalarType() {
        return this.node.kind === Kind.SCALAR_TYPE_DEFINITION;
    }
    isUnionType() {
        return this.node.kind === Kind.UNION_TYPE_DEFINITION;
    }
    assertEnumType() {
        if (this.isEnumType())
            return this;
        throw assertionError(Kind.ENUM_TYPE_DEFINITION, this.node);
    }
    assertInputType() {
        if (this.isInputType())
            return this;
        throw assertionError(Kind.INPUT_OBJECT_TYPE_DEFINITION, this.node);
    }
    assertInterfaceType() {
        if (this.isInterfaceType())
            return this;
        throw assertionError(Kind.INTERFACE_TYPE_DEFINITION, this.node);
    }
    assertObjectType() {
        if (this.isObjectType())
            return this;
        throw assertionError(Kind.OBJECT_TYPE_DEFINITION, this.node);
    }
    assertScalarType() {
        if (this.isScalarType())
            return this;
        throw assertionError(Kind.SCALAR_TYPE_DEFINITION, this.node);
    }
    assertUnionType() {
        if (this.isUnionType())
            return this;
        throw assertionError(Kind.UNION_TYPE_DEFINITION, this.node);
    }
}
export function typeDefinitionAssertionMixin(node) {
    return new TypeDefinitionAssertionMixin(node);
}
export class TypeExtensionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isEnumExt() {
        return this.node.kind === Kind.ENUM_TYPE_EXTENSION;
    }
    isInputExt() {
        return this.node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION;
    }
    isInterfaceExt() {
        return this.node.kind === Kind.INTERFACE_TYPE_EXTENSION;
    }
    isObjectExt() {
        return this.node.kind === Kind.OBJECT_TYPE_EXTENSION;
    }
    isScalarExt() {
        return this.node.kind === Kind.SCALAR_TYPE_EXTENSION;
    }
    isUnionExt() {
        return this.node.kind === Kind.UNION_TYPE_EXTENSION;
    }
    assertEnumExt() {
        if (this.isEnumExt())
            return this;
        throw assertionError(Kind.ENUM_TYPE_EXTENSION, this.node);
    }
    assertInputExt() {
        if (this.isInputExt())
            return this;
        throw assertionError(Kind.INPUT_OBJECT_TYPE_EXTENSION, this.node);
    }
    assertInterfaceExt() {
        if (this.isInterfaceExt())
            return this;
        throw assertionError(Kind.INTERFACE_TYPE_EXTENSION, this.node);
    }
    assertObjectExt() {
        if (this.isObjectExt())
            return this;
        throw assertionError(Kind.OBJECT_TYPE_EXTENSION, this.node);
    }
    assertScalarExt() {
        if (this.isScalarExt())
            return this;
        throw assertionError(Kind.SCALAR_TYPE_EXTENSION, this.node);
    }
    assertUnionExt() {
        if (this.isUnionExt())
            return this;
        throw assertionError(Kind.UNION_TYPE_EXTENSION, this.node);
    }
}
export function typeExtensionAssertionMixin(node) {
    return new TypeExtensionAssertionMixin(node);
}
