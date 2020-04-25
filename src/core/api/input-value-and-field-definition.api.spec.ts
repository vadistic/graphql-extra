import {
  NameApiMixin, DirectivesApiMixin, DescriptionApiMixin, TypeApiMixin,
} from '../mixins'
import { InputValueApi, FieldDefinitionApi, InputValuesAsArgumentsApiMixin } from './input-value-and-field-definition'

describe(InputValueApi.name, () => {
  const t = InputValueApi.prototype

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(t.toField.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(t.getDefaultValue.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(t.setDefaultValue.name, () => {
      //
    })
  })

  describe('mixins', () => {
    // eslint-disable-next-line jest/expect-expect
    test(NameApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(DescriptionApiMixin.name, () => {
      //
    })
    // eslint-disable-next-line jest/expect-expect
    test(DirectivesApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(TypeApiMixin.name, () => {
      //
    })
  })
})


describe(FieldDefinitionApi.name, () => {
  const t = FieldDefinitionApi.prototype

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(t.toInputValue.name, () => {
      //
    })
  })

  describe('mixins', () => {
    // eslint-disable-next-line jest/expect-expect
    test(NameApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(DescriptionApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(DirectivesApiMixin.name, () => {
      //
    })
    // eslint-disable-next-line jest/expect-expect
    test(InputValuesAsArgumentsApiMixin.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(TypeApiMixin.name, () => {
      //
    })
  })
})
