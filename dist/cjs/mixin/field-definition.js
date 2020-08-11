"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internal_1 = require("../internal");
const utils_1 = require("../utils");
class FieldDefinitionsMixin {
    constructor(node) {
        this.node = node;
        this._fields = new utils_1.Crud({
            parent: this.node,
            key: 'fields',
            api: internal_1.Api.fieldDefinitionApi,
            factory: internal_1.Ast.fieldDefinitionNode,
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
        return this._fields.findMany().filter((field) => field.getTypename() === typename);
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
    updateField(fieldname, props) {
        this._fields.update(fieldname, props);
        return this;
    }
    upsertField(props) {
        this._fields.upsert(props);
        return this;
    }
    removeField(fieldname) {
        this._fields.remove(fieldname);
        return this;
    }
    getFieldTypename(fieldname) {
        return this._fields.findOneOrFail(fieldname).getTypename();
    }
    setFieldTypename(fieldname, value) {
        this._fields.findOneOrFail(fieldname).setTypename(value);
        return this;
    }
    getFieldType(fieldname) {
        return this._fields.findOneOrFail(fieldname).getType();
    }
    setFieldType(fieldname, props) {
        this._fields.findOneOrFail(fieldname).setType(props);
        return this;
    }
    getFieldArguments(fieldname) {
        return this._fields.findOneOrFail(fieldname).getArguments();
    }
    getFieldDirectives(fieldname) {
        return this._fields.findOneOrFail(fieldname).getDirectives();
    }
}
exports.FieldDefinitionsMixin = FieldDefinitionsMixin;
function fieldDefinitionsMixin(node) {
    return new FieldDefinitionsMixin(node);
}
exports.fieldDefinitionsMixin = fieldDefinitionsMixin;
