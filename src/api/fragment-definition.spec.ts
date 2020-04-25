import { Api, Mixin, Ast } from '../internal'

describe(Api.FragmentDefinitionApi.name, () => {
  const node = Ast.fragmentDefinitionNode({
    name: 'MyFragment',
    selections: ['myField'],
    typeCondition: 'MyType',
    directives: ['Client'],
    variableDefinitions: [{ variable: 'age', type: 'Int!' }],
  })

  const api = Api.fragmentDefinitionApi(node)


  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(Mixin.NameOptionalApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(Mixin.SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('FragmentDefinition')).toBe(true)
    })
  })
})
