import { Api, Ast } from '../internal'

describe(Api.DirectiveDefinitionApi.name, () => {
  const node = Ast.directiveDefinitionNode({
    name: 'Client',
    locations: ['ARGUMENT_DEFINITION'],
    description: 'My description',
    repeatable: false,
  })

  const api = Api.directiveDefinitionApi(node)

  describe('name', () => {
    test('get', () => {
      expect(api.name.get()).toBe('Client')
    })

    test('set', () => {
      api.name.set({ name: 'Cache' })
      expect(api.name.get()).toBe('Cache')
    })
  })

  describe('repeatable', () => {
    test('get', () => {
      expect(api.repeatable.get()).toBe(false)
    })

    test('set', () => {
      api.repeatable.set(true)
      expect(api.repeatable.get()).toBe(true)
    })
  })

  describe('locations', () => {
    test('has & test ok', () => {
      expect(api.locations.has('ARGUMENT_DEFINITION')).toBe(true)
      expect(api.locations.has('QUERY')).toBe(false)
      expect(api.locations.test({ name: 'ARGUMENT_DEFINITION' })).toBe(true)
    })

    test('create ok', () => {
      expect(api.locations.has('ENUM')).toBe(false)
      api.locations.create('ENUM')
      expect(api.locations.has('ENUM')).toBe(true)
    })
  })
})
