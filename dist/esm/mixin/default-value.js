import { Api, Ast } from '../internal';
import { applyNullable, applyPropsNullable, } from '../utils';
export class DefaultValueMixin {
    constructor(node) {
        this.node = node;
    }
    hasDefaultValue() {
        return !!this.node.defaultValue;
    }
    getDefaultValue() {
        return applyNullable(Api.valueApi, this.node.defaultValue);
    }
    setDefaultValue(props) {
        this.node.defaultValue = applyPropsNullable(Ast.valueNode, props);
        return this;
    }
}
export function defaultValueMixin(node) {
    return new DefaultValueMixin(node);
}
