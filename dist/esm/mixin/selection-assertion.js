import { Kind } from 'graphql';
import { assertionError } from '../utils';
export class SelectionAssertionMixin {
    constructor(node) {
        this.node = node;
    }
    isField() {
        return this.node.kind === Kind.FIELD;
    }
    isFragmentSpread() {
        return this.node.kind === Kind.FRAGMENT_SPREAD;
    }
    isInflineFragment() {
        return this.node.kind === Kind.INLINE_FRAGMENT;
    }
    assertField() {
        if (this.isField())
            return this;
        throw assertionError(Kind.FIELD, this.node);
    }
    assertFragmentSpread() {
        if (this.isFragmentSpread())
            return this;
        throw assertionError(Kind.FRAGMENT_SPREAD, this.node);
    }
    assertInflineFragment() {
        if (this.isInflineFragment())
            return this;
        throw assertionError(Kind.INLINE_FRAGMENT, this.node);
    }
}
export function selectionMixin(node) {
    return new SelectionAssertionMixin(node);
}
