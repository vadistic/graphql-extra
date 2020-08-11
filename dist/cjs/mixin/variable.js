"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class VariableMixin {
    constructor(node) {
        this.node = node;
    }
    getVariableName() {
        return this.node.variable.name.value;
    }
    getVariable() {
        return internal_1.Api.variableApi(this.node.variable);
    }
    hasVariable(variablename) {
        return this.node.variable.name.value === variablename;
    }
    setVariable(props) {
        this.node.variable = utils_1.applyProps(internal_1.Ast.variableNode, props);
        return this;
    }
}
exports.VariableMixin = VariableMixin;
function variableMixin(node) {
    return new VariableMixin(node);
}
exports.variableMixin = variableMixin;
