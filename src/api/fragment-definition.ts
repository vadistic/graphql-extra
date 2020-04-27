import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Hooks, Mixin } from '../internal'
import { Fragmentname } from '../types'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `FragmentDefinitionNode`
 *
 * @category API Public
 */
export class FragmentDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.FragmentDefinitionNode) {
    super([node])

    validateNodeKind(Kind.FRAGMENT_DEFINITION, node)
  }

  // export interface FragmentDefinitionNode {
  //   readonly kind: 'FragmentDefinition';
  //   readonly loc?: Location;
  //   readonly name: NameNode;
  //   // Note: fragment variable definitions are experimental and may be changed
  //   // or removed in the future.
  //   readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
  //   readonly typeCondition: NamedTypeNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly selectionSet: SelectionSetNode;
  // }

  readonly name = Hooks.nameHook<GQL.FragmentDefinitionNode, Fragmentname>(this.node)

  readonly variables = Hooks.variableDefinitionsHook(this.node)

  readonly typeCondition = Hooks.typeConditionHook(this.node)

  readonly directives = Hooks.directivesHook(this.node)

  readonly selections = Hooks.selectionSetHook(this.node)
}

/**
 * `FragmentDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fragmentDefinitionApi(node: GQL.FragmentDefinitionNode): FragmentDefinitionApi {
  return new FragmentDefinitionApi(node)
}
