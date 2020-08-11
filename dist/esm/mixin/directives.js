import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class DirectivesMixin {
    constructor(node) {
        this.node = node;
        this._directives = new Crud({
            parent: this.node,
            key: 'directives',
            api: Api.directiveApi,
            factory: Ast.directiveNode,
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
export function directivesMixin(node) {
    return new DirectivesMixin(node);
}
