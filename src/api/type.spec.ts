import { Api, Ast } from '../internal'

describe(Api.TypeApi.name, () => {
  const node = Ast.typeNode({ named: 'Int', list: true })

  const api = Api.typeApi(node)

  test('works', () => {
    expect(api.isList()).toBe(true)
  })
})


describe(Api.NamedTypeApi.name, () => {
  const node = Ast.namedTypeNode('MyType')

  const api = Api.namedTypeApi(node)

  test('works', () => {
    expect(api.name.get()).toBe('MyType')
  })
})
