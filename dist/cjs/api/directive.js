"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class DirectiveApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.ArgumentsMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.DIRECTIVE, node);
    }
}
exports.DirectiveApi = DirectiveApi;
function directiveApi(node) {
    return new DirectiveApi(node);
}
exports.directiveApi = directiveApi;
