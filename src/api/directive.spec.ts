import { Api, Ast } from '../internal'

describe(Api.DirectiveApi.name, () => {
  const value = Ast.intValueNode(123)
  const argument = Ast.argumentNode({ name: 'maxAge', value })
  const node = Ast.directiveNode({ name: 'Cache', arguments: [argument] })
  const api = Api.directiveApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.is('Cache')).toBe(true)
    })

    test('arguments', () => {
      expect(api.arguments.has('maxAge')).toBe(true)
    })
  })
})
