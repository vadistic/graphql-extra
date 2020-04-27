import { Api, Hooks, Ast } from '../internal'

describe(Api.FieldApi.name, () => {
  const node = Ast.fieldNode({
    name: 'myField',
    directives: ['Client'],
    arguments: [{ name: 'age', value: Ast.variableNode('age') }],
    selections: ['myNestedfield'],
  })

  const api = Api.fieldApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toBe('myField')
    })

    test('argument', () => {
      expect(api.arguments.has('age')).toBe(true)
    })

    test('directives', () => {
      expect(api.directives.has('Client')).toBe(true)
    })

    test('selections', () => {
      expect(api.selections.has('myNestedfield')).toBe(true)
    })
  })
})

describe(Api.FragmentSpreadApi.name, () => {
  const node = Ast.fragmentSpreadNode({
    name: 'MyFragment',
    directives: ['Client'],
  })

  const api = Api.fragmentSpreadApi(node)

  describe('hooks', () => {
    test(Hooks.nameMixin.name, () => {
      expect(api.name.get()).toBe('MyFragment')
    })


    test(Hooks.directivesMixin.name, () => {
      expect(api.directives.has('Client')).toBe(true)
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

  describe('hooks', () => {
    test(Hooks.typeConditionMixin.name, () => {
      expect(api.typeCondition.get()).toBe('MyType')
    })

    test(Hooks.directivesMixin.name, () => {
      expect(api.directives.has('Client')).toBe(true)
    })

    test(Hooks.selectionSetMixin.name, () => {
      expect(api.selections.has('myField')).toBe(true)
    })
  })
})
