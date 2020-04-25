import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Api } from '../internal'
import { validateNodeKind, validationError } from '../utils'


/**
 * API for GraphQL `SelectionNode`
 *
 * @category API Public
 */
export type SelectionApi =
  | FragmentSpreadApi
  | InlineFragmentApi
  | FieldApi


/**
 *  polymorfic contructor fn for `SelectionApi`
 *
 * @category API Public
 */
export function selectionApi(node: GQL.SelectionNode): SelectionApi {
  if (node.kind === Kind.FIELD) return Api.fieldApi(node)
  if (node.kind === Kind.FRAGMENT_SPREAD) return Api.fragmentSpreadApi(node)
  if (node.kind === Kind.INLINE_FRAGMENT) return Api.inlineFragmentApi(node)

  throw validationError([Kind.FIELD, Kind.FRAGMENT_SPREAD, Kind.INLINE_FRAGMENT], node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `FieldNode`
 *
 * @category API Public
 */

// TODO: add alias
export class FieldApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.ArgumentsApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.SelectionSetApiMixin,
  Mixin.SelectionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.FieldNode) {
    super([node], [node], [node], [node], [node], [node])

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
  Mixin.NameApiMixin,
  Mixin.DirectivesApiMixin,
  Mixin.SelectionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.FragmentSpreadNode) {
    super([node], [node], [node], [node])

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
  Mixin.DirectivesApiMixin,
  Mixin.SelectionSetApiMixin,
  Mixin.SelectionAssertionApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.InlineFragmentNode) {
    super([node], [node], [node])

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
