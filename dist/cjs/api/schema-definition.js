"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class SchemaDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.OperationTypeDefinitionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.SCHEMA_DEFINITION, node);
    }
}
exports.SchemaDefinitionApi = SchemaDefinitionApi;
function schemaDefinitionApi(node) {
    return new SchemaDefinitionApi(node);
}
exports.schemaDefinitionApi = schemaDefinitionApi;
class SchemaExtensionApi extends ts_mixer_1.Mixin(internal_1.Mixin.DirectivesMixin, internal_1.Mixin.OperationTypeDefinitionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.SCHEMA_EXTENSION, node);
    }
}
exports.SchemaExtensionApi = SchemaExtensionApi;
function schemaExtensionApi(node) {
    return new SchemaExtensionApi(node);
}
exports.schemaExtensionApi = schemaExtensionApi;
