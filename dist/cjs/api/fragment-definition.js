"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class FragmentDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.SelectionSetMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.FRAGMENT_DEFINITION, node);
    }
}
exports.FragmentDefinitionApi = FragmentDefinitionApi;
function fragmentDefinitionApi(node) {
    return new FragmentDefinitionApi(node);
}
exports.fragmentDefinitionApi = fragmentDefinitionApi;
