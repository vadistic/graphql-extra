import { Api, Hooks, Ast } from '../internal'

describe(Api.OperationDefinitionApi.name, () => {
  const node = Ast.operationDefinitionNode({
    operation: 'query',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = Api.operationDefinitionApi(node)


  describe('hooks', () => {
    test(Hooks.operationMixin.name, () => {
      expect(api.operation.get()).toBe('query')
    })

    test(Hooks.nameOptionalMixin.name, () => {
      expect(api.operation.get()).toBe('query')
    })

    test('variables', () => {
      expect(api.variables.findMany({})).toEqual([])
    })

    test('directives', () => {
      expect(api.directives.test({ name: 'Client' })).toBe(true)
    })

    test('selections', () => {
      expect(api.selections.has('myField')).toBe(true)
    })
  })
})
