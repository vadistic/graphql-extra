import { t } from '../../node'
import { objectTypeApi } from '../../api'
import { getFirstObjectType } from '../test-utils'

describe(`api > type-definition`, () => {
  test(`objectTypeApi > mutate node & correct this reference`, () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const fields = objectTypeApi(node)
      .setDescription('My description')
      .getfieldnames()

    expect(fields).toEqual(['myField'])
    expect(node.description && node.description.value).toEqual('My description')
  })

  test(`objectTypeApi > fieldDefinitionsApi`, () => {
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

    expect(obj.getfieldnames()).toEqual(['renamedField'])
  })

  test(`typeApi > set/update correct this and node reference`, () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const obj = objectTypeApi(node)

    const field = obj.getField('myField').setTypename('Int')

    const typePrim = obj.getField('myField').getType()

    expect(typePrim.getTypename()).toBe('Int')
    expect(typePrim.isNonNull()).toBeTruthy()

    field.setNonNullType(false)

    expect(typePrim.isNonNull()).toBeFalsy()
  })
})
