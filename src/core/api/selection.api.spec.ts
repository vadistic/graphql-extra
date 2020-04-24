import {
  fieldNode, fragmentSpreadNode, inlineFragmentNode, variableNode,
} from '../../node'
import { fieldApi, fragmentSpreadApi, inlineFragmentApi } from './selection'


describe('FieldApi', () => {
  const node = fieldNode({
    name: 'myField',
    directives: ['Client'],
    arguments: [{ name: 'age', value: variableNode('age') }],
    selections: ['myNestedfield'],
  })

  const api = fieldApi(node)

  test('has NameApiMixin', () => {
    expect(api.getName()).toBe('myField')
  })

  test('has ArgumentsApiMixin', () => {
    expect(api.getArgumentNames()).toMatchObject(['age'])
  })

  test('has DirectivesApiMixin', () => {
    expect(api.getDirectiveNames()).toMatchObject(['Client'])
  })

  test('has SelectionSetApiMixin', () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })

  test('has SelectionAssertionApiMixin', () => {
    expect(api.isField()).toBeTruthy()
  })
})

describe('FragmentSpreadApi', () => {
  const node = fragmentSpreadNode({
    name: 'MyFragment',
    directives: ['Client'],
  })

  const api = fragmentSpreadApi(node)


  test('has NameApiMixin', () => {
    expect(api.getName()).toBe('MyFragment')
  })


  test('has DirectivesApiMixin', () => {
    expect(api.hasDirective('Client')).toBeTruthy()
  })

  test('has SelectionAssertionApiMixin', () => {
    expect(api.isFragmentSpread()).toBeTruthy()
  })
})


describe('InlineFragmentApi', () => {
  const node = inlineFragmentNode({
    typeCondition: 'MyType',
    directives: ['Client'],
    selections: ['myField'],
  })

  const api = inlineFragmentApi(node)

  test('has DirectivesApiMixin', () => {
    expect(api.hasDirective('Client')).toBeTruthy()
  })

  test('has SelectionSetApiMixin', () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })

  test('has SelectionAssertionApiMixin', () => {
    expect(api.hasSelectionSet()).toBeTruthy()
  })
})
