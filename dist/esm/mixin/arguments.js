import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class ArgumentsMixin {
    constructor(node) {
        this.node = node;
        this._arguments = new Crud({
            parent: this.node,
            key: 'arguments',
            api: Api.argumentApi,
            factory: Ast.argumentNode,
            matcher: (node) => node.name.value,
        });
    }
    getArgumentNames() {
        return this._arguments.findManyNames();
    }
    hasArgument(argname) {
        return this._arguments.has(argname);
    }
    getArguments() {
        return this._arguments.findMany();
    }
    getArgument(argname) {
        return this._arguments.findOneOrFail(argname);
    }
    createArgument(props) {
        this._arguments.create(props);
        return this;
    }
    updateArgument(argname, props) {
        this._arguments.update(argname, props);
        return this;
    }
    upsertArgument(props) {
        this._arguments.upsert(props);
        return this;
    }
    removeArgument(argname) {
        this._arguments.remove(argname);
        return this;
    }
}
export function argumentsMixin(node) {
    return new ArgumentsMixin(node);
}
