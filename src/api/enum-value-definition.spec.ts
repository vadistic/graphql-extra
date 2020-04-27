import { Api, Ast } from '../internal'

describe(Api.EnumValueDefinitionApi.name, () => {
  const node = Ast.enumValueDefinitionNode({
    name: 'TEST',
    description: 'this is a test case',
    directives: ['Client'],
  })

  const api = Api.enumValueDefinitionApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toBe('TEST')
    })

    test('description', () => {
      expect(api.description.get()).toBe('this is a test case')
    })

    test('directives', () => {
      expect(api.directives.has('Client')).toBe(true)
    })
  })
})
