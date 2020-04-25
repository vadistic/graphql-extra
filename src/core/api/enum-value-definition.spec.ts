import { enumValueDefinitionNode } from '../../node'
import { DescriptionApiMixin } from '../mixins/description'
import { DirectivesApiMixin } from '../mixins/directive'
import { NameApiMixin } from '../mixins/name'
import { enumValueDefinitionApi, EnumValueDefinitionApi } from './enum-value-definition'

describe(EnumValueDefinitionApi.name, () => {
  const node = enumValueDefinitionNode({
    name: 'TEST',
    description: 'this is a test case',
    directives: ['Client'],
  })

  const api = enumValueDefinitionApi(node)

  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('TEST')
    })

    test(DescriptionApiMixin.name, () => {
      expect(api.getDescription()).toBe('this is a test case')
    })

    test(DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })
  })
})
