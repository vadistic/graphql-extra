import { objectTypeApi, t } from '../../../src'
import { getFirstObjectType } from '../../test-utils'

describe('ObjectTypeApi', () => {
  test('DescriptionApiMixin', () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    objectTypeApi(node).setDescription('My description')

    expect(node?.description?.value).toEqual('My description')
  })

  test('FieldDefinitionsApiMixin', () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const obj = objectTypeApi(node)
      .removeField('myField')
      .createField({ name: 'otherField', type: t.type.int() })
      .updateField('otherField', { name: 'renamedField' })

    expect(obj.getFieldnames()).toEqual(['renamedField'])
  })

  test('FieldDefinitionsApiMixin > FieldDefinitionApi > TypeApiMixin', () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const obj = objectTypeApi(node)

    const field = obj.getField('myField').setTypename('Int')

    const fieldType = obj.getField('myField').getType()

    expect(fieldType.getTypename()).toBe('Int')
    expect(fieldType.isNonNull()).toBeTruthy()

    field.setNonNullType(false)

    expect(fieldType.isNonNull()).toBeFalsy()
  })
})
