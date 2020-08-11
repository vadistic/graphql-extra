"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class SelectionSetApi extends ts_mixer_1.Mixin(internal_1.Mixin.SelectionSetMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.SELECTION_SET, node);
    }
}
exports.SelectionSetApi = SelectionSetApi;
function selectionSetApi(node) {
    return new SelectionSetApi(node);
}
exports.selectionSetApi = selectionSetApi;
