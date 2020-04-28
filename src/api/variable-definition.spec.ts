import { nodes } from '../../test/nodes'
import { Api, Mixin } from '../internal'

describe(Api.VariableDefinitionApi.name, () => {
  const node = nodes.VariableDefinition
  const api = Api.variableDefinitionApi(node)

  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(Mixin.TypeMixin.name, () => {
      expect(api.getType().node).toBe(node.type)
    })

    test(Mixin.DirectivesMixin.name, () => {
      expect(api.getDirectives().map((a) => a.node)).toEqual(node.directives)
    })

    test(Mixin.VariableMixin.name, () => {
      expect(api.getVariableName()).toBe(node.variable.name.value)
    })

    test(Mixin.DefaultValueMixin.name, () => {
      expect(api.getDefaultValue()?.node).toBe(node.defaultValue)
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('VariableDefinition')).toBe(true)
    })
  })
})
