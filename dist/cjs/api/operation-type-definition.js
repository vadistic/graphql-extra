"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class OperationTypeDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NamedTypeMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.OPERATION_TYPE_DEFINITION, node);
    }
    getOperation() {
        return this.node.operation;
    }
    setOperation(operation) {
        utils_1.mutable(this.node).operation = operation;
        return this;
    }
    getType() {
        return internal_1.Api.namedTypeApi(this.node.type);
    }
    setType(type) {
        utils_1.mutable(this.node).type = utils_1.applyProps(internal_1.Ast.namedTypeNode, type);
        return this;
    }
}
exports.OperationTypeDefinitionApi = OperationTypeDefinitionApi;
function operationTypeDefinitionApi(node) {
    return new OperationTypeDefinitionApi(node);
}
exports.operationTypeDefinitionApi = operationTypeDefinitionApi;
