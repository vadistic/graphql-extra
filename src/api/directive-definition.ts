import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin, Ast } from '../internal'
import {
  applyPropsArr,
  applyProps,
  deepMutable,
  mutable,
  validateNodeKind,
  getName,
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

  getLocations(): GQL.DirectiveLocationEnum[] {
    return this.node.locations.map(getName) as GQL.DirectiveLocationEnum[]
  }

  setLocations(values: (GQL.NameNode | GQL.DirectiveLocationEnum)[]): this {
    mutable(this.node).locations = applyPropsArr(Ast.nameNode, values) as GQL.NameNode[]

    return this
  }

  // TODO: use crud heler
  hasLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): boolean {
    const name = getName(value)

    return this.node.locations.some((loc) => loc.value === name)
  }

  // TODO: use crud heler
  createLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    const next = applyProps(Ast.nameNode, value)

    if (this.node.locations.some((loc) => loc.value === next.value)) {
      throw Error(`location '${next.value}' on ${this.node.name.value} already exists`)
    }

    deepMutable(this.node).locations.push(next)

    return this
  }

  // TODO: use crud heler
  upsertLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    const next = applyProps(Ast.nameNode, value)

    const index = this.node.locations.findIndex((loc) => loc.value === next.value)

    if (index !== -1) {
      deepMutable(this.node).locations[index] = next
    }
    else {
      deepMutable(this.node).locations.push(next)
    }

    return this
  }

  // TODO: use crud heler
  removeLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    const name = getName(value)
    const index = this.node.locations.findIndex((loc) => loc.value === name)

    if (index === -1) {
      throw Error(`location '${name}' on ${this.node.name.value} does not exist`)
    }

    deepMutable(this.node).locations.splice(index, 1)

    return this
  }
}


/**
 * @category API Public
 */
export function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): Api.DirectiveDefinitionApi {
  return new Api.DirectiveDefinitionApi(node)
}
