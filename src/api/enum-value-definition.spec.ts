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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe('TEST')
    })

    test(Mixin.DescriptionMixin.name, () => {
      expect(api.getDescription()).toBe('this is a test case')
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('EnumValueDefinition')).toBe(true)
    })
  })
})
