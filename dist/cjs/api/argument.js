"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class ArgumentApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.ARGUMENT, node);
    }
    getValue() {
        return this.node.value;
    }
    setValue(value) {
        utils_1.mutable(this.node).value = value;
        return this;
    }
}
exports.ArgumentApi = ArgumentApi;
function argumentApi(node) {
    return new internal_1.Api.ArgumentApi(node);
}
exports.argumentApi = argumentApi;
