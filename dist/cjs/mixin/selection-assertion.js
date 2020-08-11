"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const utils_1 = require("../utils");
class SelectionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isField() {
        return this.node.kind === graphql_1.Kind.FIELD;
    }
    isFragmentSpread() {
        return this.node.kind === graphql_1.Kind.FRAGMENT_SPREAD;
    }
    isInflineFragment() {
        return this.node.kind === graphql_1.Kind.INLINE_FRAGMENT;
    }
    assertField() {
        if (this.isField())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.FIELD, this.node);
    }
    assertFragmentSpread() {
        if (this.isFragmentSpread())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.FRAGMENT_SPREAD, this.node);
    }
    assertInflineFragment() {
        if (this.isInflineFragment())
            return this;
        throw utils_1.assertionError(graphql_1.Kind.INLINE_FRAGMENT, this.node);
    }
}
exports.SelectionAssertionMixin = SelectionAssertionMixin;
function selectionMixin(node) {
    return new SelectionAssertionMixin(node);
}
exports.selectionMixin = selectionMixin;
