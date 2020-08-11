import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class VariableApi extends Mix(Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.VARIABLE, node);
    }
}
export function variableApi(node) {
    return new VariableApi(node);
}
