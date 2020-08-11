import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Ast, Mixin } from '../internal';
import { applyPropsCloned, mutable, validateNodeKindsArr, validateNodeKind } from '../utils';
export class TypeApi extends Mix(Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKindsArr([Kind.NAMED_TYPE, Kind.LIST_TYPE, Kind.NON_NULL_TYPE], node);
    }
    getNamedType() {
        return this._getNamedType(this.node);
    }
    getTypename() {
        return this._getNamedType(this.node).name.value;
    }
    setTypename(value) {
        mutable(this._getNamedType(this.node)).name = Ast.nameNode(value);
        return this;
    }
    setType(props) {
        Object.assign(this.node, applyPropsCloned(Ast.typeNode, props));
        return this;
    }
    isNonNull(deep = true) {
        if (!deep) {
            return this.node.kind === Kind.NON_NULL_TYPE;
        }
        return this._isNonNullDeep(this.node);
    }
    isList(deep = true) {
        if (!deep) {
            return this.node.kind === Kind.LIST_TYPE;
        }
        return this._isListDeep(this.node);
    }
    setNonNull(value = true) {
        if (value && this.node.kind !== Kind.NON_NULL_TYPE) {
            Object.assign(this.node, Ast.nonNullTypeNode(this.node));
        }
        if (!value && this.node.kind === Kind.NON_NULL_TYPE) {
            Object.assign(this.node, this.node.type);
        }
        return this;
    }
    setList(value = true) {
        if (value && this.node.kind !== Kind.LIST_TYPE) {
            Object.assign(this.node, Ast.listTypeNode(this.node));
        }
        if (!value && this.node.kind === Kind.LIST_TYPE) {
            Object.assign(this.node, this.node.type);
        }
        return this;
    }
    _getNamedType(type) {
        return type.kind === Kind.NAMED_TYPE ? type : this._getNamedType(type.type);
    }
    _isNonNullDeep(type) {
        if (type.kind === Kind.NON_NULL_TYPE)
            return true;
        if (type.kind === Kind.NAMED_TYPE)
            return false;
        return this._isNonNullDeep(type.type);
    }
    _isListDeep(type) {
        if (type.kind === Kind.LIST_TYPE)
            return true;
        if (type.kind === Kind.NAMED_TYPE)
            return false;
        return this._isListDeep(type.type);
    }
}
export function typeApi(node) {
    return new TypeApi(node);
}
export class NamedTypeApi extends Mix(Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.NAMED_TYPE, node);
    }
    getTypename() {
        return this.node.name.value;
    }
    setTypename(value) {
        mutable(this.node).name = Ast.nameNode(value);
        return this;
    }
}
export function namedTypeApi(node) {
    return new NamedTypeApi(node);
}
