import { Kind } from 'graphql'

import { operationDefinitionApi } from '../../../src'
import { getFirstNodeOfKind } from '../../test-utils'

describe('OperationDefinitionApi', () => {
  test('NameOptionalApiMixin', () => {
    const fixture = /* GraphQL */`
        query {
          user
        }
      `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    expect(api.getName()).toBeUndefined()
    expect(api.node).toBe(node)

    api.setName('MyOperation')

    expect(api.getName()).toBe('MyOperation')
    expect(api.node.name?.value).toBe('MyOperation')
  })


  test('OperationType', () => {
    const fixture = /* GraphQL */`
        query {
          user
        }
      `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    expect(api.getOperationType()).toBe('query')

    api.setOperationType('mutation')

    expect(api.getOperationType()).toBe('mutation')
  })
})
