import { Api, Ast } from '../internal'


describe(Api.FieldDefinitionApi.name, () => {
  const node = Ast.fieldDefinitionNode({
    name: 'myField',
    description: 'my field description',
    arguments: [{ name: 'maxAge', type: 'Int!' }],
    directives: ['Client'],
    type: 'String!',
  })
  const api = Api.fieldDefinitionApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toBe(node.name.value)
    })

    test('description', () => {
      expect(api.description.get()).toBe(node.description?.value)
    })

    test('arguments', () => {
      expect(api.arguments.has('maxAge')).toBe(true)
    })

    test('type', () => {
      expect(api.type.is('String')).toBe(false)
      expect(api.type.is('String!')).toBe(true)
    })

    test('directives', () => {
      expect(api.directives.has('Client')).toBe(true)
    })
  })
})
