import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class ObjectTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.FieldDefinitionsMixin, Mixin.InterfacesMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.OBJECT_TYPE_DEFINITION, node);
    }
}
export function objectTypeApi(node) {
    return new ObjectTypeApi(node);
}
export class InterfaceTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.FieldDefinitionsMixin, Mixin.InterfacesMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INTERFACE_TYPE_DEFINITION, node);
    }
}
export function interfaceTypeApi(node) {
    return new InterfaceTypeApi(node);
}
export class UnionTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.UnionTypesMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.UNION_TYPE_DEFINITION, node);
    }
}
export function unionTypeApi(node) {
    return new UnionTypeApi(node);
}
export class ScalarTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.SCALAR_TYPE_DEFINITION, node);
    }
}
export function scalarTypeApi(node) {
    return new ScalarTypeApi(node);
}
export class EnumTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.EnumValueDefinitionMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.ENUM_TYPE_DEFINITION, node);
    }
}
export function enumTypeApi(node) {
    return new EnumTypeApi(node);
}
export class InputTypeApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.InputValuesAsFieldsMixin, Mixin.TypeDefinitionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INPUT_OBJECT_TYPE_DEFINITION, node);
    }
}
export function inputTypeApi(node) {
    return new InputTypeApi(node);
}
