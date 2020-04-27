import { Api, Ast } from '../internal'

describe(Api.FragmentDefinitionApi.name, () => {
  const node = Ast.fragmentDefinitionNode({
    name: 'MyFragment',
    variableDefinitions: [{ variable: 'age', type: 'Int!' }],
    typeCondition: 'MyType',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = Api.fragmentDefinitionApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toBe('MyFragment')
    })

    test('variables', () => {
      expect(api.variables.has('age')).toBe(true)
    })

    test('typeCondition', () => {
      expect(api.typeCondition.get()).toBe('MyType')
    })

    test('directives', () => {
      expect(api.directives.has('Client')).toBe(true)
    })

    test('selections', () => {
      expect(api.selections.has('myField')).toBe(true)
    })
  })
})
