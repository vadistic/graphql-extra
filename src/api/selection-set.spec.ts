import { Ast, Api } from '../internal'

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

  test(p.isEmpty.name, () => {
    expect(api.isEmpty()).toBeFalsy()
  })
})
