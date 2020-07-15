import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Mixin } from '../internal'
import { validateNodeKind, validationError } from '../utils'

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `FieldNode`
 *
 * @category API Public
 */

// TODO: add alias
export class FieldApi extends Mix(
  Mixin.NameMixin,
  Mixin.ArgumentsMixin,
  Mixin.DirectivesMixin,
  Mixin.SelectionSetMixin,
  Mixin.SelectionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.FieldNode) {
    super(node)

    validateNodeKind(Kind.FIELD, node)
  }
}
/**
 * `FieldApi` constructor fn
 *
 * @category API Public
 */
export function fieldApi(node: GQL.FieldNode): FieldApi {
  return new FieldApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `FragmentSpreadNode`
 *
 * @category API Public
 */
export class FragmentSpreadApi extends Mix(
  Mixin.NameMixin,
  Mixin.DirectivesMixin,
  Mixin.SelectionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.FragmentSpreadNode) {
    super(node)

    validateNodeKind(Kind.FRAGMENT_SPREAD, node)
  }
}

/**
 * `FragmentSpreadApi` constructor fn
 *
 * @category API Public
 */
export function fragmentSpreadApi(node: GQL.FragmentSpreadNode): FragmentSpreadApi {
  return new FragmentSpreadApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `InlineFragmentNode`
 *
 * @category API Public
 */
// TODO: add typecondition api mixin
export class InlineFragmentApi extends Mix(
  Mixin.DirectivesMixin,
  Mixin.SelectionSetMixin,
  Mixin.SelectionAssertionMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.InlineFragmentNode) {
    super(node)

    validateNodeKind(Kind.INLINE_FRAGMENT, node)
  }
}

/**
 * `InlineFragmentApi` constructor fn
 *
 * @category API Public
 */
export function inlineFragmentApi(node: GQL.InlineFragmentNode): InlineFragmentApi {
  return new InlineFragmentApi(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * API for GraphQL `SelectionNode`
 *
 * @category API Public
 */
export type SelectionApi = FragmentSpreadApi | InlineFragmentApi | FieldApi

/**
 * map `SelectionNode` kind to api
 *
 * @category API Public
 */
export const kindToSelectionApi = {
  Field: FieldApi,
  FragmentSpread: FragmentSpreadApi,
  InlineFragment: InlineFragmentApi,
}

/**
 *  polymorfic contructor fn for `SelectionApi`
 *
 * @category API Public
 */
export function selectionApi(node: GQL.SelectionNode): SelectionApi {
  const Clazz = kindToSelectionApi[node.kind]

  if (Clazz) return new Clazz(node as any)

  throw validationError([Kind.FIELD, Kind.FRAGMENT_SPREAD, Kind.INLINE_FRAGMENT], node)
}
