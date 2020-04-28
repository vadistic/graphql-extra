import { Mixin, Api, Ast } from '../internal'

describe(Api.EnumValueDefinitionApi.name, () => {
  const node = Ast.enumValueDefinitionNode({
    name: 'TEST',
    description: 'this is a test case',
    directives: ['Client'],

  })

  const api = Api.enumValueDefinitionApi(node)

  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('TEST')
    })

    test(Mixin.DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe('this is a test case')
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('EnumValueDefinition')).toBe(true)
    })
  })
})
