import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin, Ast } from '../internal'
import {
  applyPropsArr,
  mutable,
  validateNodeKind,
  getName,
  crudCreate,
  crudRemove,
} from '../utils'

/**
 * @category API Public
 */
export class DirectiveDefinitionApi extends Mix(
  Mixin.NameApiMixin,
  Mixin.DescriptionApiMixin,
  Mixin.InputValuesAsArgumentsApiMixin,
  Mixin.KindAssertionApiMixin,
) {
  constructor(readonly node: GQL.DirectiveDefinitionNode) {
    super([node], [node], [node], [node])

    validateNodeKind(Kind.DIRECTIVE_DEFINITION, node)
  }

  isRepeatable(): boolean {
    return this.node.repeatable
  }

  setRepeatable(value = true): this {
    mutable(this.node).repeatable = value

    return this
  }

  hasLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): boolean {
    const name = getName(location)

    return this.node.locations.some((loc) => loc.value === name)
  }

  getLocations(): GQL.DirectiveLocationEnum[] {
    return this.node.locations.map(getName) as GQL.DirectiveLocationEnum[]
  }

  setLocations(locations: (GQL.NameNode | GQL.DirectiveLocationEnum)[]): this {
    mutable(this.node).locations = applyPropsArr(Ast.nameNode, locations) as GQL.NameNode[]

    return this
  }

  createLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    crudCreate({
      node: this.node,
      key: 'locations',
      factory: Ast.nameNode,
      getter: (el) => el.value,
      props: location,
    })

    return this
  }

  removeLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    crudRemove({
      node: this.node,
      key: 'locations',
      getter: (el) => el.value,
      target: getName(location),
    })

    return this
  }
}


/**
 * @category API Public
 */
export function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): Api.DirectiveDefinitionApi {
  return new Api.DirectiveDefinitionApi(node)
}
