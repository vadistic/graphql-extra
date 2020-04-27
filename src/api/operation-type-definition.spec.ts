import { Api, Ast } from '../internal'

describe(Api.OperationTypeDefinitionApi.name, () => {
  const node = Ast.operationTypeDefinitionNode({
    operation: 'query',
    type: 'MyQuery',
  })
  const api = Api.operationTypeDefinitionApi(node)

  describe('hooks', () => {
    test('operation', () => {
      expect(api.operation.is('query')).toBe(true)
    })

    test('type', () => {
      expect(api.type.is('MyQuery')).toBe(true)
    })
  })
})
