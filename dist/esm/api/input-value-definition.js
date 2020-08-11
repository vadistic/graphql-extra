import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Api, Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class InputValueDefinitionApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.TypeMixin, Mixin.DefaultValueMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INPUT_VALUE_DEFINITION, node);
    }
    toField() {
        const { kind, defaultValue, loc, ...rest } = this.node;
        return Api.fieldDefinitionApi({ kind: Kind.FIELD_DEFINITION, ...rest });
    }
}
export function inputValueDefinitionApi(node) {
    return new Api.InputValueDefinitionApi(node);
}
