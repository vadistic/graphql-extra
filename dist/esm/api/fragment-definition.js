import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class FragmentDefinitionApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.SelectionSetMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.FRAGMENT_DEFINITION, node);
    }
}
export function fragmentDefinitionApi(node) {
    return new FragmentDefinitionApi(node);
}
