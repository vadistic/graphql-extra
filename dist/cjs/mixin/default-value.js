"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class DefaultValueMixin {
    constructor(node) {
        this.node = node;
    }
    hasDefaultValue() {
        return !!this.node.defaultValue;
    }
    getDefaultValue() {
        return utils_1.applyNullable(internal_1.Api.valueApi, this.node.defaultValue);
    }
    setDefaultValue(props) {
        this.node.defaultValue = utils_1.applyPropsNullable(internal_1.Ast.valueNode, props);
        return this;
    }
}
exports.DefaultValueMixin = DefaultValueMixin;
function defaultValueMixin(node) {
    return new DefaultValueMixin(node);
}
exports.defaultValueMixin = defaultValueMixin;
