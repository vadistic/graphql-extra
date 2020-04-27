import { Api, Ast } from '../internal'

describe(Api.DirectiveDefinitionApi.name, () => {
  const node = Ast.directiveDefinitionNode({
    name: 'Client',
    locations: ['ARGUMENT_DEFINITION'],
    description: 'My description',
    repeatable: false,
  })

  const api = Api.directiveDefinitionApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toBe('Client')
    })

    test('repeatable', () => {
      expect(api.repeatable.get()).toBe(false)
    })

    test('locations', () => {
      expect(api.locations.has('ARGUMENT_DEFINITION')).toBe(true)
    })
  })
})
