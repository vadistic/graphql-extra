export const mutable = (node) => node;
export const deepMutable = (node) => node;
export const concat = (arr, ...els) => {
    for (const el of els) {
        arr[arr.length] = el;
    }
    return arr;
};
