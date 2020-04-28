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
    test(Mixin.NameOptionalMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(Mixin.SelectionSetMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('FragmentDefinition')).toBe(true)
    })
  })
})
