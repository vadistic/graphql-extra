/* eslint-disable max-len */
import type * as GQL from 'graphql'

import { Mixin, Ast, Api } from '../internal'

describe(Mixin.SelectionSetMixin.name, () => {
  const p = Mixin.SelectionSetMixin.prototype

  let node: GQL.OperationDefinitionNode
  let mixin: Mixin.SelectionSetMixin

  beforeEach(() => {
    node = Ast.operationDefinitionNode({
      operation: 'query',
      name: 'MyQuery',
      selections: [
        'myField',
        Ast.fragmentSpreadNode('MyFragment'),
        Ast.inlineFragmentNode({
          selections: ['myField'],
          typeCondition: 'MyType',
        }),
      ],
    })

    mixin = Mixin.selectionSetMixin(node)
  })

  describe('basic', () => {
    test(p.hasSelectionSet.name, () => {
      expect(mixin.hasSelectionSet()).toBeTruthy()
    })

    test(p.getSelections.name, () => {
      const selections = mixin.getSelections()

      expect(selections.length).toBe(3)
      expect(selections[0].isField()).toBeTruthy()
    })
  })

  describe('fields', () => {
    test(p.hasField.name, () => {
      expect(mixin.hasField('myField')).toBe(true)
      expect(mixin.hasField('notMyField')).toBe(false)
    })

    test(p.getField.name, () => {
      expect(mixin.getField('myField')).toBeInstanceOf(Api.FieldApi)
    })

    test(p.createField.name, () => {
      mixin.createField('anotherField')
      expect(mixin.hasField('anotherField')).toBe(true)

      expect(() => mixin.createField('anotherField')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot create 'anotherField' in selectionSet of OperationDefinition 'MyQuery' because it already exists\"",
      )
    })

    test(p.updateField.name, () => {
      mixin.updateField('myField', 'myRenamedField')
      expect(mixin.hasField('myRenamedField')).toBe(true)
      expect(mixin.hasField('myField')).toBe(false)

      expect(() => mixin.updateField('notMyField', 'anything')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot update 'notMyField' in selectionSet of OperationDefinition 'MyQuery' because it does not exist\"",
      )
    })
  })

  describe('fragment spread', () => {
    test(p.hasFragmentSpread.name, () => {
      expect(mixin.hasFragmentSpread('MyFragment')).toBe(true)
      expect(mixin.hasFragmentSpread('NotMyFragment')).toBe(false)
    })

    test(p.getFragmentSpreads.name, () => {
      const spreads = mixin.getFragmentSpreads()
      expect(spreads.every((a) => a.isFragmentSpread())).toBe(true)
      expect(spreads.length).toBe(1)
    })

    test(p.getFragmentSpead.name, () => {
      expect(mixin.getFragmentSpead('MyFragment').getName()).toBe('MyFragment')
      expect(() => mixin.getFragmentSpead('NotMyFragment').getName()).toThrowErrorMatchingInlineSnapshot(
        "\"cannot find 'NotMyFragment' in selectionSet of OperationDefinition 'MyQuery' because it does not exist\"",
      )
    })

    test(p.createFragmentSpread.name, () => {
      mixin.createFragmentSpread('MyNewFragment')
      expect(mixin.hasFragmentSpread('MyNewFragment')).toBe(true)
    })

    test(p.updateFragmentSpread.name, () => {
      mixin.updateFragmentSpread('MyFragment', 'MyRenamedFragment')

      expect(mixin.hasFragmentSpread('MyRenamedFragment')).toBe(true)
      expect(mixin.hasFragmentSpread('MyFragment')).toBe(false)
      expect(() => mixin.updateFragmentSpread('MyFragment', 'anything')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot update 'MyFragment' in selectionSet of OperationDefinition 'MyQuery' because it does not exist\"",
      )
    })

    test(p.removeFragmentSpread.name, () => {
      mixin.removeFragmentSpread('MyFragment')
      expect(mixin.hasFragmentSpread('MyFragment')).toBe(false)

      expect(() => mixin.removeFragmentSpread('MyFragment')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot remove 'MyFragment' in selectionSet of OperationDefinition 'MyQuery' because it does not exist\"",
      )
    })
  })

  describe('inline fragment', () => {
    test(p.hasInlineFragment.name, () => {
      expect(mixin.hasInlineFragment()).toBe(true)
      expect(mixin.hasInlineFragment('MyType')).toBe(true)
      expect(mixin.hasInlineFragment('NotMyType')).toBe(false)
    })

    test(p.getInlineFragment.name, () => {
      expect(mixin.getInlineFragment('MyType').isInflineFragment()).toBe(true)
      expect(() => mixin.getInlineFragment('NotMyType').isInflineFragment()).toThrowErrorMatchingInlineSnapshot(
        "\"cannot find 'InlineFragment' in selectionSet of OperationDefinition 'MyQuery' because it does not exist\"",
      )
    })

    test(p.getInlineFragments.name, () => {
      const inlines = mixin.getInlineFragments()
      expect(inlines.length).toBe(1)
      expect(inlines.every((a) => a.isInflineFragment())).toBe(true)
    })

    test(p.createInlineFragment.name, () => {
      mixin.createInlineFragment({ typeCondition: 'MyOtherType', selections: ['myField'] })
      expect(mixin.hasInlineFragment('MyOtherType')).toBe(true)

      expect(() =>
        mixin.createInlineFragment({ typeCondition: 'MyOtherType', selections: [] })).toThrowErrorMatchingInlineSnapshot(
        "\"cannot create 'InlineFragment' in selectionSet of OperationDefinition 'MyQuery' because it already exists\"",
      )
    })

    test(p.updateInlineFragment.name, () => {
      mixin.updateInlineFragment('MyType', { typeCondition: 'MyOtherType' })
      expect(mixin.hasInlineFragment('MyType')).toBe(false)
      expect(mixin.hasInlineFragment('MyOtherType')).toBe(true)

      expect(() => mixin.updateInlineFragment('MyType', {})).toThrowErrorMatchingInlineSnapshot(
        '"cannot update \'InlineFragment\' in selectionSet of OperationDefinition \'MyQuery\' because it does not exist"',
      )
    })

    test(p.removeInlineFragment.name, () => {
      expect(mixin.hasInlineFragment('MyType')).toBe(true)
      mixin.removeInlineFragment('MyType')
      expect(mixin.hasInlineFragment('MyType')).toBe(false)

      expect(() => mixin.removeInlineFragment('MyType')).toThrowErrorMatchingInlineSnapshot(
        '"cannot remove \'InlineFragment\' in selectionSet of OperationDefinition \'MyQuery\' because it does not exist"',
      )
    })
  })
})
