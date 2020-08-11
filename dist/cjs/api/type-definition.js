"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class ObjectTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.FieldDefinitionsMixin, internal_1.Mixin.InterfacesMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.OBJECT_TYPE_DEFINITION, node);
    }
}
exports.ObjectTypeApi = ObjectTypeApi;
function objectTypeApi(node) {
    return new ObjectTypeApi(node);
}
exports.objectTypeApi = objectTypeApi;
class InterfaceTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.FieldDefinitionsMixin, internal_1.Mixin.InterfacesMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INTERFACE_TYPE_DEFINITION, node);
    }
}
exports.InterfaceTypeApi = InterfaceTypeApi;
function interfaceTypeApi(node) {
    return new InterfaceTypeApi(node);
}
exports.interfaceTypeApi = interfaceTypeApi;
class UnionTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.UnionTypesMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.UNION_TYPE_DEFINITION, node);
    }
}
exports.UnionTypeApi = UnionTypeApi;
function unionTypeApi(node) {
    return new UnionTypeApi(node);
}
exports.unionTypeApi = unionTypeApi;
class ScalarTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.SCALAR_TYPE_DEFINITION, node);
    }
}
exports.ScalarTypeApi = ScalarTypeApi;
function scalarTypeApi(node) {
    return new ScalarTypeApi(node);
}
exports.scalarTypeApi = scalarTypeApi;
class EnumTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.EnumValueDefinitionMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.ENUM_TYPE_DEFINITION, node);
    }
}
exports.EnumTypeApi = EnumTypeApi;
function enumTypeApi(node) {
    return new EnumTypeApi(node);
}
exports.enumTypeApi = enumTypeApi;
class InputTypeApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.InputValuesAsFieldsMixin, internal_1.Mixin.TypeDefinitionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION, node);
    }
}
exports.InputTypeApi = InputTypeApi;
function inputTypeApi(node) {
    return new InputTypeApi(node);
}
exports.inputTypeApi = inputTypeApi;
