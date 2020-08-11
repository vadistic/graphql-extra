"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class ObjectExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.FieldDefinitionsMixin, internal_1.Mixin.InterfacesMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.OBJECT_TYPE_EXTENSION, node);
    }
}
exports.ObjectExtApi = ObjectExtApi;
function objectExtApi(node) {
    return new ObjectExtApi(node);
}
exports.objectExtApi = objectExtApi;
class InterfaceExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.FieldDefinitionsMixin, internal_1.Mixin.InterfacesMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INTERFACE_TYPE_EXTENSION, node);
    }
}
exports.InterfaceExtApi = InterfaceExtApi;
function interfaceExtApi(node) {
    return new InterfaceExtApi(node);
}
exports.interfaceExtApi = interfaceExtApi;
class UnionExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.UnionTypesMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.UNION_TYPE_EXTENSION, node);
    }
}
exports.UnionExtApi = UnionExtApi;
function unionExtApi(node) {
    return new UnionExtApi(node);
}
exports.unionExtApi = unionExtApi;
class ScalarExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.SCALAR_TYPE_EXTENSION, node);
    }
}
exports.ScalarExtApi = ScalarExtApi;
function scalarExtApi(node) {
    return new ScalarExtApi(node);
}
exports.scalarExtApi = scalarExtApi;
class EnumExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.EnumValueDefinitionMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.ENUM_TYPE_EXTENSION, node);
    }
}
exports.EnumExtApi = EnumExtApi;
function enumExtApi(node) {
    return new EnumExtApi(node);
}
exports.enumExtApi = enumExtApi;
class InputExtApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.InputValuesAsFieldsMixin, internal_1.Mixin.TypeExtensionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION, node);
    }
}
exports.InputExtApi = InputExtApi;
function inputExtApi(node) {
    return new InputExtApi(node);
}
exports.inputExtApi = inputExtApi;
