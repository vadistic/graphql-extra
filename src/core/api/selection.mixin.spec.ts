import { operationDefinitionNode } from '../../node'
import { SelectionSetApiMixin, selectionSetApiMixin } from './selection'

describe(SelectionSetApiMixin.name, () => {
  const t = SelectionSetApiMixin.prototype
  const node = operationDefinitionNode({
    operation: 'query',
    name: 'MyQuery',
    selections: ['myField'],
  })
  const api = selectionSetApiMixin(node)

  test(t.hasSelectionSet.name, () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })

  test(t.getSelections.name, () => {
    const selections = api.getSelections()

    expect(selections.length).toBe(1)
    expect(selections[0].isField()).toBeTruthy()
  })
})
