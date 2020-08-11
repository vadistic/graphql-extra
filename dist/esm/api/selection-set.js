import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class SelectionSetApi extends Mix(Mixin.SelectionSetMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.SELECTION_SET, node);
    }
}
export function selectionSetApi(node) {
    return new SelectionSetApi(node);
}
