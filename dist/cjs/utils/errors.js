"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const get_name_1 = require("./get-name");
function validationError(kinds, node) {
    const message = `${node.kind} node "${get_name_1.getName(node)}" does not meet constraint `
        + (Array.isArray(kinds) ? kinds.join(' | ') : kinds + '');
    return new graphql_1.GraphQLError(message, node);
}
exports.validationError = validationError;
function assertionError(kind, node) {
    const message = `${node.kind} node "${get_name_1.getName(node)}" cannot be asserted as ${kind}`;
    return new graphql_1.GraphQLError(message, node);
}
exports.assertionError = assertionError;
function validateNodeKind(kind, node) {
    if (node.kind !== kind) {
        throw validationError(kind, node);
    }
}
exports.validateNodeKind = validateNodeKind;
function validateNodeKindsArr(kinds, node) {
    if (!kinds.includes(node.kind)) {
        throw validationError(kinds, node);
    }
}
exports.validateNodeKindsArr = validateNodeKindsArr;
