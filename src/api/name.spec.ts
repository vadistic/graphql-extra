import { Api, Mixin, Ast } from '../internal'

describe(Api.NameApi.name, () => {
  const node = Ast.nameNode('MyName')
  const api = Api.nameApi(node)

  test('works', () => {
    expect(api).toBeInstanceOf(Api.NameApi)
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('Name')).toBe(true)
    })
  })
})
