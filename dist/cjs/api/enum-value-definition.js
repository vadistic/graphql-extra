"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class EnumValueDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.ENUM_VALUE_DEFINITION, node);
    }
}
exports.EnumValueDefinitionApi = EnumValueDefinitionApi;
function enumValueDefinitionApi(node) {
    return new EnumValueDefinitionApi(node);
}
exports.enumValueDefinitionApi = enumValueDefinitionApi;
