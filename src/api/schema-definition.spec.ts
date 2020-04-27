import { Api, Ast } from '../internal'

describe(Api.SchemaDefinitionApi.name, () => {
  const node = Ast.schemaDefinitionNode({
    operationTypes: [
      { operation: 'query', type: 'MyQueryRootType' },
      { operation: 'mutation', type: 'MyMutationRootType' },
    ],
  })


  const api = Api.schemaDefinitionApi(node)


  describe('hooks', () => {
    test('description', () => {
      expect(api.description.get()).toBe(undefined)
    })

    test('directives', () => {
      expect(api.directives.findManyNodes({})).toEqual([])
    })

    test('operationTypes', () => {
      expect(api.operationTypes.has('query')).toBe(true)
    })
  })
})
