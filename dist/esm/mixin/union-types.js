import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class UnionTypesMixin {
    constructor(node) {
        this.node = node;
        this._types = new Crud({
            parent: this.node,
            key: 'types',
            api: Api.namedTypeApi,
            factory: Ast.namedTypeNode,
            matcher: (node) => node.name.value,
        });
    }
    getTypenames() {
        return this._types.findManyNames();
    }
    hasTypename(typename) {
        return this._types.has(typename);
    }
    getTypes() {
        return this._types.findMany();
    }
    getType(typename) {
        return this._types.findOneOrFail(typename);
    }
    createType(props) {
        this._types.create(props);
        return this;
    }
    updateType(typename, props) {
        this._types.update(typename, props);
        return this;
    }
    upsertType(props) {
        this._types.upsert(props);
        return this;
    }
    removeType(typename) {
        this._types.remove(typename);
        return this;
    }
}
export function unionTypesMixin(node) {
    return new UnionTypesMixin(node);
}
