export const lazy = (cb) => {
    let store;
    return () => {
        if (store)
            return store;
        store = cb();
        return store;
    };
};
