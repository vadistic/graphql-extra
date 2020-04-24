import { operationDefinitionNode } from '../../node'
import { operationDefinitionApi } from './operation-definition'

describe('OperationDefinitionApi', () => {
  const node = operationDefinitionNode({
    operation: 'query',
    selections: ['myField'],
  })

  const api = operationDefinitionApi(node)

  test('getOperationType', () => {
    expect(api.getOperationType()).toBe(node.operation)
  })

  test('setOperationType', () => {
    api.setOperationType('subscription')
    expect(node.operation).toBe('subscription')
  })
})
