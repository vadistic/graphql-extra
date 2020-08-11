import { Kind, valueFromASTUntyped } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin, Ast } from '../internal';
import { validateNodeKindsArr, applyProps } from '../utils';
export class ValueApi extends Mix(Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKindsArr([Kind.INT, Kind.BOOLEAN, Kind.VARIABLE, Kind.FLOAT, Kind.STRING, Kind.NULL, Kind.ENUM, Kind.LIST, Kind.OBJECT], node);
    }
    toJs() {
        return valueFromASTUntyped(this.node);
    }
    set(props) {
        Object.assign(this.node, applyProps(Ast.valueNode, props));
        return this;
    }
}
export function valueApi(node) {
    return new ValueApi(node);
}
