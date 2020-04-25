import { NameApiMixin, DescriptionApiMixin } from '../mixins'
import { DirectiveDefinitionApi } from './directive-definition'
import { InputValuesAsArgumentsApiMixin } from './input-value-and-field-definition'

describe(DirectiveDefinitionApi.name, () => {
  const t = DirectiveDefinitionApi.prototype
  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(t.isRepeatable.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(t.getLocations.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(t.setLocations.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(t.hasLocation.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(t.hasLocation.name, () => {

    })
  })

  describe('mixins', () => {
    // eslint-disable-next-line jest/expect-expect
    test(NameApiMixin.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(DescriptionApiMixin.name, () => {

    })

    // eslint-disable-next-line jest/expect-expect
    test(InputValuesAsArgumentsApiMixin.name, () => {

    })
  })
})
