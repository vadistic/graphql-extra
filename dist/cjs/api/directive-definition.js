"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const ts_mixer_1 = require("ts-mixer");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class DirectiveDefinitionApi extends ts_mixer_1.Mixin(internal_1.Mixin.NameMixin, internal_1.Mixin.DescriptionMixin, internal_1.Mixin.InputValuesAsArgumentsMixin, internal_1.Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        this._locations = new utils_1.Crud({
            api: (node) => node.value,
            factory: internal_1.Ast.nameNode,
            key: 'locations',
            matcher: (node) => node.value,
            parent: this.node,
        });
        utils_1.validateNodeKind(graphql_1.Kind.DIRECTIVE_DEFINITION, node);
    }
    isRepeatable() {
        return this.node.repeatable;
    }
    setRepeatable(value = true) {
        utils_1.mutable(this.node).repeatable = value;
        return this;
    }
    hasLocation(location) {
        return this._locations.test(location);
    }
    getLocations() {
        return this._locations.findMany();
    }
    setLocations(locations) {
        this._locations.set(locations);
        return this;
    }
    createLocation(location) {
        this._locations.create(location);
        return this;
    }
    removeLocation(location) {
        this._locations.remove(location);
        return this;
    }
}
exports.DirectiveDefinitionApi = DirectiveDefinitionApi;
function directiveDefinitionApi(node) {
    return new internal_1.Api.DirectiveDefinitionApi(node);
}
exports.directiveDefinitionApi = directiveDefinitionApi;
