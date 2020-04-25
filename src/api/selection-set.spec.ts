import { Ast, Api, Mixin } from '../internal'

describe(Api.SelectionSetApi.name, () => {
  const p = Api.SelectionSetApi.prototype

  const node = Ast.selectionSetNode([
    'myField',
    Ast.fragmentSpreadNode('MyFragment'),
    Ast.inlineFragmentNode({
      selections: ['nestedfield'],
      typeCondition: 'MyType',
    }),
  ])

  const api = Api.selectionSetApi(node)

  describe('general', () => {
    test(p.isEmpty.name, () => {
      expect(api.isEmpty()).toBeFalsy()
    })
  })

  describe('fields crud', () => {
    test(p.hasField.name, () => {
      expect(api.hasField('myField')).toBe(true)
      expect(api.hasField('notExistingField')).toBe(false)
    })

    test(p.getField.name, () => {
      expect(api.getField('myField')).toBeInstanceOf(Api.FieldApi)
    })

    test(p.createField.name, () => {
      api.createField('anotherField')
      expect(api.hasField('anotherField')).toBe(true)

      expect(() => api.createField('anotherField')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot create 'anotherField' in selections of SelectionSet 'SelectionSet' because it already exists\"",
      )
    })

    test(p.updateField.name, () => {
      api.updateField('anotherField', 'newFieldName')
      expect(api.hasField('newFieldName')).toBe(true)
      expect(api.hasField('anotherField')).toBe(false)

      expect(() => api.updateField('random', 'random')).toThrowErrorMatchingInlineSnapshot(
        "\"cannot update 'random' in selections of SelectionSet 'SelectionSet' because it does not exist\"",
      )
    })
  })

  describe('inline fragment crud', () => {
    test(p.getFirstInlineFragment.name, () => {
      const inline = api.getFirstInlineFragment()
      expect(inline).toBeInstanceOf(Api.InlineFragmentApi)

      expect(() => api.getFirstInlineFragment('NotExistingType')).toThrowErrorMatchingInlineSnapshot(
        '"cannot get \'NotExistingType\' in selections of SelectionSet \'SelectionSet\' because it does not exist"',
      )
    })

    test(p.removeInlineFragment.name, () => {
      api.removeInlineFragment()

      expect(api.hasInlineFragment('MyType')).toBe(false)
    })
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('SelectionSet')).toBe(true)
    })
  })
})
