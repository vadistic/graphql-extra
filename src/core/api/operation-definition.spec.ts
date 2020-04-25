import { operationDefinitionNode } from '../../node'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameOptionalApiMixin } from '../mixins/name'
import { operationDefinitionApi, OperationDefinitionApi } from './operation-definition'
import { SelectionSetApiMixin } from './selection'

describe(OperationDefinitionApi.name, () => {
  const t = OperationDefinitionApi.prototype
  const node = operationDefinitionNode({
    operation: 'query',
    directives: ['Client'],
    selections: ['myField'],
  })
  const api = operationDefinitionApi(node)

  describe('methods', () => {
    test(t.getOperationType.name, () => {
      expect(api.getOperationType()).toBe(node.operation)
    })

    test(t.setOperationType.name, () => {
      api.setOperationType('subscription')
      expect(node.operation).toBe('subscription')
    })
  })

  describe('mixins', () => {
    test(NameOptionalApiMixin.name, () => {
      expect(api.getName()).toBeUndefined()

      api.setName('MyQuery')

      expect(api.getName()).toBe('MyQuery')
    })

    test(DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })
  })
})
