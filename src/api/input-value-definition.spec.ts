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

    test.skip(p.getDefaultValue.name, () => {
      //
    })

    test.skip(p.setDefaultValue.name, () => {
      //
    })
  })

  describe('mixins', () => {
    test.skip(Mixin.NameApiMixin.name, () => {
      //
    })

    test.skip(Mixin.DescriptionApiMixin.name, () => {
      //
    })

    test.skip(Mixin.DirectivesApiMixin.name, () => {
      //
    })

    test.skip(Mixin.TypeApiMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('InputValueDefinition')).toBe(true)
    })
  })
})
