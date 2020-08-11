import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Api, Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class FieldDefinitionApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.InputValuesAsArgumentsMixin, Mixin.TypeMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.FIELD_DEFINITION, node);
    }
    toInputValue() {
        const { kind, arguments: args, loc, ...rest } = this.node;
        return Api.inputValueDefinitionApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest });
    }
}
export function fieldDefinitionApi(node) {
    return new Api.FieldDefinitionApi(node);
}
