"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clone_deep_1 = require("./clone-deep");
function isAstNode(input) {
    return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string';
}
exports.isAstNode = isAstNode;
function isPrimitive(value) {
    return (value === null
        || typeof value === 'string'
        || typeof value === 'number'
        || typeof value === 'boolean');
}
exports.isPrimitive = isPrimitive;
const nullableFn = (fn) => (arg) => {
    if (arg) {
        return fn(arg);
    }
    return undefined;
};
const nullableImplicitFn = (fn) => (arg) => {
    if (arg !== undefined)
        return fn(arg);
    return undefined;
};
const arrayableFn = (fn) => (arr) => arr.map(fn);
const propsOrNodeFn = (fn) => (props) => (isAstNode(props) ? props : (props ? fn(props) : undefined));
const partialFn = (fn) => (props) => {
    const partial = fn(props);
    Object.keys(partial).forEach((key) => {
        if (partial[key] === undefined) {
            delete partial[key];
        }
    });
    return partial;
};
const clonedFn = (fn) => (props) => fn(clone_deep_1.cloneDeep(props));
function applyNullable(fn, props) {
    return nullableFn(fn)(props);
}
exports.applyNullable = applyNullable;
function applyNullableImplicit(fn, props) {
    return nullableImplicitFn(fn)(props);
}
exports.applyNullableImplicit = applyNullableImplicit;
function applyProps(fn, props) {
    return nullableImplicitFn(propsOrNodeFn(fn))(props);
}
exports.applyProps = applyProps;
function applyPropsArr(fn, props) {
    return nullableImplicitFn(arrayableFn(propsOrNodeFn(fn)))(props);
}
exports.applyPropsArr = applyPropsArr;
function applyPropsNullable(fn, props) {
    return nullableFn(propsOrNodeFn(fn))(props);
}
exports.applyPropsNullable = applyPropsNullable;
function applyPropsNullableArr(fn, props) {
    return nullableFn(arrayableFn(propsOrNodeFn(fn)))(props);
}
exports.applyPropsNullableArr = applyPropsNullableArr;
function applyPropsCloned(fn, props) {
    return nullableImplicitFn(clonedFn(fn))(props);
}
exports.applyPropsCloned = applyPropsCloned;
function applyPropsPartial(fn, props) {
    return nullableImplicitFn(partialFn(fn))(props);
}
exports.applyPropsPartial = applyPropsPartial;
function applyPropsClonedPartial(fn, props) {
    return nullableImplicitFn(clonedFn(partialFn(fn)))(props);
}
exports.applyPropsClonedPartial = applyPropsClonedPartial;
