"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
class KindAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isKind(kind) {
        return this.node.kind === kind;
    }
    assertKind(kind) {
        if (this.isKind(kind))
            return this;
        throw utils_1.assertionError(kind, this.node);
    }
}
exports.KindAssertionMixin = KindAssertionMixin;
function kindAssertionMixin(node) {
    return new KindAssertionMixin(node);
}
exports.kindAssertionMixin = kindAssertionMixin;
