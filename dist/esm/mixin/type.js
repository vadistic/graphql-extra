import { Api } from '../internal';
import { mutable } from '../utils';
export class TypeMixin {
    constructor(node) {
        this.node = node;
    }
    getType() {
        return Api.typeApi(this.node.type);
    }
    getTypename() {
        return this.getType().getTypename();
    }
    getNamedType() {
        return this.getType().getNamedType();
    }
    setTypename(typename) {
        this.getType().setTypename(typename);
        return this;
    }
    setType(props) {
        this.getType().setType(props);
        return this;
    }
    isNonNullType(deep) {
        return this.getType().isNonNull(deep);
    }
    isListType(deep) {
        return this.getType().isList(deep);
    }
    setNonNullType(to = true) {
        this.getType().setNonNull(to);
        return this;
    }
    setListType(to = true) {
        this.getType().setList(to);
        return this;
    }
}
export function typeMixin(node) {
    return new TypeMixin(node);
}
export class NamedTypeMixin {
    constructor(node) {
        this.node = node;
    }
    getNamedType() {
        return Api.namedTypeApi(this.node.type);
    }
    getTypename() {
        return this.node.type.name.value;
    }
    setTypename(typename) {
        mutable(this.node.type.name).value = typename;
        return this;
    }
}
export function namedTypeMixin(node) {
    return new TypeMixin(node);
}
