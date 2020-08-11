"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class ArgumentsMixin {
    constructor(node) {
        this.node = node;
        this._arguments = new utils_1.Crud({
            parent: this.node,
            key: 'arguments',
            api: internal_1.Api.argumentApi,
            factory: internal_1.Ast.argumentNode,
            matcher: (node) => node.name.value,
        });
    }
    getArgumentNames() {
        return this._arguments.findManyNames();
    }
    hasArgument(argname) {
        return this._arguments.has(argname);
    }
    getArguments() {
        return this._arguments.findMany();
    }
    getArgument(argname) {
        return this._arguments.findOneOrFail(argname);
    }
    createArgument(props) {
        this._arguments.create(props);
        return this;
    }
    updateArgument(argname, props) {
        this._arguments.update(argname, props);
        return this;
    }
    upsertArgument(props) {
        this._arguments.upsert(props);
        return this;
    }
    removeArgument(argname) {
        this._arguments.remove(argname);
        return this;
    }
}
exports.ArgumentsMixin = ArgumentsMixin;
function argumentsMixin(node) {
    return new ArgumentsMixin(node);
}
exports.argumentsMixin = argumentsMixin;
