import { Kind } from 'graphql'

import { Api, Mixin, Ast } from '../internal'

describe(Api.OperationTypeDefinitionApi.name, () => {
  const p = Api.OperationTypeDefinitionApi.prototype

  const node = Ast.operationTypeDefinitionNode({
    operation: 'query',
    type: 'MyQuery',
  })
  const api = Api.operationTypeDefinitionApi(node)

  describe('methods', () => {
    test(p.getOperation.name, () => {
      expect(api.getOperation()).toBe('query')
    })

    test(p.setOperation.name, () => {
      api.setOperation('mutation')
      expect(api.getOperation()).toBe('mutation')
    })

    test(p.getType.name, () => {
      expect(api.getType().node.kind).toBe(Kind.NAMED_TYPE)
    })

    test(p.setType.name, () => {
      api.setType({ name: 'AnotherQuery' })
      expect(api.node.type.name.value).toBe('AnotherQuery')
    })
  })

  describe('mixins', () => {
    test(Mixin.NamedTypeApiMixin.name, () => {
      expect(api.getTypename()).toBe('AnotherQuery')

      api.setTypename('ApiQuery')

      expect(api.getTypename()).toBe('ApiQuery')
    })
  })
})
