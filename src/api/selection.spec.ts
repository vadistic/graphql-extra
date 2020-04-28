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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe('myField')
    })

    test(Mixin.ArgumentsMixin.name, () => {
      expect(api.getArgumentNames()).toMatchObject(['age'])
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectiveNames()).toMatchObject(['Client'])
    })

    test(Mixin.SelectionSetMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.SelectionAssertionMixin.name, () => {
      expect(api.isField()).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('Field')).toBe(true)
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
    test(Mixin.NameMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })


    test(Mixin.DirectivesMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.SelectionAssertionMixin.name, () => {
      expect(api.isFragmentSpread()).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('FragmentSpread')).toBe(true)
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
    test(Mixin.DirectivesMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.SelectionSetMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.SelectionAssertionMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('InlineFragment')).toBe(true)
    })
  })
})
