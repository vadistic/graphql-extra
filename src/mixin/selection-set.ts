import type * as GQL from 'graphql'
import { Kind } from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Fragmentname } from '../types'
import { mutable, Crud, Mutable } from '../utils'

/**
 * @category API Mixins
 */
export type SelectionSetApiMixinNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode
  // different shape but need to share methods
  | GQL.SelectionSetNode

/**
 * @category API Mixins
 */
export class SelectionSetApiMixin {
  constructor(readonly node: SelectionSetApiMixinNode) {
  }

  readonly _selections = new Crud({
    parent: this.node,
    key: this.node.kind === Kind.SELECTION_SET ? 'selections' : 'selectionSet',
    api: Api.selectionApi,
    factory: Ast.selectionNode,
    matcher: (node): string =>
      (node.kind !== Kind.INLINE_FRAGMENT ? node.name.value : node.typeCondition?.name.value) ?? '',
    // this whole mess is to support both nodes with selectionSet and selectionSet itself with one mixin
    // TODO: try to support cleaning empty selection sets
    // TODO: try to run those evaluations only once, not on all access
    // TODO: clean up code
    ref: this.node.kind === Kind.SELECTION_SET ? undefined : (next): GQL.SelectionNode[] => {
      const _node = this.node as Mutable<Exclude<SelectionSetApiMixinNode, GQL.SelectionSetNode>>

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
    },
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
    return this._selections.test({ kind: Kind.FIELD, name: fieldname })
  }

  getFields(): Api.FieldApi[] {
    // TODO: test!
    return this._selections.findMany({ kind: Kind.FIELD }) as Api.FieldApi[]
  }

  getField(fieldname: Fieldname): Api.FieldApi {
    return this._selections.findOneOrFail({ name: fieldname, kind: Kind.FIELD }) as Api.FieldApi
  }

  createField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._selections.create(props)

    return this
  }

  updateField(fieldname: Fieldname, props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._selections.update(fieldname, props)

    return this
  }

  upsertField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    this._selections.upsert(props)

    return this
  }

  removeField(fieldname: Fieldname): this {
    this._selections.remove(fieldname)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasFragmentSpread(fragmentname: Fragmentname): boolean {
    return this._selections.test({ kind: Kind.FRAGMENT_SPREAD, name: fragmentname })
  }

  getFragmentSpreads(): Api.FragmentSpreadApi[] {
    return this._selections.findMany({ kind: Kind.FRAGMENT_SPREAD }) as Api.FragmentSpreadApi[]
  }

  getFragmentSpead(fragmentname: Fragmentname): Api.FragmentSpreadApi {
    return this._selections.findOneOrFail({ name: fragmentname, kind: Kind.FRAGMENT_SPREAD }) as Api.FragmentSpreadApi
  }

  createFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    if (typeof props === 'string') {
      this._selections.create({ name: props, kind: Kind.FRAGMENT_SPREAD })
    }
    else {
      this._selections.create({ ...props, kind: Kind.FRAGMENT_SPREAD })
    }

    return this
  }

  updateFragmentSpread(
    fragmentname: Fragmentname,
    props: Ast.FragmentSpreadNodeProps | Partial<Ast.FragmentSpreadNodeProps> | GQL.FragmentSpreadNode,
  ): this {
    if (typeof props === 'string') {
      this._selections.update(
        { name: fragmentname, kind: Kind.FRAGMENT_SPREAD },
        { name: props, kind: Kind.FRAGMENT_SPREAD },
      )
    }
    else {
      this._selections.update(
        { name: fragmentname, kind: Kind.FRAGMENT_SPREAD },
        { ...props, kind: Kind.FRAGMENT_SPREAD },
      )
    }

    return this
  }

  upsertFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    if (typeof props === 'string') {
      this._selections.upsert({ name: props, kind: Kind.FRAGMENT_SPREAD })
    }
    else {
      this._selections.upsert({ ...props, kind: Kind.FRAGMENT_SPREAD })
    }

    return this
  }

  removeFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    if (typeof props === 'string') {
      this._selections.remove({ name: props, kind: Kind.FRAGMENT_SPREAD })
    }
    else {
      this._selections.remove({ ...props, kind: Kind.FRAGMENT_SPREAD })
    }

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  // TODO: support searching without type condition??
  hasInlineFragment(typeCondition?: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): boolean {
    return this._selections.test({ kind: Kind.INLINE_FRAGMENT, typeCondition })
  }

  getInlineFragment(typeCondition?: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): Api.InlineFragmentApi {
    return this._selections.findOneOrFail({ typeCondition, kind: Kind.INLINE_FRAGMENT }) as Api.InlineFragmentApi
  }

  getInlineFragments(): Api.InlineFragmentApi[] {
    return this._selections.findMany({ kind: Kind.INLINE_FRAGMENT }) as Api.InlineFragmentApi[]
  }


  createInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this {
    this._selections.create({ ...props, kind: Kind.INLINE_FRAGMENT })

    return this
  }

  updateInlineFragment(
    typeCondition: Ast.NamedTypeNodeProps | GQL.NamedTypeNode | undefined,
    props: Partial<Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode>,
  ): this {
    this._selections.update(
      { typeCondition, kind: Kind.INLINE_FRAGMENT },
      { typeCondition, ...props, kind: Kind.INLINE_FRAGMENT },
    )

    return this
  }

  upsertInlineFragment(props: Ast.InlineFragmentNodeProps | GQL.InlineFragmentNode): this {
    this._selections.upsert({ kind: Kind.INLINE_FRAGMENT, ...props })

    return this
  }

  // TODO: with type condition undefined this will remove any first inline fragment => make it smarter!
  removeInlineFragment(typeCondition: Ast.NamedTypeNodeProps | GQL.NamedTypeNode | undefined): this {
    this._selections.remove({ kind: Kind.INLINE_FRAGMENT, typeCondition })

    return this
  }
}

/**
 * @category API Mixins
 */
export function selectionSetApiMixin(node: SelectionSetApiMixinNode): SelectionSetApiMixin {
  return new SelectionSetApiMixin(node)
}
