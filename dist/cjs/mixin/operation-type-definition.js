"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class OperationTypeDefinitionMixin {
    constructor(node) {
        this.node = node;
        this._operationTypes = new utils_1.Crud({
            parent: this.node,
            key: 'operationTypes',
            factory: internal_1.Ast.operationTypeDefinitionNode,
            api: internal_1.Api.operationTypeDefinitionApi,
            matcher: (node) => node.operation,
        });
    }
    getOperationType(operation) {
        return this._operationTypes.findOne(operation);
    }
    getOperationTypename(operation) {
        var _a;
        return (_a = this._operationTypes.findOne(operation)) === null || _a === void 0 ? void 0 : _a.getTypename();
    }
    hasOperationType(operation) {
        return !!this._operationTypes.has(operation);
    }
    getOperationTypes() {
        return this._operationTypes.findMany();
    }
    getOperationTypenames() {
        var _a, _b;
        return (_b = (_a = this.node.operationTypes) === null || _a === void 0 ? void 0 : _a.map((op) => op.type.name.value)) !== null && _b !== void 0 ? _b : [];
    }
    createOperationType(props) {
        this._operationTypes.create(props);
        return this;
    }
    updateOperationType(operation, props) {
        this._operationTypes.update(operation, props);
        return this;
    }
    upsertOperationType(props) {
        this._operationTypes.upsert(props);
        return this;
    }
    removeOperationType(operation) {
        this._operationTypes.remove(operation);
        return this;
    }
    getQuery() {
        return this._operationTypes.findOne('query');
    }
    getMutation() {
        return this._operationTypes.findOne('mutation');
    }
    getSubscription() {
        return this._operationTypes.findOne('subscription');
    }
    getQueryTypename() {
        var _a;
        return (_a = this._operationTypes.findOne('query')) === null || _a === void 0 ? void 0 : _a.getTypename();
    }
    getMutationTypename() {
        var _a;
        return (_a = this._operationTypes.findOne('mutation')) === null || _a === void 0 ? void 0 : _a.getTypename();
    }
    getSubscriptionTypename() {
        var _a;
        return (_a = this._operationTypes.findOne('subscription')) === null || _a === void 0 ? void 0 : _a.getTypename();
    }
}
exports.OperationTypeDefinitionMixin = OperationTypeDefinitionMixin;
function operationTypeDefinitionMixin(node) {
    return new OperationTypeDefinitionMixin(node);
}
exports.operationTypeDefinitionMixin = operationTypeDefinitionMixin;
