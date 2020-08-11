"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class ValueApi extends ts_mixer_1.Mixin(internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKindsArr([graphql_1.Kind.INT, graphql_1.Kind.BOOLEAN, graphql_1.Kind.VARIABLE, graphql_1.Kind.FLOAT, graphql_1.Kind.STRING, graphql_1.Kind.NULL, graphql_1.Kind.ENUM, graphql_1.Kind.LIST, graphql_1.Kind.OBJECT], node);
    }
    toJs() {
        return graphql_1.valueFromASTUntyped(this.node);
    }
    set(props) {
        Object.assign(this.node, utils_1.applyProps(internal_1.Ast.valueNode, props));
        return this;
    }
}
exports.ValueApi = ValueApi;
function valueApi(node) {
    return new ValueApi(node);
}
exports.valueApi = valueApi;
