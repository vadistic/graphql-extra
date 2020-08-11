import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { mutable, validateNodeKind } from '../utils';
export class OperationDefinitionApi extends Mix(Mixin.NameOptionalMixin, Mixin.DirectivesMixin, Mixin.SelectionSetMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.OPERATION_DEFINITION, node);
    }
    getOperationType() {
        return this.node.operation;
    }
    setOperationType(operation) {
        mutable(this.node).operation = operation;
        return this;
    }
}
export function operationDefinitionApi(node) {
    return new OperationDefinitionApi(node);
}
