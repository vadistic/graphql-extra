import { Api, Mixin, Ast } from '../internal'

describe(Api.FieldApi.name, () => {
  const node = Ast.fieldNode({
    name: 'myField',
    directives: ['Client'],
    arguments: [{ name: 'age', value: Ast.variableNode('age') }],
    selections: ['myNestedfield'],
  })

  const api = Api.fieldApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('myField')
    })

    test(Mixin.ArgumentsApiMixin.name, () => {
      expect(api.getArgumentNames()).toMatchObject(['age'])
    })

    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.getDirectiveNames()).toMatchObject(['Client'])
    })

    test(Mixin.SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.SelectionAssertionApiMixin.name, () => {
      expect(api.isField()).toBeTruthy()
    })
  })
})

describe(Api.FragmentSpreadApi.name, () => {
  const node = Ast.fragmentSpreadNode({
    name: 'MyFragment',
    directives: ['Client'],
  })

  const api = Api.fragmentSpreadApi(node)

  describe('mixins', () => {
    test(Mixin.NameApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })


    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.SelectionAssertionApiMixin.name, () => {
      expect(api.isFragmentSpread()).toBeTruthy()
    })
  })
})


describe(Api.InlineFragmentApi.name, () => {
  const node = Ast.inlineFragmentNode({
    typeCondition: 'MyType',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = Api.inlineFragmentApi(node)

  describe('mixins', () => {
    test(Mixin.DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.SelectionAssertionApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })
  })
})
