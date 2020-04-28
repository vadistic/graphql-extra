/* eslint-disable jest/no-disabled-tests */
import { Api, Mixin, Ast } from '../internal'

describe(Api.DirectiveDefinitionApi.name, () => {
  const p = Api.DirectiveDefinitionApi.prototype

  const node = Ast.directiveDefinitionNode({
    name: 'Client',
    locations: ['ARGUMENT_DEFINITION'],
    description: 'My description',
    repeatable: false,
  })

  const api = Api.directiveDefinitionApi(node)

  describe('methods', () => {
    test(p.isRepeatable.name, () => {
      expect(api.isRepeatable()).toBe(false)
    })

    test(p.setRepeatable.name, () => {
      api.setRepeatable(true)
      expect(api.isRepeatable()).toBe(true)
    })
  })

  describe('locations crud', () => {
    test(p.hasLocation.name, () => {
      expect(api.hasLocation('ARGUMENT_DEFINITION')).toBe(true)
    })

    test(p.getLocations.name, () => {
      expect(api.getLocations()).toEqual(['ARGUMENT_DEFINITION'])
    })

    test(p.setLocations.name, () => {
      api.setLocations([])
      expect(api.getLocations()).toEqual([])
    })

    test(p.createLocation.name + ' ok', () => {
      api.createLocation('ENUM')
      expect(api.hasLocation('ENUM')).toBe(true)
    })

    test(p.createLocation.name + ' fail', () => {
      expect(() => api.createLocation('ENUM')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot create 'ENUM' in locations of DirectiveDefinition 'Client' because it already exists\"",
      )
    })

    test(p.removeLocation.name + ' ok', () => {
      api.removeLocation('ENUM')
      expect(api.hasLocation('ENUM')).toBe(false)
    })

    test(p.removeLocation.name + ' fail', () => {
      expect(() => api.removeLocation('ENUM')).toThrowErrorMatchingInlineSnapshot(
        '"cannot remove \'ENUM\' in locations of DirectiveDefinition \'Client\' because it does not exist"',
      )
    })
  })

  describe('mixins', () => {
    test.skip(Mixin.NameMixin.name, () => {})

    test.skip(Mixin.DescriptionMixin.name, () => {})

    test.skip(Mixin.InputValuesAsArgumentsMixin.name, () => {})

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('DirectiveDefinition')).toBe(true)
    })
  })
})
