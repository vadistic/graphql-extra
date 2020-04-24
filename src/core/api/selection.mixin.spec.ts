import { operationDefinitionNode } from '../../node'
import { operationDefinitionApi } from './operation-definition'

describe('SelectionSetApiMixin', () => {
  const node = operationDefinitionNode({
    operation: 'query',
    name: 'MyQuery',
    selections: ['myField'],
  })

  const api = operationDefinitionApi(node)


  test('hasSelections', () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })

  test('getSelections', () => {
    const selections = api.getSelections()

    expect(selections.length).toBe(1)
    expect(selections[0].isField()).toBeTruthy()
  })
})
