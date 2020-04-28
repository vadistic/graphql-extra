import { Api, Mixin, Ast } from '../internal'

describe(Api.VariableApi.name, () => {
  const node = Ast.variableNode('MyVariable')
  const api = Api.variableApi(node)

  test('works', () => {
    expect(api).toBeInstanceOf(Api.VariableApi)
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('Variable')).toBe(true)
    })
  })
})
