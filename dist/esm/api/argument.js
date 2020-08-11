import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Api, Mixin } from '../internal';
import { mutable, validateNodeKind } from '../utils';
export class ArgumentApi extends Mix(Mixin.NameMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.ARGUMENT, node);
    }
    getValue() {
        return this.node.value;
    }
    setValue(value) {
        mutable(this.node).value = value;
        return this;
    }
}
export function argumentApi(node) {
    return new Api.ArgumentApi(node);
}
