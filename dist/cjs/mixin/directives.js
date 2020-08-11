"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class DirectivesMixin {
    constructor(node) {
        this.node = node;
        this._directives = new utils_1.Crud({
            parent: this.node,
            key: 'directives',
            api: internal_1.Api.directiveApi,
            factory: internal_1.Ast.directiveNode,
            matcher: (node) => node.name.value,
        });
    }
    getDirectives() {
        return this._directives.findMany();
    }
    getDirectiveNames() {
        return this._directives.findManyNames();
    }
    hasDirective(directivename) {
        return this._directives.has(directivename);
    }
    getDirective(directivename) {
        return this._directives.findOneOrFail(directivename);
    }
    createDirective(props) {
        this._directives.create(props);
        return this;
    }
    updateDirective(directivename, props) {
        this._directives.update(directivename, props);
        return this;
    }
    upsertDirective(props) {
        this._directives.upsert(props);
        return this;
    }
    removeDirective(directivename) {
        this._directives.remove(directivename);
        return this;
    }
}
exports.DirectivesMixin = DirectivesMixin;
function directivesMixin(node) {
    return new DirectivesMixin(node);
}
exports.directivesMixin = directivesMixin;
