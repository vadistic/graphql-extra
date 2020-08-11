import { Ast } from '../internal';
import { mutable } from '../utils';
export class NameMixin {
    constructor(node) {
        this.node = node;
    }
    getName() {
        return this.node.name.value;
    }
    setName(value) {
        mutable(this.node).name = Ast.nameNode(value);
        return this;
    }
}
export function nameMixin(node) {
    return new NameMixin(node);
}
export class NameOptionalMixin {
    constructor(node) {
        this.node = node;
    }
    getName() {
        var _a;
        return (_a = this.node.name) === null || _a === void 0 ? void 0 : _a.value;
    }
    setName(value) {
        mutable(this.node).name = Ast.nameNode(value);
        return this;
    }
}
export function nameOptionalMixin(node) {
    return new NameOptionalMixin(node);
}
