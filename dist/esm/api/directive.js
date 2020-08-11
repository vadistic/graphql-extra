import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class DirectiveApi extends Mix(Mixin.NameMixin, Mixin.ArgumentsMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.DIRECTIVE, node);
    }
}
export function directiveApi(node) {
    return new DirectiveApi(node);
}
