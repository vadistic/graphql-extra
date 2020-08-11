"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lazy = (cb) => {
    let store;
    return () => {
        if (store)
            return store;
        store = cb();
        return store;
    };
};
