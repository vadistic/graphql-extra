import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Mixin, Hooks } from '../internal'
import { validateNodeKind } from '../utils'

/**
 *  API for GraphQL `OperationDefinitionNode`
 *
 * @category API Public
 */
export class OperationDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.OperationDefinitionNode) {
    super([node])

    validateNodeKind(Kind.OPERATION_DEFINITION, node)
  }

  // export interface OperationDefinitionNode {
  //   readonly kind: 'OperationDefinition';
  //   readonly loc?: Location;
  //   readonly operation: OperationTypeNode;
  //   readonly name?: NameNode;
  //   readonly variableDefinitions?: ReadonlyArray<VariableDefinitionNode>;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  //   readonly selectionSet: SelectionSetNode;
  // }

  readonly operation = Hooks.operationHook(this.node)

  readonly name = Hooks.nameOptionalHook(this.node)

  readonly variables = Hooks.variableDefinitionsHook(this.node)

  readonly directives = Hooks.directivesHook(this.node)

  readonly selections = Hooks.selectionSetHook(this.node)
}
/**
 * `OperationDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function operationDefinitionApi(node: GQL.OperationDefinitionNode): OperationDefinitionApi {
  return new OperationDefinitionApi(node)
}
