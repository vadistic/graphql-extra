import { Kind } from 'graphql'

import { operationTypeDefinitionNode } from '../../node'
import { NamedTypeApiMixin } from '../mixins/type'
import { operationTypeDefinitionApi, OperationTypeDefinitionApi } from './operation-type-definition'

describe(OperationTypeDefinitionApi.name, () => {
  const t = OperationTypeDefinitionApi.prototype
  const node = operationTypeDefinitionNode({
    operation: 'query',
    type: 'MyQuery',
  })
  const api = operationTypeDefinitionApi(node)

  describe('methods', () => {
    test(t.getOperation.name, () => {
      expect(api.getOperation()).toBe('query')
    })

    test(t.setOperation.name, () => {
      api.setOperation('mutation')
      expect(api.getOperation()).toBe('mutation')
    })

    test(t.getType.name, () => {
      expect(api.getType().node.kind).toBe(Kind.NAMED_TYPE)
    })

    test(t.setType.name, () => {
      api.setType({ name: 'AnotherQuery' })
      expect(api.node.type.name.value).toBe('AnotherQuery')
    })
  })

  describe('mixins', () => {
    test(NamedTypeApiMixin.name, () => {
      expect(api.getTypename()).toBe('AnotherQuery')

      api.setTypename('ApiQuery')

      expect(api.getTypename()).toBe('ApiQuery')
    })
  })
})
