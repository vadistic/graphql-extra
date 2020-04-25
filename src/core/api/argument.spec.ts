import { argumentNode, intValueNode, stringValueNode } from '../../node'
import { NameApiMixin } from '../mixins/name'
import { argumentApi, ArgumentApi } from './argument'

describe(ArgumentApi.name, () => {
  const t = ArgumentApi.prototype
  const value = intValueNode(123)
  const node = argumentNode({ name: 'age', value })
  const api = argumentApi(node)

  describe('methods', () => {
    test(t.getValue.name, () => {
      expect(api.getValue()).toEqual(value)
    })

    test(t.setValue.name, () => {
      const nextValue = stringValueNode('hello')
      api.setValue(nextValue)
      expect(api.getValue()).toEqual(nextValue)
    })
  })

  describe('mixins', () => {
    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('age')
    })
  })
})
