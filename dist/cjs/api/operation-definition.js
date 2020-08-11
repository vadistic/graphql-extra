"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class OperationDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameOptionalMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.SelectionSetMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.OPERATION_DEFINITION, node);
    }
    getOperationType() {
        return this.node.operation;
    }
    setOperationType(operation) {
        utils_1.mutable(this.node).operation = operation;
        return this;
    }
}
exports.OperationDefinitionApi = OperationDefinitionApi;
function operationDefinitionApi(node) {
    return new OperationDefinitionApi(node);
}
exports.operationDefinitionApi = operationDefinitionApi;
