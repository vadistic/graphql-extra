import { Api, Ast } from '../internal'

describe(Api.DirectiveApi.name, () => {
  const value = Ast.intValueNode(123)
  const argument = Ast.argumentNode({ name: 'maxAge', value })

  const node = Ast.directiveNode({ name: 'Cache', arguments: [argument] })

  const api = Api.directiveApi(node)

  test('works', () => {
    expect(api.arguments.has('maxAge')).toBe(true)
  })
})
