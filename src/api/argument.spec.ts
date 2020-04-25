import { Api, Mixin, Ast } from '../internal'

describe(Api.ArgumentApi.name, () => {
  const p = Api.ArgumentApi.prototype

  const value = Ast.intValueNode(123)

  const node = Ast.argumentNode({ name: 'age', value })

  const api = Api.argumentApi(node)

  describe('methods', () => {
    test(p.getValue.name, () => {
      expect(api.getValue()).toEqual(value)
    })

    test(p.setValue.name, () => {
      const nextValue = Ast.stringValueNode('hello')
      api.setValue(nextValue)
      expect(api.getValue()).toEqual(nextValue)
    })
  })

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('age')
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('Argument')).toBe(true)
    })
  })
})
