import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class InputValuesAsArgumentsMixin {
    constructor(node) {
        this.node = node;
        this._arguments = new Crud({
            parent: this.node,
            key: 'arguments',
            api: Api.inputValueDefinitionApi,
            factory: Ast.inputValueDefinitionNode,
            matcher: (node) => node.name.value,
        });
    }
    getArgnames() {
        return this._arguments.findManyNames();
    }
    getArguments() {
        return this._arguments.findMany();
    }
    getArgumentsByTypename(typename) {
        return this._arguments.findMany().filter((arg) => arg.getTypename() === typename);
    }
    hasArgument(argname) {
        return this._arguments.has(argname);
    }
    getArgument(argname) {
        return this._arguments.findOneOrFail(argname);
    }
    createArgument(props) {
        this._arguments.create(props);
        return this;
    }
    upsertArgument(props) {
        this._arguments.upsert(props);
        return this;
    }
    updateArgument(argname, props) {
        this._arguments.update(argname, props);
        return this;
    }
    removeArgument(argname) {
        this._arguments.remove(argname);
        return this;
    }
    getArgumentType(argname) {
        return this._arguments.findOneOrFail(argname).getType();
    }
    setArgumentType(argname, props) {
        this._arguments.findOneOrFail(argname).setType(props);
        return this;
    }
    getArgumentDefaultValue(argname) {
        return this._arguments.findOneOrFail(argname).getDefaultValue();
    }
    setArgumentDefualtValue(argname, props) {
        this._arguments.findOneOrFail(argname).setDefaultValue(props);
        return this;
    }
}
