import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class ObjectExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.FieldDefinitionsMixin, Mixin.InterfacesMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.OBJECT_TYPE_EXTENSION, node);
    }
}
export function objectExtApi(node) {
    return new ObjectExtApi(node);
}
export class InterfaceExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.FieldDefinitionsMixin, Mixin.InterfacesMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INTERFACE_TYPE_EXTENSION, node);
    }
}
export function interfaceExtApi(node) {
    return new InterfaceExtApi(node);
}
export class UnionExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.UnionTypesMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.UNION_TYPE_EXTENSION, node);
    }
}
export function unionExtApi(node) {
    return new UnionExtApi(node);
}
export class ScalarExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.SCALAR_TYPE_EXTENSION, node);
    }
}
export function scalarExtApi(node) {
    return new ScalarExtApi(node);
}
export class EnumExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.EnumValueDefinitionMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.ENUM_TYPE_EXTENSION, node);
    }
}
export function enumExtApi(node) {
    return new EnumExtApi(node);
}
export class InputExtApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.InputValuesAsFieldsMixin, Mixin.TypeExtensionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INPUT_OBJECT_TYPE_EXTENSION, node);
    }
}
export function inputExtApi(node) {
    return new InputExtApi(node);
}
