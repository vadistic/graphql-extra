"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function matchNode(main, subset) {
    if (main === subset) {
        return true;
    }
    if ((typeof main === 'object' && main != null) && (typeof subset === 'object' && subset != null)) {
        for (const prop of Object.keys(subset)) {
            if (prop === 'loc') {
                continue;
            }
            if (Object.prototype.hasOwnProperty.call(main, prop)) {
                if (!matchNode(main[prop], subset[prop])) {
                    return false;
                }
            }
            else
                return false;
        }
        return true;
    }
    if (subset === undefined && Array.isArray(main) && main.length === 0) {
        return true;
    }
    if (main === undefined && Array.isArray(subset) && subset.length === 0) {
        return true;
    }
    return false;
}
exports.matchNode = matchNode;
