import { Api, Ast } from '../internal'

describe(Api.NameApi.name, () => {
  const node = Ast.nameNode('MyName')
  const api = Api.nameApi(node)

  describe('hooks', () => {
    test('value', () => {
      expect(api.value.is('MyName')).toBe(true)
    })
  })
})
