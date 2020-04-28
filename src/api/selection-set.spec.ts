import { Ast, Api, Mixin } from '../internal'

describe(Api.SelectionSetApi.name, () => {
  const node = Ast.selectionSetNode({
    selections: [
      'myField',
      Ast.fragmentSpreadNode('MyFragment'),
      Ast.inlineFragmentNode({
        selections: ['nestedfield'],
        typeCondition: 'MyType',
      }),
    ],
  })

  const api = Api.selectionSetApi(node)

  describe('methods', () => {
    //
  })


  describe('mixins', () => {
    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('SelectionSet')).toBe(true)
    })

    test(Mixin.SelectionAssertionMixin.name, () => {
      expect(api.isKind('SelectionSet')).toBe(true)
    })
  })
})
