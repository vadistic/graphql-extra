"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class FieldDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.InputValuesAsArgumentsMixin, internal_1.Mixin.TypeMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.FIELD_DEFINITION, node);
    }
    toInputValue() {
        const { kind, arguments: args, loc, ...rest } = this.node;
        return internal_1.Api.inputValueDefinitionApi({ kind: graphql_1.Kind.INPUT_VALUE_DEFINITION, ...rest });
    }
}
exports.FieldDefinitionApi = FieldDefinitionApi;
function fieldDefinitionApi(node) {
    return new internal_1.Api.FieldDefinitionApi(node);
}
exports.fieldDefinitionApi = fieldDefinitionApi;
