import { Api, Mixin } from '../internal'

describe(Api.InputValueApi.name, () => {
  const p = Api.InputValueApi.prototype

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
  })
})
