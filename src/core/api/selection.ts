import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { validateNodeKind, validationError } from '../errors'
import { ArgumentsApiMixin } from '../mixins/argument'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'
import { SelectionAssertionApiMixin } from '../mixins/selection-assertion'

// ! apis & mixins together to resolve import cycles

/**
 * API for GraphQL `SelectionNode`
 *
 * @category API Public
 */
export type SelectionApi =
  | FragmentSpreadApi
  | InlineFragmentApi
  | FieldApi

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type SelectionSetApiMixinNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export class SelectionSetApiMixin {
  constructor(readonly node: SelectionSetApiMixinNode) {}

  hasSelectionSet(): boolean {
    return !!this.node.selectionSet?.selections.length
  }

  getSelections(): SelectionApi[] {
    return this.node.selectionSet?.selections.map((node): SelectionApi => {
      if (node.kind === Kind.FIELD) return fieldApi(node)
      if (node.kind === Kind.FRAGMENT_SPREAD) return fragmentSpreadApi(node)
      if (node.kind === Kind.INLINE_FRAGMENT) return inlineFragmentApi(node)

      throw validationError([Kind.FIELD, Kind.FRAGMENT_SPREAD, Kind.INLINE_FRAGMENT], node)
    }) ?? []
  }
}

/**
 * @category API Mixins
 */
export function selectionSetApiMixin(node: SelectionSetApiMixinNode): SelectionSetApiMixin {
  return new SelectionSetApiMixin(node)
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 *  API for GraphQL `FieldNode`
 *
 * @category API Public
 */

// TODO: add alias
export class FieldApi extends Mix(
  NameApiMixin,
  ArgumentsApiMixin,
  DirectivesApiMixin,
  SelectionSetApiMixin,
  SelectionAssertionApiMixin,
) {
  constructor(readonly node: GQL.FieldNode) {
    super([node], [node], [node], [node], [node])

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
  NameApiMixin,
  DirectivesApiMixin,
  SelectionAssertionApiMixin,
) {
  constructor(readonly node: GQL.FragmentSpreadNode) {
    super([node], [node], [node])

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
  DirectivesApiMixin,
  SelectionSetApiMixin,
  SelectionAssertionApiMixin,
) {
  constructor(readonly node: GQL.InlineFragmentNode) {
    super([node], [node])

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
