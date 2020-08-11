import { assertionError } from '../utils';
export class KindAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isKind(kind) {
        return this.node.kind === kind;
    }
    assertKind(kind) {
        if (this.isKind(kind))
            return this;
        throw assertionError(kind, this.node);
    }
}
export function kindAssertionMixin(node) {
    return new KindAssertionMixin(node);
}
