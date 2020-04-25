import { Mixin, Ast } from '../internal'

describe(Mixin.SelectionSetApiMixin.name, () => {
  const p = Mixin.SelectionSetApiMixin.prototype

  const node = Ast.operationDefinitionNode({
    operation: 'query',
    name: 'MyQuery',
    selections: ['myField'],
  })

  const api = Mixin.selectionSetApiMixin(node)

  test(p.hasSelectionSet.name, () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })

  test(p.getSelections.name, () => {
    const selections = api.getSelections()

    expect(selections.length).toBe(1)
    expect(selections[0].isField()).toBeTruthy()
  })
})
