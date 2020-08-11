import { cloneDeep } from './clone-deep';
export function isAstNode(input) {
    return typeof input === 'object' && 'kind' in input && typeof input.kind === 'string';
}
export function isPrimitive(value) {
    return (value === null
        || typeof value === 'string'
        || typeof value === 'number'
        || typeof value === 'boolean');
}
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
const clonedFn = (fn) => (props) => fn(cloneDeep(props));
export function applyNullable(fn, props) {
    return nullableFn(fn)(props);
}
export function applyNullableImplicit(fn, props) {
    return nullableImplicitFn(fn)(props);
}
export function applyProps(fn, props) {
    return nullableImplicitFn(propsOrNodeFn(fn))(props);
}
export function applyPropsArr(fn, props) {
    return nullableImplicitFn(arrayableFn(propsOrNodeFn(fn)))(props);
}
export function applyPropsNullable(fn, props) {
    return nullableFn(propsOrNodeFn(fn))(props);
}
export function applyPropsNullableArr(fn, props) {
    return nullableFn(arrayableFn(propsOrNodeFn(fn)))(props);
}
export function applyPropsCloned(fn, props) {
    return nullableImplicitFn(clonedFn(fn))(props);
}
export function applyPropsPartial(fn, props) {
    return nullableImplicitFn(partialFn(fn))(props);
}
export function applyPropsClonedPartial(fn, props) {
    return nullableImplicitFn(clonedFn(partialFn(fn)))(props);
}
