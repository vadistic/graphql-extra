import { Kind } from 'graphql'

import { operationTypeDefinitionNode } from '../../node'
import { operationTypeDefinitionApi } from './operation-type-definition'

describe('OperationTypeDefinitionApi', () => {
  const node = operationTypeDefinitionNode({ operation: 'query', type: 'MyQuery' })
  const api = operationTypeDefinitionApi(node)

  test('getOperation', () => {
    expect(api.getOperation()).toBe('query')
  })

  test('setOperation', () => {
    api.setOperation('mutation')
    expect(api.getOperation()).toBe('mutation')
  })

  test('getType', () => {
    expect(api.getType().node.kind).toBe(Kind.NAMED_TYPE)
  })

  test('setType', () => {
    api.setType({ name: 'AnotherQuery' })
    expect(api.node.type.name.value).toBe('AnotherQuery')
  })

  test('NamedTypeApiMixin > getTypename', () => {
    api.setTypename('ApiQuery')

    expect(api.getTypename()).toBe('ApiQuery')
  })
})
