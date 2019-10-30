import { DirectiveDefinitionNode, DirectiveLocationEnum, NameNode } from 'graphql'
import {
  NameApiMixin,
  DescriptionApiMixin,
  InputValuesAsArgumentsApiMixin,
  nameApiMixin,
  descriptionApiMixin,
  inputValuesAsArgumentsApiMixin,
} from '../mixins'
import { DeepMutable, getName, applyPropsArr, applyProps } from '../../utils'
import { nameNode } from '../../node'

/**
 * @category API Public
 */
export interface DirectiveDefinitionApi
  extends NameApiMixin<DirectiveDefinitionApi>,
    DescriptionApiMixin<DirectiveDefinitionApi>,
    InputValuesAsArgumentsApiMixin<DirectiveDefinitionApi> {
  node: DirectiveDefinitionNode

  isRepeatable(): boolean
  setRepeatable(value: boolean): DirectiveDefinitionApi

  getLocations(): DirectiveLocationEnum[]
  setLocations(values: NameNode[] | DirectiveLocationEnum[]): DirectiveDefinitionApi

  hasLocation(value: NameNode | DirectiveLocationEnum): boolean

  // makes liiitle sense but let's keep convention
  createLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
  upsertLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
  removeLocation(value: NameNode | DirectiveLocationEnum): DirectiveDefinitionApi
}

/**
 * @category API Public
 */
export function directiveDefinitionApi(node: DirectiveDefinitionNode): DirectiveDefinitionApi {
  const _node = node as DeepMutable<DirectiveDefinitionNode>

  return {
    node,
    ...nameApiMixin(node),
    ...descriptionApiMixin(node),
    ...inputValuesAsArgumentsApiMixin(node),

    isRepeatable() {
      return node.repeatable
    },

    setRepeatable(value) {
      _node.repeatable = value

      return this as any
    },

    getLocations() {
      return node.locations.map(getName) as DirectiveLocationEnum[]
    },

    setLocations(values) {
      _node.locations = applyPropsArr(nameNode, values) as NameNode[]

      return this as any
    },

    hasLocation(value) {
      const name = getName(value)
      return node.locations.some(loc => loc.value === name)
    },

    createLocation(value) {
      const next = applyProps(nameNode, value)

      if (node.locations.some(loc => loc.value === next.value)) {
        throw Error(`location '${next.value}' on ${node.name.value} already exists`)
      }

      _node.locations.push(next)

      return this as any
    },

    upsertLocation(value) {
      const next = applyProps(nameNode, value)

      const index = node.locations.findIndex(loc => loc.value === next.value)

      if (index !== -1) {
        _node.locations[index] = next
      } else {
        _node.locations.push(next)
      }

      return this as any
    },

    removeLocation(value) {
      const name = getName(value)
      const index = node.locations.findIndex(loc => loc.value === name)

      if (index === -1) {
        throw Error(`location '${name}' on ${node.name.value} does not exist`)
      }

      _node.locations.splice(index, 1)

      return this as any
    },
  }
}
