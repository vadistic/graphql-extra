"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class TypeMixin {
    constructor(node) {
        this.node = node;
    }
    getType() {
        return internal_1.Api.typeApi(this.node.type);
    }
    getTypename() {
        return this.getType().getTypename();
    }
    getNamedType() {
        return this.getType().getNamedType();
    }
    setTypename(typename) {
        this.getType().setTypename(typename);
        return this;
    }
    setType(props) {
        this.getType().setType(props);
        return this;
    }
    isNonNullType(deep) {
        return this.getType().isNonNull(deep);
    }
    isListType(deep) {
        return this.getType().isList(deep);
    }
    setNonNullType(to = true) {
        this.getType().setNonNull(to);
        return this;
    }
    setListType(to = true) {
        this.getType().setList(to);
        return this;
    }
}
exports.TypeMixin = TypeMixin;
function typeMixin(node) {
    return new TypeMixin(node);
}
exports.typeMixin = typeMixin;
class NamedTypeMixin {
    constructor(node) {
        this.node = node;
    }
    getNamedType() {
        return internal_1.Api.namedTypeApi(this.node.type);
    }
    getTypename() {
        return this.node.type.name.value;
    }
    setTypename(typename) {
        utils_1.mutable(this.node.type.name).value = typename;
        return this;
    }
}
exports.NamedTypeMixin = NamedTypeMixin;
function namedTypeMixin(node) {
    return new TypeMixin(node);
}
exports.namedTypeMixin = namedTypeMixin;
