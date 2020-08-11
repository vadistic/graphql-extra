"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class DescriptionMixin {
    constructor(node) {
        this.node = node;
    }
    hasDescription(value) {
        var _a, _b;
        if (value) {
            return ((_a = this.node.description) === null || _a === void 0 ? void 0 : _a.value) === value;
        }
        return !!((_b = this.node.description) === null || _b === void 0 ? void 0 : _b.value);
    }
    getDescription() {
        var _a;
        return (_a = this.node.description) === null || _a === void 0 ? void 0 : _a.value;
    }
    setDescription(value) {
        if (!value) {
            utils_1.mutable(this.node).description = undefined;
        }
        else {
            utils_1.mutable(this.node).description = internal_1.Ast.stringValueNode(value);
        }
        return this;
    }
}
exports.DescriptionMixin = DescriptionMixin;
function descriptionMixin(node) {
    return new DescriptionMixin(node);
}
exports.descriptionMixin = descriptionMixin;
