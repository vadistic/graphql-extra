import { Api, Ast } from '../internal';
import { Crud } from '../utils';
export class EnumValueDefinitionMixin {
    constructor(node) {
        this.node = node;
        this._values = new Crud({
            parent: this.node,
            key: 'values',
            api: Api.enumValueDefinitionApi,
            factory: Ast.enumValueDefinitionNode,
            matcher: (node) => node.name.value,
        });
    }
    hasValue(fieldname) {
        return this._values.has(fieldname);
    }
    getValue(fieldname) {
        return this._values.findOneOrFail(fieldname);
    }
    getValues() {
        return this._values.findMany();
    }
    getValueNames() {
        return this._values.findManyNames();
    }
    createValue(props) {
        this._values.create(props);
        return this;
    }
    updateValue(fieldname, props) {
        this._values.update(fieldname, props);
        return this;
    }
    upsertValue(props) {
        this._values.upsert(props);
        return this;
    }
    removeValue(fieldname) {
        this._values.remove(fieldname);
        return this;
    }
}
export function enumValueDefinitionMixin(node) {
    return new EnumValueDefinitionMixin(node);
}
