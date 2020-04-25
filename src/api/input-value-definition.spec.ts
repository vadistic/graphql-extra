import { Api, Mixin, Ast } from '../internal'

describe(Api.InputValueDefinitionApi.name, () => {
  const p = Api.InputValueDefinitionApi.prototype

  const node = Ast.inputValueDefinitionNode({ name: 'myField', type: 'Int' })

  const api = Api.inputValueDefinitionApi(node)

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(p.toField.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.getDefaultValue.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setDefaultValue.name, () => {
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
    test(Mixin.TypeApiMixin.name, () => {
      //
    })

    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('InputValueDefinition')).toBe(true)
    })
  })
})
