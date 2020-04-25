import { directiveNode, argumentNode, intValueNode } from '../../node'
import { ArgumentsApiMixin } from '../mixins/argument'
import { NameApiMixin } from '../mixins/name'
import { directiveApi, DirectiveApi } from './directive'

describe(DirectiveApi.name, () => {
  const value = intValueNode(123)
  const argument = argumentNode({ name: 'age', value })
  const node = directiveNode({ name: 'Cache', arguments: [argument] })
  const api = directiveApi(node)

  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('Cache')
    })

    test(ArgumentsApiMixin.name, () => {
      expect(api.getArgument('age').getValue()).toEqual(value)
    })
  })
})
