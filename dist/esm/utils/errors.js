import { GraphQLError, } from 'graphql';
import { getName } from './get-name';
export function validationError(kinds, node) {
    const message = `${node.kind} node "${getName(node)}" does not meet constraint `
        + (Array.isArray(kinds) ? kinds.join(' | ') : kinds + '');
    return new GraphQLError(message, node);
}
export function assertionError(kind, node) {
    const message = `${node.kind} node "${getName(node)}" cannot be asserted as ${kind}`;
    return new GraphQLError(message, node);
}
export function validateNodeKind(kind, node) {
    if (node.kind !== kind) {
        throw validationError(kind, node);
    }
}
export function validateNodeKindsArr(kinds, node) {
    if (!kinds.includes(node.kind)) {
        throw validationError(kinds, node);
    }
}
