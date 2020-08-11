"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cloneDeep(target) {
    if (target === null) {
        return target;
    }
    if (Array.isArray(target)) {
        return target.map((n) => cloneDeep(n));
    }
    if (typeof target === 'object' && target !== {}) {
        const copy = { ...target };
        for (const key of Object.keys(copy)) {
            copy[key] = cloneDeep(copy[key]);
        }
        return copy;
    }
    return target;
}
exports.cloneDeep = cloneDeep;
