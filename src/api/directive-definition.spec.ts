import { Api, Mixin, Ast } from '../internal'

describe(Api.DirectiveDefinitionApi.name, () => {
  const p = Api.DirectiveDefinitionApi.prototype

  const node = Ast.directiveDefinitionNode({
    name: 'Client',
    locations: ['ARGUMENT_DEFINITION'],
    description: 'My description',
  })

  const api = Api.directiveDefinitionApi(node)

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(p.isRepeatable.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(p.getLocations.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setLocations.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(p.hasLocation.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(p.hasLocation.name, () => {

    })
  })

  describe('mixins', () => {
    // eslint-disable-next-line jest/expect-expect
    test(Mixin.NameApiMixin.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(Mixin.DescriptionApiMixin.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(Mixin.InputValuesAsArgumentsApiMixin.name, () => {

    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('DirectiveDefinition')).toBe(true)
    })
  })
})
