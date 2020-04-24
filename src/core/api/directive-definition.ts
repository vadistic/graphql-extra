import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mix } from 'mix-classes'

import { nameNode } from '../../node'
import {
  applyPropsArr, applyProps, deepMutable, mutable,
} from '../../utils'
import { validateNodeKind } from '../errors'
import { getName } from '../helper'
import { DescriptionApiMixin } from '../mixins/description'
import { NameApiMixin } from '../mixins/name'
import { InputValuesAsArgumentsApiMixin } from './input-value-and-field-definition'

/**
 * @category API Public
 */

export class DirectiveDefinitionApi extends Mix(
  NameApiMixin,
  DescriptionApiMixin,
  InputValuesAsArgumentsApiMixin,
) {
  constructor(readonly node: GQL.DirectiveDefinitionNode) {
    super([node], [node], [node])

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
    mutable(this.node).locations = applyPropsArr(nameNode, values) as GQL.NameNode[]

    return this
  }

  hasLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): boolean {
    const name = getName(value)

    return this.node.locations.some((loc) => loc.value === name)
  }

  createLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    const next = applyProps(nameNode, value)

    if (this.node.locations.some((loc) => loc.value === next.value)) {
      throw Error(`location '${next.value}' on ${this.node.name.value} already exists`)
    }

    deepMutable(this.node).locations.push(next)

    return this
  }

  upsertLocation(value: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    const next = applyProps(nameNode, value)

    const index = this.node.locations.findIndex((loc) => loc.value === next.value)

    if (index !== -1) {
      deepMutable(this.node).locations[index] = next
    }
    else {
      deepMutable(this.node).locations.push(next)
    }

    return this
  }

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
export function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): DirectiveDefinitionApi {
  return new DirectiveDefinitionApi(node)
}
