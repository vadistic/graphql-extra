import { Api, Ast } from '../internal'

describe(Api.EnumValueDefinitionApi.name, () => {
  const node = Ast.enumValueDefinitionNode({
    name: 'TEST',
    description: 'this is a test case',
    directives: ['Client'],
  })

  const api = Api.enumValueDefinitionApi(node)

  test('works', () => {
    expect(api.name.get()).toBe('TEST')
  })
})
