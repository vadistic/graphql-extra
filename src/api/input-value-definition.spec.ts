/* eslint-disable jest/no-disabled-tests */
import { Api, Mixin, Ast } from '../internal'

describe(Api.InputValueDefinitionApi.name, () => {
  const p = Api.InputValueDefinitionApi.prototype
  const node = Ast.inputValueDefinitionNode({ name: 'myField', type: 'Int' })
  const api = Api.inputValueDefinitionApi(node)

  describe('methods', () => {
    test.skip(p.toField.name, () => {
      //
    })
  })

  describe('mixins', () => {
    test.skip(Mixin.NameMixin.name, () => {
      //
    })

    test.skip(Mixin.DescriptionMixin.name, () => {
      //
    })

    test.skip(Mixin.DirectivesMixin.name, () => {
      //
    })

    test(Mixin.DefaultValueMixin.name, () => {
      expect(api.getDefaultValue()?.node).toBe(node.defaultValue)
    })

    test.skip(Mixin.TypeMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('InputValueDefinition')).toBe(true)
    })
  })
})
