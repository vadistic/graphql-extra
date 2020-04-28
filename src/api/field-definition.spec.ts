/* eslint-disable jest/no-disabled-tests */
import { Api, Mixin, Ast } from '../internal'


describe(Api.FieldDefinitionApi.name, () => {
  const p = Api.FieldDefinitionApi.prototype

  const node = Ast.fieldDefinitionNode({ name: 'myField', type: 'Int!' })

  const api = Api.fieldDefinitionApi(node)

  describe('methods', () => {
    test.skip(p.toInputValue.name, () => {
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

    test.skip(Mixin.InputValuesAsArgumentsMixin.name, () => {
      //
    })

    test.skip(Mixin.TypeMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('FieldDefinition')).toBe(true)
    })
  })
})
