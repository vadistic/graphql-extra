import { Ast, Api } from '../internal'

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

  describe('hooks', () => {
    test('selections', () => {
      expect(api.selections.has('MyFragment')).toBe(true)
    })
  })
})
