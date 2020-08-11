"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class FieldApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.ArgumentsMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.SelectionSetMixin, internal_1.Mixin.SelectionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.FIELD, node);
    }
}
exports.FieldApi = FieldApi;
function fieldApi(node) {
    return new FieldApi(node);
}
exports.fieldApi = fieldApi;
class FragmentSpreadApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DirectivesMixin, internal_1.Mixin.SelectionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.FRAGMENT_SPREAD, node);
    }
}
exports.FragmentSpreadApi = FragmentSpreadApi;
function fragmentSpreadApi(node) {
    return new FragmentSpreadApi(node);
}
exports.fragmentSpreadApi = fragmentSpreadApi;
class InlineFragmentApi extends ts_mixer_1.Mixin(internal_1.Mixin.DirectivesMixin, internal_1.Mixin.SelectionSetMixin, internal_1.Mixin.SelectionAssertionMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        utils_1.validateNodeKind(graphql_1.Kind.INLINE_FRAGMENT, node);
    }
}
exports.InlineFragmentApi = InlineFragmentApi;
function inlineFragmentApi(node) {
    return new InlineFragmentApi(node);
}
exports.inlineFragmentApi = inlineFragmentApi;
exports.kindToSelectionApi = {
    Field: FieldApi,
    FragmentSpread: FragmentSpreadApi,
    InlineFragment: InlineFragmentApi,
};
function selectionApi(node) {
    const Clazz = exports.kindToSelectionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw utils_1.validationError([graphql_1.Kind.FIELD, graphql_1.Kind.FRAGMENT_SPREAD, graphql_1.Kind.INLINE_FRAGMENT], node);
}
exports.selectionApi = selectionApi;
