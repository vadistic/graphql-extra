"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class NameMixin {
    constructor(node) {
        this.node = node;
    }
    getName() {
        return this.node.name.value;
    }
    setName(value) {
        utils_1.mutable(this.node).name = internal_1.Ast.nameNode(value);
        return this;
    }
}
exports.NameMixin = NameMixin;
function nameMixin(node) {
    return new NameMixin(node);
}
exports.nameMixin = nameMixin;
class NameOptionalMixin {
    constructor(node) {
        this.node = node;
    }
    getName() {
        var _a;
        return (_a = this.node.name) === null || _a === void 0 ? void 0 : _a.value;
    }
    setName(value) {
        utils_1.mutable(this.node).name = internal_1.Ast.nameNode(value);
        return this;
    }
}
exports.NameOptionalMixin = NameOptionalMixin;
function nameOptionalMixin(node) {
    return new NameOptionalMixin(node);
}
exports.nameOptionalMixin = nameOptionalMixin;
