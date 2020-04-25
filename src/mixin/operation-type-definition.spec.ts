import { Mixin, Ast } from '../internal'

describe(Mixin.OperationTypeDefinitionApiMixin, () => {
  const p = Mixin.OperationTypeDefinitionApiMixin.prototype

  const operation = Ast.operationTypeDefinitionNode({
    operation: 'query',
    type: 'MyQuery',
  })

  const node = Ast.schemaDefinitionNode({ operationTypes: [operation] })

  const api = Mixin.operationTypeDefinitionApiMixin(node)

  test(p.getOperationType.name, () => {
    expect(api.getOperationType('query')?.getTypename()).toBe('MyQuery')
  })

  test(p.hasOperationType.name, () => {
    expect(api.hasOperationType('subscription')).toBe(false)
  })

  test(p.getOperationTypenames.name, () => {
    expect(api.getOperationTypenames()).toEqual(['MyQuery'])
  })

  test(p.createOperationType.name, () => {
    api.createOperationType({ operation: 'mutation', type: 'MyMutation' })

    expect(api.hasOperationType('mutation')).toEqual(true)

    expect(() =>
      api.createOperationType({ operation: 'mutation', type: 'MyMutation' }))
      .toThrowError('cannot create')
  })

  test(p.getQuery.name, () => {
    expect(api.getQuery()?.getTypename()).toEqual('MyQuery')
  })
})
