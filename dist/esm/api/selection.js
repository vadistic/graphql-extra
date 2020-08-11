import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind, validationError } from '../utils';
export class FieldApi extends Mix(Mixin.NameMixin, Mixin.ArgumentsMixin, Mixin.DirectivesMixin, Mixin.SelectionSetMixin, Mixin.SelectionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.FIELD, node);
    }
}
export function fieldApi(node) {
    return new FieldApi(node);
}
export class FragmentSpreadApi extends Mix(Mixin.NameMixin, Mixin.DirectivesMixin, Mixin.SelectionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.FRAGMENT_SPREAD, node);
    }
}
export function fragmentSpreadApi(node) {
    return new FragmentSpreadApi(node);
}
export class InlineFragmentApi extends Mix(Mixin.DirectivesMixin, Mixin.SelectionSetMixin, Mixin.SelectionAssertionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.INLINE_FRAGMENT, node);
    }
}
export function inlineFragmentApi(node) {
    return new InlineFragmentApi(node);
}
export const kindToSelectionApi = {
    Field: FieldApi,
    FragmentSpread: FragmentSpreadApi,
    InlineFragment: InlineFragmentApi,
};
export function selectionApi(node) {
    const Clazz = kindToSelectionApi[node.kind];
    if (Clazz)
        return new Clazz(node);
    throw validationError([Kind.FIELD, Kind.FRAGMENT_SPREAD, Kind.INLINE_FRAGMENT], node);
}
