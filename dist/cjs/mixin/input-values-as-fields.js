"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class InputValuesAsFieldsMixin {
    constructor(node) {
        this.node = node;
        this._fields = new utils_1.Crud({
            parent: this.node,
            key: 'fields',
            api: internal_1.Api.inputValueDefinitionApi,
            factory: internal_1.Ast.inputValueDefinitionNode,
            matcher: (node) => node.name.value,
        });
    }
    getFieldnames() {
        return this._fields.findManyNames();
    }
    getFields() {
        return this._fields.findMany();
    }
    getFieldsByTypename(typename) {
        return this.getFields().filter((field) => field.getType().getTypename() === typename);
    }
    hasField(fieldname) {
        return this._fields.has(fieldname);
    }
    getField(fieldname) {
        return this._fields.findOneOrFail(fieldname);
    }
    createField(props) {
        this._fields.create(props);
        return this;
    }
    upsertField(props) {
        this._fields.upsert(props);
        return this;
    }
    updateField(fieldname, props) {
        this._fields.update(fieldname, props);
        return this;
    }
    removeField(fieldname) {
        this._fields.remove(fieldname);
        return this;
    }
    getFieldType(fieldname) {
        return this.getField(fieldname).getType();
    }
    setFieldType(fieldname, props) {
        this.getField(fieldname).setType(props);
        return this;
    }
    getFieldDefaultValue(fieldname) {
        return this.getField(fieldname).getDefaultValue();
    }
    setFieldDefualtValue(fieldname, props) {
        this.getField(fieldname).setDefaultValue(props);
        return this;
    }
}
exports.InputValuesAsFieldsMixin = InputValuesAsFieldsMixin;
function inputValuesAsFieldsMixin(node) {
    return new InputValuesAsFieldsMixin(node);
}
exports.inputValuesAsFieldsMixin = inputValuesAsFieldsMixin;
