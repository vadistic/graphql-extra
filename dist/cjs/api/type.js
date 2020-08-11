"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class TypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKindsArr([graphql_1.Kind.NAMED_TYPE, graphql_1.Kind.LIST_TYPE, graphql_1.Kind.NON_NULL_TYPE], node);
    }
    getNamedType() {
        return this._getNamedType(this.node);
    }
    getTypename() {
        return this._getNamedType(this.node).name.value;
    }
    setTypename(value) {
        utils_1.mutable(this._getNamedType(this.node)).name = internal_1.Ast.nameNode(value);
        return this;
    }
    setType(props) {
        Object.assign(this.node, utils_1.applyPropsCloned(internal_1.Ast.typeNode, props));
        return this;
    }
    isNonNull(deep = true) {
        if (!deep) {
            return this.node.kind === graphql_1.Kind.NON_NULL_TYPE;
        }
        return this._isNonNullDeep(this.node);
    }
    isList(deep = true) {
        if (!deep) {
            return this.node.kind === graphql_1.Kind.LIST_TYPE;
        }
        return this._isListDeep(this.node);
    }
    setNonNull(value = true) {
        if (value && this.node.kind !== graphql_1.Kind.NON_NULL_TYPE) {
            Object.assign(this.node, internal_1.Ast.nonNullTypeNode(this.node));
        }
        if (!value && this.node.kind === graphql_1.Kind.NON_NULL_TYPE) {
            Object.assign(this.node, this.node.type);
        }
        return this;
    }
    setList(value = true) {
        if (value && this.node.kind !== graphql_1.Kind.LIST_TYPE) {
            Object.assign(this.node, internal_1.Ast.listTypeNode(this.node));
        }
        if (!value && this.node.kind === graphql_1.Kind.LIST_TYPE) {
            Object.assign(this.node, this.node.type);
        }
        return this;
    }
    _getNamedType(type) {
        return type.kind === graphql_1.Kind.NAMED_TYPE ? type : this._getNamedType(type.type);
    }
    _isNonNullDeep(type) {
        if (type.kind === graphql_1.Kind.NON_NULL_TYPE)
            return true;
        if (type.kind === graphql_1.Kind.NAMED_TYPE)
            return false;
        return this._isNonNullDeep(type.type);
    }
    _isListDeep(type) {
        if (type.kind === graphql_1.Kind.LIST_TYPE)
            return true;
        if (type.kind === graphql_1.Kind.NAMED_TYPE)
            return false;
        return this._isListDeep(type.type);
    }
}
exports.TypeApi = TypeApi;
function typeApi(node) {
    return new TypeApi(node);
}
exports.typeApi = typeApi;
class NamedTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.NAMED_TYPE, node);
    }
    getTypename() {
        return this.node.name.value;
    }
    setTypename(value) {
        utils_1.mutable(this.node).name = internal_1.Ast.nameNode(value);
        return this;
    }
}
exports.NamedTypeApi = NamedTypeApi;
function namedTypeApi(node) {
    return new NamedTypeApi(node);
}
exports.namedTypeApi = namedTypeApi;
