import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class EnumValueDefinitionApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.ENUM_VALUE_DEFINITION, node);
    }
}
export function enumValueDefinitionApi(node) {
    return new EnumValueDefinitionApi(node);
}
