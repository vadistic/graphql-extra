import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Api, Ast, Mixin } from '../internal';
import { validateNodeKind, mutable, applyProps } from '../utils';
export class OperationTypeDefinitionApi extends Mix(Mixin.NamedTypeMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.OPERATION_TYPE_DEFINITION, node);
    }
    getOperation() {
        return this.node.operation;
    }
    setOperation(operation) {
        mutable(this.node).operation = operation;
        return this;
    }
    getType() {
        return Api.namedTypeApi(this.node.type);
    }
    setType(type) {
        mutable(this.node).type = applyProps(Ast.namedTypeNode, type);
        return this;
    }
}
export function operationTypeDefinitionApi(node) {
    return new OperationTypeDefinitionApi(node);
}
