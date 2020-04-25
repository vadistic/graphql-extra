import { Api, Mixin } from '../internal'


describe(Api.FieldDefinitionApi.name, () => {
  const p = Api.FieldDefinitionApi.prototype

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
  })
})
