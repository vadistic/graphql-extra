import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Ast, Api } from '../internal'
import { Fieldname, Fragmentname } from '../types'
import { validateNodeKind, Crud } from '../utils'

/**
 *  API for GraphQL `SelectionSetNode`
 *
 * @category API Public
 */

export class SelectionSetApi extends Mix(Mixin.KindAssertionApiMixin) {
  constructor(readonly node: GQL.SelectionSetNode) {
    super([node])

    validateNodeKind(Kind.SELECTION_SET, node)
  }

  readonly _selections = new Crud({
    parent: this.node,
    key: 'selections',
    api: Api.selectionApi,
    factory: Ast.selectionNode,
    matcher: (node): string =>
      (node.kind !== Kind.INLINE_FRAGMENT ? node.name.value : node.typeCondition?.name.value) ?? '',
  })


  // ────────────────────────────────────────────────────────────────────────────────

  isEmpty(): boolean {
    return this.node.selections.length === 0
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
    this._selections.update(fragmentname, props)

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
  hasInlineFragment(typeCondition: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): boolean {
    return this._selections.test({ kind: Kind.INLINE_FRAGMENT, typeCondition })
  }

  getInlineFragments(): Api.InlineFragmentApi[] {
    return this._selections.findMany({ kind: Kind.INLINE_FRAGMENT }) as Api.InlineFragmentApi[]
  }


  // TODO: finish!
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi {
  return new SelectionSetApi(node)
}
