"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class UnionTypesMixin {
    constructor(node) {
        this.node = node;
        this._types = new utils_1.Crud({
            parent: this.node,
            key: 'types',
            api: internal_1.Api.namedTypeApi,
            factory: internal_1.Ast.namedTypeNode,
            matcher: (node) => node.name.value,
        });
    }
    getTypenames() {
        return this._types.findManyNames();
    }
    hasTypename(typename) {
        return this._types.has(typename);
    }
    getTypes() {
        return this._types.findMany();
    }
    getType(typename) {
        return this._types.findOneOrFail(typename);
    }
    createType(props) {
        this._types.create(props);
        return this;
    }
    updateType(typename, props) {
        this._types.update(typename, props);
        return this;
    }
    upsertType(props) {
        this._types.upsert(props);
        return this;
    }
    removeType(typename) {
        this._types.remove(typename);
        return this;
    }
}
exports.UnionTypesMixin = UnionTypesMixin;
function unionTypesMixin(node) {
    return new UnionTypesMixin(node);
}
exports.unionTypesMixin = unionTypesMixin;
