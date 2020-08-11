import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class VariableDefinitionApi extends Mix(Mixin.TypeMixin, Mixin.DirectivesMixin, Mixin.VariableMixin, Mixin.DefaultValueMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.VARIABLE_DEFINITION, node);
    }
}
export function variableDefinitionApi(node) {
    return new VariableDefinitionApi(node);
}
