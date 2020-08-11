"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class EnumValueDefinitionMixin {
    constructor(node) {
        this.node = node;
        this._values = new utils_1.Crud({
            parent: this.node,
            key: 'values',
            api: internal_1.Api.enumValueDefinitionApi,
            factory: internal_1.Ast.enumValueDefinitionNode,
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
exports.EnumValueDefinitionMixin = EnumValueDefinitionMixin;
function enumValueDefinitionMixin(node) {
    return new EnumValueDefinitionMixin(node);
}
exports.enumValueDefinitionMixin = enumValueDefinitionMixin;
