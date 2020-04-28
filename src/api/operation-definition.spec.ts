import { Api, Mixin, Ast } from '../internal'

describe(Api.OperationDefinitionApi.name, () => {
  const p = Api.OperationDefinitionApi.prototype

  const node = Ast.operationDefinitionNode({
    operation: 'query',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = Api.operationDefinitionApi(node)

  describe('methods', () => {
    test(p.getOperationType.name, () => {
      expect(api.getOperationType()).toBe(node.operation)
    })

    test(p.setOperationType.name, () => {
      api.setOperationType('subscription')
      expect(node.operation).toBe('subscription')
    })
  })

  describe('mixins', () => {
    test(Mixin.NameOptionalMixin.name, () => {
      expect(api.getName()).toBeUndefined()

      api.setName('MyQuery')

      expect(api.getName()).toBe('MyQuery')
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.SelectionSetMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('OperationDefinition')).toBe(true)
    })
  })
})
