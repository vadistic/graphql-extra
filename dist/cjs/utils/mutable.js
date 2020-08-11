"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutable = (node) => node;
exports.deepMutable = (node) => node;
exports.concat = (arr, ...els) => {
    for (const el of els) {
        arr[arr.length] = el;
    }
    return arr;
};
