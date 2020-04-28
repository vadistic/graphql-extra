/* eslint-disable jest/no-disabled-tests */
import { Api, Mixin, Ast } from '../internal'


describe(Api.FieldDefinitionApi.name, () => {
  const p = Api.FieldDefinitionApi.prototype

  const node = Ast.fieldDefinitionNode({ name: 'myField', type: 'Int!' })

  const api = Api.fieldDefinitionApi(node)

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(p.toInputValue.name, () => {
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

    test.skip(Mixin.InputValuesAsArgumentsApiMixin.name, () => {
      //
    })

    test.skip(Mixin.TypeApiMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('FieldDefinition')).toBe(true)
    })
  })
})
