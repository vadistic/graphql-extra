import { Kind } from 'graphql';
import { Api, Ast } from '../internal';
import { mutable, Crud } from '../utils';
export class SelectionSetMixin {
    constructor(node) {
        this.node = node;
        this._selectionsRef = this.node.kind === Kind.SELECTION_SET ? undefined
            : (next) => {
                const _node = this.node;
                if (!_node.selectionSet) {
                    _node.selectionSet = Ast.selectionSetNode({ selections: [] });
                }
                if (!_node.selectionSet.selections) {
                    _node.selectionSet.selections = [];
                }
                if (next) {
                    _node.selectionSet.selections = next;
                }
                return _node.selectionSet.selections;
            };
        this._selections = new Crud({
            parent: this.node,
            key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
            api: Api.selectionApi,
            factory: Ast.selectionNode,
            matcher: (node) => { var _a, _b; return (_b = (node.kind !== Kind.INLINE_FRAGMENT ? node.name.value : (_a = node.typeCondition) === null || _a === void 0 ? void 0 : _a.name.value)) !== null && _b !== void 0 ? _b : ''; },
            ref: this._selectionsRef,
        });
        this._fields = new Crud({
            parent: this.node,
            key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
            api: Api.fieldApi,
            factory: Ast.fieldNode,
            matcher: (node) => node.name.value,
            ref: this._selectionsRef,
            kindFilter: [Kind.FIELD],
        });
        this._fragmentSpreads = new Crud({
            parent: this.node,
            key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
            api: Api.fragmentSpreadApi,
            factory: Ast.fragmentSpreadNode,
            matcher: (node) => node.name.value,
            ref: this._selectionsRef,
            kindFilter: [Kind.FRAGMENT_SPREAD],
        });
        this._inlineFragments = new Crud({
            parent: this.node,
            key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
            api: Api.inlineFragmentApi,
            factory: Ast.inlineFragmentNode,
            matcher: (node) => { var _a; return (_a = node.typeCondition) === null || _a === void 0 ? void 0 : _a.name.value; },
            ref: this._selectionsRef,
            kindFilter: [Kind.INLINE_FRAGMENT],
        });
    }
    hasSelectionSet() {
        if (this.node.kind === Kind.SELECTION_SET) {
            return true;
        }
        return !!this.node.selectionSet;
    }
    removeSelectionSet() {
        if (this.node.kind === Kind.SELECTION_SET) {
            throw Error('cannot remove selectionSet from itself - call this method from SelectionSet node parent api');
        }
        if (!this.node.selectionSet) {
            mutable(this.node).selectionSet = undefined;
        }
        return this;
    }
    getSelectionSet() {
        if (this.node.kind === Kind.SELECTION_SET) {
            return this;
        }
        if (!this.node.selectionSet) {
            mutable(this.node).selectionSet = Ast.selectionSetNode({ selections: [] });
        }
        return Api.selectionSetApi(this.node.selectionSet);
    }
    getSelections() {
        return this._selections.findMany();
    }
    hasField(fieldname) {
        return this._fields.has(fieldname);
    }
    getFields() {
        return this._fields.findMany();
    }
    getField(fieldname) {
        return this._fields.findOneOrFail(fieldname);
    }
    createField(props) {
        this._fields.create(props);
        return this;
    }
    updateField(fieldname, props) {
        this._fields.update(fieldname, props);
        return this;
    }
    upsertField(props) {
        this._fields.upsert(props);
        return this;
    }
    removeField(fieldname) {
        this._fields.remove(fieldname);
        return this;
    }
    hasFragmentSpread(fragmentname) {
        return this._fragmentSpreads.has(fragmentname);
    }
    getFragmentSpreads() {
        return this._fragmentSpreads.findMany();
    }
    getFragmentSpead(fragmentname) {
        return this._fragmentSpreads.findOneOrFail(fragmentname);
    }
    createFragmentSpread(props) {
        this._fragmentSpreads.create(props);
        return this;
    }
    updateFragmentSpread(fragmentname, props) {
        this._fragmentSpreads.update(fragmentname, props);
        return this;
    }
    upsertFragmentSpread(props) {
        this._fragmentSpreads.upsert(props);
        return this;
    }
    removeFragmentSpread(props) {
        this._fragmentSpreads.remove(props);
        return this;
    }
    hasInlineFragment(typeCondition) {
        return this._inlineFragments.has(typeCondition);
    }
    getInlineFragment(typeCondition) {
        return this._inlineFragments.findOneOrFail(typeCondition);
    }
    getInlineFragments() {
        return this._inlineFragments.findMany();
    }
    createInlineFragment(props) {
        this._inlineFragments.create(props);
        return this;
    }
    updateInlineFragment(typeCondition, props) {
        this._inlineFragments.update(typeCondition, props);
        return this;
    }
    upsertInlineFragment(props) {
        this._inlineFragments.upsert(props);
        return this;
    }
    removeInlineFragment(typeCondition) {
        this._inlineFragments.remove(typeCondition);
        return this;
    }
}
export function selectionSetMixin(node) {
    return new SelectionSetMixin(node);
}
