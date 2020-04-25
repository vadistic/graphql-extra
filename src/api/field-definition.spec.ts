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
    // eslint-disable-next-line jest/expect-expect
    test(Mixin.NameApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(Mixin.DescriptionApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(Mixin.DirectivesApiMixin.name, () => {
      //
    })
    // eslint-disable-next-line jest/expect-expect
    test(Mixin.InputValuesAsArgumentsApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(Mixin.TypeApiMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('FieldDefinition')).toBe(true)
    })
  })
})
