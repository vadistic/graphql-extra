import { Ast } from '../internal';
import { mutable } from '../utils';
export class DescriptionMixin {
    constructor(node) {
        this.node = node;
    }
    hasDescription(value) {
        var _a, _b;
        if (value) {
            return ((_a = this.node.description) === null || _a === void 0 ? void 0 : _a.value) === value;
        }
        return !!((_b = this.node.description) === null || _b === void 0 ? void 0 : _b.value);
    }
    getDescription() {
        var _a;
        return (_a = this.node.description) === null || _a === void 0 ? void 0 : _a.value;
    }
    setDescription(value) {
        if (!value) {
            mutable(this.node).description = undefined;
        }
        else {
            mutable(this.node).description = Ast.stringValueNode(value);
        }
        return this;
    }
}
export function descriptionMixin(node) {
    return new DescriptionMixin(node);
}
