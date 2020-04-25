import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Ast, Api } from '../internal'
import { Fieldname, Fragmentname } from '../types'
import {
  validateNodeKind, crudCreate, crudFindOne, crudUpsert, crudUpdate, crudRemove, getName,
} from '../utils'

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

  isEmpty(): boolean {
    return this.node.selections.length === 0
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasField(fieldname: Fieldname): boolean {
    return this.node.selections.some(
      (selection) => selection.kind === Kind.FIELD && selection.name.value === fieldname,
    )
  }

  getFields(): Api.FieldApi[] {
    return this.node.selections.filter((selection): selection is GQL.FieldNode =>
      selection.kind === Kind.FIELD).map(Api.fieldApi)
  }

  getField(fieldname: Fieldname): Api.FieldApi {
    const field = crudFindOne({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.FIELD && el.name.value,
      target: fieldname,
    })

    return Api.selectionApi(field).assertField()
  }

  createField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    crudCreate({
      node: this.node,
      key: 'selections',
      factory: Ast.fieldNode,
      getter: (el) => el.kind === Kind.FIELD && el.name.value,
      props,
    })

    return this
  }

  updateField(fieldname: Fieldname, props: Ast.FieldNodeProps | GQL.FieldNode): this {
    crudUpdate({
      node: this.node,
      key: 'selections',
      factory: Ast.fieldNode,
      getter: (el) => el.kind === Kind.FIELD && el.name.value,
      props,
      target: fieldname,
    })


    return this
  }

  upsertField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    crudUpsert({
      node: this.node,
      key: 'selections',
      factory: Ast.fieldNode,
      getter: (el) => el.kind === Kind.FIELD && el.name.value,
      props,
    })

    return this
  }

  removeField(props: Ast.FieldNodeProps | GQL.FieldNode): this {
    crudRemove({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.FIELD && el.name.value,
      target: getName(props),
    })

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasFragmentSpread(fragmentname: Fragmentname): boolean {
    return this.node.selections.some(
      (selection) => selection.kind === Kind.FRAGMENT_SPREAD && selection.name.value === fragmentname,
    )
  }

  getFragmentSpreads(): Api.FragmentSpreadApi[] {
    return this.node.selections.filter((selection): selection is GQL.FragmentSpreadNode =>
      selection.kind === Kind.FRAGMENT_SPREAD).map(Api.fragmentSpreadApi)
  }

  getFragmentSpead(fragmentname: Fragmentname): Api.FragmentSpreadApi {
    const spread = crudFindOne({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.FRAGMENT_SPREAD && el.name.value,
      target: fragmentname,
    })

    return Api.selectionApi(spread).assertFragmentSpread()
  }

  createFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    crudCreate({
      node: this.node,
      key: 'selections',
      factory: Ast.fragmentSpreadNode,
      getter: (el) => el.kind === Kind.FRAGMENT_SPREAD && el.name.value,
      props,
    })

    return this
  }

  updateFragmentSpread(
    fragmentname: Fragmentname,
    props: Ast.FragmentSpreadNodeProps | Partial<Ast.FragmentSpreadNodeProps> | GQL.FragmentSpreadNode,
  ): this {
    crudUpdate({
      node: this.node,
      key: 'selections',
      factory: Ast.fragmentSpreadNode,
      getter: (el) => el.kind === Kind.FRAGMENT_SPREAD && el.name.value,
      props,
      target: fragmentname,
    })


    return this
  }

  upsertFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    crudUpsert({
      node: this.node,
      key: 'selections',
      factory: Ast.fragmentSpreadNode,
      getter: (el) => el.kind === Kind.FRAGMENT_SPREAD && el.name.value,
      props,
    })

    return this
  }

  removeFragmentSpread(props: Ast.FragmentSpreadNodeProps | GQL.FragmentSpreadNode): this {
    crudRemove({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.FRAGMENT_SPREAD && el.name.value,
      target: getName(props),
    })

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  // TODO: support searching without type condition
  hasInlineFragment(typeCondition: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): boolean {
    const condition = getName(typeCondition)

    return this.node.selections.some(
      (selection) => selection.kind === Kind.INLINE_FRAGMENT && selection.typeCondition?.name.value === condition,
    )
  }

  getInlineFragments(): Api.InlineFragmentApi[] {
    return this.node.selections.filter((selection): selection is GQL.InlineFragmentNode =>
      selection.kind === Kind.INLINE_FRAGMENT).map(Api.inlineFragmentApi)
  }

  // TODO: support findingMany by type condition
  getFirstInlineFragment(typeCondition?: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): Api.InlineFragmentApi {
    const condition = getName(typeCondition)

    const inline = crudFindOne({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.INLINE_FRAGMENT
        // ! 'unknown' is getName() fallback
        && (typeCondition ? el.typeCondition?.name.value ?? false : 'unknown'),
      target: condition,
    })

    return Api.selectionApi(inline).assertInflineFragment()
  }

  // TODO: handle removing many fragments of same type condition
  removeInlineFragment(typeCondition?: Ast.NamedTypeNodeProps | GQL.NamedTypeNode): this {
    const condition = getName(typeCondition)

    crudRemove({
      node: this.node,
      key: 'selections',
      getter: (el) => el.kind === Kind.INLINE_FRAGMENT
        // ! 'unknown' is getName() fallback
        && (typeCondition ? el.typeCondition?.name.value ?? false : 'unknown'),
      target: condition,
    })

    return this
  }
}
/**
 * `SelectionSetApi` constructor fn
 *
 * @category API Public
 */
export function selectionSetApi(node: GQL.SelectionSetNode): SelectionSetApi {
  return new SelectionSetApi(node)
}
