import { Hooks, Ast } from '../internal'

describe('hooks', () => {
  describe('repeatable', () => {
    const node = Ast.directiveDefinitionNode({
      name: 'Client',
      locations: [],
      repeatable: false,
    })

    const repeatable = Hooks.repeatableHook(node)

    test('get', () => {
      expect(repeatable.get()).toBe(false)
    })

    test('set', () => {
      repeatable.set(true)
      expect(repeatable.get()).toBe(true)
    })

    test('is', () => {
      expect(repeatable.is(true)).toBe(true)
    })
  })

  describe('locations', () => {
    const node = Ast.directiveDefinitionNode({
      name: 'Client',
      locations: ['ARGUMENT_DEFINITION'],
    })

    const locations = Hooks.locationsHook(node)

    test('has & test ok', () => {
      expect(locations.has('QUERY')).toBe(false)

      expect(locations.has('ARGUMENT_DEFINITION')).toBe(true)
      expect(locations.test({ name: 'ARGUMENT_DEFINITION' })).toBe(true)
      expect(locations.test(Ast.nameNode('ARGUMENT_DEFINITION'))).toBe(true)
    })

    test('create ok', () => {
      expect(locations.has('ENUM')).toBe(false)
      locations.create('ENUM')
      expect(locations.has('ENUM')).toBe(true)
    })
  })
})
