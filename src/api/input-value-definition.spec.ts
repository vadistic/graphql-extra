import { Api, Ast } from '../internal'

describe(Api.InputValueDefinitionApi.name, () => {
  const node = Ast.inputValueDefinitionNode({
    name: 'myField',
    type: 'Int!',
    defaultValue: Ast.intValueNode(1),
  })

  const api = Api.inputValueDefinitionApi(node)

  describe('hooks', () => {
    test('description', () => {
      expect(api.description.is()).toBe(false)
    })

    test('name', () => {
      expect(api.name.is('myField')).toBe(true)
      expect(api.name.is({ name: 'myField' })).toBe(true)
      expect(api.name.is(Ast.nameNode('random'))).toBe(false)
    })

    test('type', () => {
      expect(api.type.is('Int!')).toBe(true)
      expect(api.type.is({ named: 'Int', nonNull: true })).toBe(true)
    })

    test('defaultValue', () => {
      expect(api.defaultValue.is(Ast.intValueNode(1))).toBe(true)
      expect(api.defaultValue.get().toJs()).toBe(1)
    })

    test('directives', () => {
      expect(api.directives.findManyNames()).toEqual([])
    })
  })
})
