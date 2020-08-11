"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const apply_props_1 = require("./apply-props");
const get_name_1 = require("./get-name");
const match_node_1 = require("./match-node");
const mutable_1 = require("./mutable");
class Crud {
    constructor(config) {
        this.config = config;
        if (!config.ref && !config.parent[config.key]) {
            config.parent[config.key] = [];
        }
    }
    get arr() {
        if (this.config.ref) {
            return this.config.ref();
        }
        return this.config.parent[this.config.key];
    }
    set arr(next) {
        if (this.config.ref) {
            this.config.ref(next);
        }
        else {
            this.config.parent[this.config.key] = next;
        }
    }
    get arrOfKind() {
        if (!this.config.kindFilter)
            return this.arr;
        return this.arr.filter((node) => this.config.kindFilter.includes(node.kind));
    }
    has(filter) {
        const pred = this._filter(filter);
        return this.arrOfKind.some(pred);
    }
    test(filter) {
        const pred = this._filter(filter);
        return this.arrOfKind.some(pred);
    }
    set(props) {
        this.arr = apply_props_1.applyPropsArr(this.config.factory, props);
        return this;
    }
    findOneNode(filter) {
        const pred = this._filter(filter);
        return this.arrOfKind.find(pred);
    }
    findOneNodeIndex(filter) {
        const pred = this._filter(filter);
        return this.arr.findIndex((node) => (!this.config.kindFilter || this.config.kindFilter.includes(node.kind)) && pred(node));
    }
    findOneNodeOrFail(filter) {
        const pred = this._filter(filter);
        const el = this.arrOfKind.find(pred);
        if (!el) {
            const msg = `cannot find ${this._target(filter)} in ${this._location()} because it does not exist`;
            throw new graphql_1.GraphQLError(msg, this.config.parent);
        }
        return el;
    }
    findManyNodes(filter) {
        if (filter === undefined)
            return this.arrOfKind;
        const pred = this._filter(filter);
        return this.arrOfKind.filter(pred);
    }
    findManyNodeIndicies(filter) {
        if (filter === undefined)
            return this.arr.map((node, i) => i);
        const pred = this._filter(filter);
        return this.arrOfKind.map((node, i) => pred(node) && i).filter((i) => typeof i === 'number');
    }
    findOne(filter) {
        const el = this.findOneNode(filter);
        return apply_props_1.applyNullable(this.config.api, el);
    }
    findOneName(filter) {
        const el = this.findOneNode(filter);
        return apply_props_1.applyNullable(this.config.matcher, el);
    }
    findOneOrFail(filter) {
        const node = this.findOneNodeOrFail(filter);
        return this.config.api(node);
    }
    findMany(filter) {
        if (filter === undefined)
            return this.arrOfKind.map(this.config.api);
        return this.findManyNodes(filter).map(this.config.api);
    }
    findManyNames(filter) {
        const arr = this.findManyNodes(filter);
        return arr.map(this.config.matcher);
    }
    create(props) {
        const next = apply_props_1.applyPropsCloned(this.config.factory, props);
        const target = this.config.matcher(next);
        const prev = this.findOneNode(target);
        if (prev) {
            const msg = `cannot create ${this._target(props)} in ${this._location()} because it already exists`;
            throw new graphql_1.GraphQLError(msg, [prev, this.config.parent]);
        }
        mutable_1.concat(this.arr, next);
        return this;
    }
    upsert(props) {
        const next = apply_props_1.applyPropsCloned(this.config.factory, props);
        const target = this.config.matcher(next);
        const index = this.findOneNodeIndex(target);
        if (index === -1) {
            mutable_1.concat(this.arr, next);
        }
        else {
            this.arr[index] = next;
        }
        return this;
    }
    update(filter, props) {
        const next = apply_props_1.applyPropsClonedPartial(this.config.factory, props);
        const index = this.findOneNodeIndex(filter);
        if (index === -1) {
            const msg = `cannot update ${this._target(filter)} in ${this._location()} because it does not exist`;
            throw new graphql_1.GraphQLError(msg, this.config.parent);
        }
        this.arr[index] = { ...this.arr[index], ...next };
        return this;
    }
    remove(filter) {
        const index = this.findOneNodeIndex(filter);
        if (index === -1) {
            const msg = `cannot remove ${this._target(filter)} in ${this._location()} because it does not exist`;
            throw new graphql_1.GraphQLError(msg, this.config.parent);
        }
        this.arr.splice(index, 1);
        return this;
    }
    _target(filter) {
        const base = this.config.kindFilter ? this.config.kindFilter + ' ' : '';
        if (apply_props_1.isPrimitive(filter)) {
            return `${base}'${filter}'`;
        }
        const maybeName = get_name_1.getName(filter);
        if (maybeName !== 'unknown') {
            return `${base}'${maybeName}'`;
        }
        return `${base}'${JSON.stringify(filter)}'`;
    }
    _location() {
        let parentName = '';
        const maybeName = get_name_1.getName(this.config.parent);
        if (maybeName !== 'unknown' && maybeName !== this.config.parent.kind) {
            parentName = ` '${maybeName}'`;
        }
        return `${this.config.key} of ${this.config.parent.kind}${parentName}`;
    }
    _filter(filter) {
        if (apply_props_1.isPrimitive(filter)) {
            return (node) => this.config.matcher(node) === filter;
        }
        const subset = apply_props_1.applyPropsPartial(this.config.factory, filter);
        return (node) => match_node_1.matchNode(node, subset);
    }
}
exports.Crud = Crud;
