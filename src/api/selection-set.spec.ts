import { Ast, Api, Mixin } from '../internal'

describe(Api.SelectionSetApi.name, () => {
  const p = Api.SelectionSetApi.prototype

  const node = Ast.selectionSetNode([
    'myField',
    Ast.fragmentSpreadNode('MyFragment'),
    Ast.inlineFragmentNode({
      selections: ['nestedfield'],
      typeCondition: 'MyType',
    })])

  const api = Api.selectionSetApi(node)

  describe('methods', () => {
    test(p.isEmpty.name, () => {
      expect(api.isEmpty()).toBeFalsy()
    })
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('SelectionSet')).toBe(true)
    })
  })
})
