import { Api, Mixin, Ast } from '../internal'

describe(Api.ValueApi.name, () => {
  const p = Api.ValueApi.prototype
  const node = Ast.intValueNode(1)
  const api = Api.valueApi(node)

  describe('methods', () => {
    test(p.toJs.name, () => {
      expect(api.toJs()).toBe(1)
    })

    test(p.set.name, () => {
      api.set(Ast.booleanValueNode(true))
      expect(api.toJs()).toBe(true)
    })
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('BooleanValue')).toBe(true)
    })
  })
})
