import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Api, Mixin, Ast } from '../internal';
import { mutable, validateNodeKind, Crud } from '../utils';
export class DirectiveDefinitionApi extends Mix(Mixin.NameMixin, Mixin.DescriptionMixin, Mixin.InputValuesAsArgumentsMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        this._locations = new Crud({
            api: (node) => node.value,
            factory: Ast.nameNode,
            key: 'locations',
            matcher: (node) => node.value,
            parent: this.node,
        });
        validateNodeKind(Kind.DIRECTIVE_DEFINITION, node);
    }
    isRepeatable() {
        return this.node.repeatable;
    }
    setRepeatable(value = true) {
        mutable(this.node).repeatable = value;
        return this;
    }
    hasLocation(location) {
        return this._locations.test(location);
    }
    getLocations() {
        return this._locations.findMany();
    }
    setLocations(locations) {
        this._locations.set(locations);
        return this;
    }
    createLocation(location) {
        this._locations.create(location);
        return this;
    }
    removeLocation(location) {
        this._locations.remove(location);
        return this;
    }
}
export function directiveDefinitionApi(node) {
    return new Api.DirectiveDefinitionApi(node);
}
