import { Mixin, Ast } from '../internal'

describe(Mixin.OperationTypeDefinitionMixin, () => {
  const p = Mixin.OperationTypeDefinitionMixin.prototype

  const operation = Ast.operationTypeDefinitionNode({
    operation: 'query',
    type: 'MyQuery',
  })

  const node = Ast.schemaDefinitionNode({ operationTypes: [operation] })

  const mixin = Mixin.operationTypeDefinitionMixin(node)

  test(p.getOperationType.name, () => {
    expect(mixin.getOperationType('query')?.getTypename()).toBe('MyQuery')
  })

  test(p.hasOperationType.name, () => {
    expect(mixin.hasOperationType('subscription')).toBe(false)
  })

  test(p.getOperationTypenames.name, () => {
    expect(mixin.getOperationTypenames()).toEqual(['MyQuery'])
  })

  test(p.createOperationType.name, () => {
    mixin.createOperationType({ operation: 'mutation', type: 'MyMutation' })

    expect(mixin.hasOperationType('mutation')).toEqual(true)

    expect(() =>
      mixin.createOperationType({ operation: 'mutation', type: 'MyMutation' }))
      .toThrowError('cannot create')
  })

  test(p.getQuery.name, () => {
    expect(mixin.getQuery()?.getTypename()).toEqual('MyQuery')
  })
})
