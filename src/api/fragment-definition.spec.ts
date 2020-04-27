import { Api, Ast } from '../internal'

describe(Api.FragmentDefinitionApi.name, () => {
  const node = Ast.fragmentDefinitionNode({
    name: 'MyFragment',
    selections: ['myField'],
    typeCondition: 'MyType',
    directives: ['Client'],
    variableDefinitions: [{ variable: 'age', type: 'Int!' }],
  })

  const api = Api.fragmentDefinitionApi(node)

  test('works', () => {
    expect(api.name.get()).toBe('MyFragment')
  })
})
