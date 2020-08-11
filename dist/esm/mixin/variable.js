import { Api, Ast } from '../internal';
import { applyProps } from '../utils';
export class VariableMixin {
    constructor(node) {
        this.node = node;
    }
    getVariableName() {
        return this.node.variable.name.value;
    }
    getVariable() {
        return Api.variableApi(this.node.variable);
    }
    hasVariable(variablename) {
        return this.node.variable.name.value === variablename;
    }
    setVariable(props) {
        this.node.variable = applyProps(Ast.variableNode, props);
        return this;
    }
}
export function variableMixin(node) {
    return new VariableMixin(node);
}
