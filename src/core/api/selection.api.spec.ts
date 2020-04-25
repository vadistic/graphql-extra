import {
  fieldNode, fragmentSpreadNode, inlineFragmentNode, variableNode,
} from '../../node'
import {
  ArgumentsApiMixin, NameApiMixin, DirectivesApiMixin, SelectionAssertionApiMixin,
} from '../mixins'
import {
  fieldApi, fragmentSpreadApi, inlineFragmentApi, FieldApi, SelectionSetApiMixin, FragmentSpreadApi, InlineFragmentApi,
} from './selection'


describe(FieldApi.name, () => {
  const node = fieldNode({
    name: 'myField',
    directives: ['Client'],
    arguments: [{ name: 'age', value: variableNode('age') }],
    selections: ['myNestedfield'],
  })

  const api = fieldApi(node)

  describe('mixins', () => {
    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('myField')
    })

    test(ArgumentsApiMixin.name, () => {
      expect(api.getArgumentNames()).toMatchObject(['age'])
    })

    test(DirectivesApiMixin.name, () => {
      expect(api.getDirectiveNames()).toMatchObject(['Client'])
    })

    test(SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(SelectionAssertionApiMixin.name, () => {
      expect(api.isField()).toBeTruthy()
    })
  })
})

describe(FragmentSpreadApi.name, () => {
  const node = fragmentSpreadNode({
    name: 'MyFragment',
    directives: ['Client'],
  })

  const api = fragmentSpreadApi(node)

  describe('mixins', () => {
    test(NameApiMixin.name, () => {
      expect(api.getName()).toBe('MyFragment')
    })


    test(DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(SelectionAssertionApiMixin.name, () => {
      expect(api.isFragmentSpread()).toBeTruthy()
    })
  })
})


describe(InlineFragmentApi.name, () => {
  const node = inlineFragmentNode({
    typeCondition: 'MyType',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = inlineFragmentApi(node)

  describe('mixins', () => {
    test(DirectivesApiMixin.name, () => {
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(SelectionSetApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })

    test(SelectionAssertionApiMixin.name, () => {
      expect(api.hasSelectionSet()).toBeTruthy()
    })
  })
})
