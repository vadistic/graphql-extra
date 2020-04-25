import { fragmentDefinitionNode } from '../../node'
import { NameOptionalApiMixin, NameApiMixin } from '../mixins/name'
import { FragmentDefinitionApi, fragmentDefinitionApi } from './fragment-definition'
import { SelectionSetApiMixin } from './selection'

describe(FragmentDefinitionApi.name, () => {
  const node = fragmentDefinitionNode({
    name: 'MyFragment',
    selections: ['myField'],
    typeCondition: 'MyType',
    directives: ['Client'],
    variableDefinitions: [{ variable: 'age', type: 'Int!' }],
  })

  const api = fragmentDefinitionApi(node)


  describe('methods', () => {
    //
  })

  describe('mixins', () => {
    test(NameOptionalApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })

    test(SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })
  })
})
