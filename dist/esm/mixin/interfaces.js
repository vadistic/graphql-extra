import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class InterfacesMixin {
    constructor(node) {
        this.node = node;
        this._interfaces = new Crud({
            parent: this.node,
            key: 'interfaces',
            api: Api.namedTypeApi,
            factory: Ast.namedTypeNode,
            matcher: (node) => node.name.value,
        });
    }
    getInterfaces() {
        return this._interfaces.findMany();
    }
    getInterfaceNames() {
        return this._interfaces.findManyNames();
    }
    hasInterface(typename) {
        return this._interfaces.has(typename);
    }
    getInterface(typename) {
        return this._interfaces.findOneOrFail(typename);
    }
    createInterface(props) {
        this._interfaces.create(props);
        return this;
    }
    updateInterface(typename, props) {
        this._interfaces.update(typename, props);
        return this;
    }
    upsertInterface(props) {
        this._interfaces.upsert(props);
        return this;
    }
    removeInterface(typename) {
        this._interfaces.remove(typename);
        return this;
    }
}
export function interfacesMixin(node) {
    return new InterfacesMixin(node);
}
