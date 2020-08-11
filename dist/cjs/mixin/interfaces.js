"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class InterfacesMixin {
    constructor(node) {
        this.node = node;
        this._interfaces = new utils_1.Crud({
            parent: this.node,
            key: 'interfaces',
            api: internal_1.Api.namedTypeApi,
            factory: internal_1.Ast.namedTypeNode,
            matcher: (node) => node.name.value,
        });
    }
    getInterfaces() {
        return this._interfaces.findMany();
    }
    getInterfaceNames() {
        return this._interfaces.findManyNames();
    }
    hasInterface(typename) {
        return this._interfaces.has(typename);
    }
    getInterface(typename) {
        return this._interfaces.findOneOrFail(typename);
    }
    createInterface(props) {
        this._interfaces.create(props);
        return this;
    }
    updateInterface(typename, props) {
        this._interfaces.update(typename, props);
        return this;
    }
    upsertInterface(props) {
        this._interfaces.upsert(props);
        return this;
    }
    removeInterface(typename) {
        this._interfaces.remove(typename);
        return this;
    }
}
exports.InterfacesMixin = InterfacesMixin;
function interfacesMixin(node) {
    return new InterfacesMixin(node);
}
exports.interfacesMixin = interfacesMixin;
