"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class InputValueDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.TypeMixin, internal_1.Mixin.DefaultValueMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INPUT_VALUE_DEFINITION, node);
    }
    toField() {
        const { kind, defaultValue, loc, ...rest } = this.node;
        return internal_1.Api.fieldDefinitionApi({ kind: graphql_1.Kind.FIELD_DEFINITION, ...rest });
    }
}
exports.InputValueDefinitionApi = InputValueDefinitionApi;
function inputValueDefinitionApi(node) {
    return new internal_1.Api.InputValueDefinitionApi(node);
}
exports.inputValueDefinitionApi = inputValueDefinitionApi;
