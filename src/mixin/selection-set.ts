import type * as GQL from 'graphql'
import { Kind } from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Fragmentname, Typename } from '../types'
import { mutable, Crud, Mutable } from '../utils'

/**
 * @category API Mixins
 */
export type SelectionSetMixinNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode
  // different shape but need to share methods
  | GQL.SelectionSetNode

/**
 * @category API Mixins
 */
export class SelectionSetMixin {
  constructor(readonly node: SelectionSetMixinNode) {
  }

  // this whole mess is to support both nodes with selectionSet and selectionSet itself with one mixin
  // TODO: try to support cleaning empty selection sets
  // TODO: try to run those evaluations only once, not on all access
  // TODO: clean up code
  protected _selectionsRef = this.node.kind === Kind.SELECTION_SET ? undefined
    : (next?: GQL.SelectionNode[]): GQL.SelectionNode[] => {
      const _node = this.node as Mutable<Exclude<SelectionSetMixinNode, GQL.SelectionSetNode>>

      if (!_node.selectionSet) {
        _node.selectionSet = Ast.selectionSetNode({ selections: [] })
      }

      if (!_node.selectionSet.selections) {
        _node.selectionSet.selections = []
      }

      if (next) {
        _node.selectionSet.selections = next
      }

      return _node.selectionSet.selections as GQL.SelectionNode[]
    }

  readonly _selections = new Crud({
    parent: this.node,
    key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
    api: Api.selectionApi,
    factory: Ast.selectionNode,
    matcher: (node): string =>
      (node.kind !== Kind.INLINE_FRAGMENT ? node.name.value : node.typeCondition?.name.value) ?? '',

    ref: this._selectionsRef,
  })

  readonly _fields = new Crud({
    parent: this.node,
    key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
    api: Api.fieldApi,
    factory: Ast.fieldNode,
    matcher: (node): Fieldname => node.name.value,
    ref: this._selectionsRef,
    kind: Kind.FIELD,
  })

  readonly _fragmentSpreads = new Crud({
    parent: this.node,
    key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
    api: Api.fragmentSpreadApi,
    factory: Ast.fragmentSpreadNode,
    matcher: (node): Fragmentname => node.name.value,
    ref: this._selectionsRef,
    kind: Kind.FRAGMENT_SPREAD,
  })

  readonly _inlineFragments = new Crud({
    parent: this.node,
    key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
    api: Api.inlineFragmentApi,
    factory: Ast.inlineFragmentNode,
    matcher: (node): Typename | undefined => node.typeCondition?.name.value,
    ref: this._selectionsRef,
    kind: Kind.INLINE_FRAGMENT,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  hasSelectionSet(): boolean {
    if (this.node.kind === Kind.SELECTION_SET) {
      return true
    }

    return !!this.node.selectionSet
  }


  removeSelectionSet(): this {
    if (this.node.kind === Kind.SELECTION_SET) {
      throw Error('cannot remove selectionSet from itself - call this method from SelectionSet node parent api')
    }

    if (!this.node.selectionSet) {
      mutable(this.node).selectionSet = undefined
    }

    return this
  }

  getSelectionSet(): Api.SelectionSetApi {
    if (this.node.kind === Kind.SELECTION_SET) {
      return this as unknown as Api.SelectionSetApi
    }

    if (!this.node.selectionSet) {
      mutable(this.node).selectionSet = Ast.selectionSetNode({ selections: [] })
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Api.selectionSetApi(this.node.selectionSet!)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getSelections(): Api.SelectionApi[] {
    return this._selections.findMany()
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasField(fieldname: Fieldname): boolean {
    return this._fields.has(fieldname)
  }

  getFields(): Api.FieldApi[] {
    return this._fields.findMany()
  }

  getField(fieldname: Fieldname): Api.FieldApi {
    return this._fields.findOneOrFail(fieldname)
  }

  createField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._fields.create(props)

    return this
  }

  updateField(fieldname: Fieldname, props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._fields.update(fieldname, props)

    return this
  }

  upsertField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._fields.upsert(props)

    return this
  }

  removeField(fieldname: Fieldname): this {
    this._fields.remove(fieldname)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasFragmentSpread(fragmentname: Fragmentname): boolean {
    return this._fragmentSpreads.has(fragmentname)
  }

  getFragmentSpreads(): Api.FragmentSpreadApi[] {
    return this._fragmentSpreads.findMany()
  }

  getFragmentSpead(fragmentname: Fragmentname): Api.FragmentSpreadApi {
    return this._fragmentSpreads.findOneOrFail(fragmentname)
  }

  createFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    this._fragmentSpreads.create(props)

    return this
  }

  updateFragmentSpread(
    fragmentname: Fragmentname,
    props: Ast.FragmentSpreadNodeProps | Partial<Ast.FragmentSpreadNodeProps> | GQL.FragmentSpreadNode,
  ): this {
    this._fragmentSpreads.update(fragmentname, props)

    return this
  }

  upsertFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    this._fragmentSpreads.upsert(props)

    return this
  }

  removeFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    this._fragmentSpreads.remove(props)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  // ! needs to search by string typeCondition - otherwise object matcher would match any type condition
  hasInlineFragment(typeCondition?: Typename): boolean {
    return this._inlineFragments.has(typeCondition)
  }

  getInlineFragment(typeCondition?: Typename): Api.InlineFragmentApi {
    return this._inlineFragments.findOneOrFail(typeCondition)
  }

  getInlineFragments(): Api.InlineFragmentApi[] {
    return this._inlineFragments.findMany()
  }


  createInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this {
    this._inlineFragments.create(props)

    return this
  }

  updateInlineFragment(
    typeCondition: Typename | undefined,
    props: Partial<Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode>,
  ): this {
    this._inlineFragments.update(typeCondition, props)

    return this
  }

  upsertInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this {
    this._inlineFragments.upsert(props)

    return this
  }

  removeInlineFragment(typeCondition: Typename): this {
    this._inlineFragments.remove(typeCondition)

    return this
  }
}

/**
 * @category API Mixins
 */
export function selectionSetMixin(node: SelectionSetMixinNode): SelectionSetMixin {
  return new SelectionSetMixin(node)
}
