import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin, Hooks } from '../internal'
import { Fieldname } from '../types'
import { validateNodeKind } from '../utils'

/**
 * API for GraphQL `FieldDefinitionNode`
 *
 * @category API Public
 */
export class FieldDefinitionApi extends Mix(
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.FieldDefinitionNode) {
    super([node])

    validateNodeKind(Kind.FIELD_DEFINITION, node)
  }

  // export interface FieldDefinitionNode {
  //   readonly kind: 'FieldDefinition';
  //   readonly loc?: Location;
  //   readonly description?: StringValueNode;
  //   readonly name: NameNode;
  //   readonly arguments?: ReadonlyArray<InputValueDefinitionNode>;
  //   readonly type: TypeNode;
  //   readonly directives?: ReadonlyArray<DirectiveNode>;
  // }

  readonly description = Hooks.descriptionHook(this.node)

  readonly name = Hooks.nameHook<GQL.FieldDefinitionNode, Fieldname>(this.node)

  readonly arguments = Hooks.inputValuesAsArgumentsHook(this.node)

  readonly type = Hooks.typeHook(this.node)

  readonly directives = Hooks.directivesHook(this.node)


  toInputValue(): Api.InputValueDefinitionApi {
    const {
      kind, arguments: args, loc, ...rest
    } = this.node

    return Api.inputValueDefinitionApi({ kind: Kind.INPUT_VALUE_DEFINITION, ...rest })
  }
}


/**
 * `FieldDefinitionApi` constructor fn
 *
 * @category API Public
 */
export function fieldDefinitionApi(node: GQL.FieldDefinitionNode): Api.FieldDefinitionApi {
  return new Api.FieldDefinitionApi(node)
}
