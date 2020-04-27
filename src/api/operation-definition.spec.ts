import { Api, Ast } from '../internal'

describe(Api.OperationDefinitionApi.name, () => {
  const node = Ast.operationDefinitionNode({
    operation: 'query',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = Api.operationDefinitionApi(node)


  describe('hooks', () => {
    test('operation', () => {
      expect(api.operation.is('query')).toBe(true)
    })

    test('name optional', () => {
      expect(api.name.is()).toBe(false)
      api.name.set('MyQuery')
      expect(api.name.is()).toBe(true)
      expect(api.name.get()).toBe('MyQuery')
      api.name.unset()
      expect(api.name.is()).toBe(false)
    })

    test('variables', () => {
      expect(api.variables.findManyNames()).toEqual([])
    })

    test('directives', () => {
      expect(api.directives.test({ name: 'Client' })).toBe(true)
    })

    test('selections', () => {
      expect(api.selections.has('myField')).toBe(true)
      expect(api.selections.findManyNames()).toEqual(['myField'])
    })
  })
})
