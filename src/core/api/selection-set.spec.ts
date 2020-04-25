import { selectionSetNode, fragmentSpreadNode, inlineFragmentNode } from '../../node'
import { selectionSetApi, SelectionSetApi } from './selection-set'

describe(SelectionSetApi.name, () => {
  const t = SelectionSetApi.prototype
  const node = selectionSetNode([
    'myField',
    fragmentSpreadNode('MyFragment'),
    inlineFragmentNode({
      selections: ['nestedfield'],
      typeCondition: 'MyType',
    })])

  const api = selectionSetApi(node)

  test(t.isEmpty.name, () => {
    expect(api.isEmpty()).toBeFalsy()
  })
})
