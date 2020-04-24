import { selectionSetNode, fragmentSpreadNode, inlineFragmentNode } from '../../node'
import { selectionSetApi } from './selection-set'

describe('SelectionSetApi', () => {
  const node = selectionSetNode([
    'myField',
    fragmentSpreadNode('MyFragment'),
    inlineFragmentNode({
      selections: ['nestedfield'],
      typeCondition: 'MyType',
    })])

  const api = selectionSetApi(node)

  test('isEmpty', () => {
    expect(api.isEmpty()).toBeFalsy()
  })
})
