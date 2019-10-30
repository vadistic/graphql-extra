import { t } from '../node'
import { documentApi, objectTypeApi } from '../api'
import { getFirstObjectType } from './test-utils'

describe(`api`, () => {
  test(`documentApi > parse SDL & correct this reference`, () => {
    const typeDefs = /* GraphQL */ `
      type Person {
        id: ID!
        name: String!
      }
    `

    const moreTypeDefs = /* GraphQL */ `
      type Post {
        id: ID!
        body: String!
        authot: Person!
      }
    `

    const doc = documentApi()

    const _this = doc.addSDL(typeDefs).addSDL(moreTypeDefs)

    expect(Object.keys(_this)).toContain('hasType')
  })

  test(`documentApi > type guards and assertions`, () => {
    const typeDefs = /* GraphQL */ `
      type Person {
        id: ID!
        name: String!
      }

      type Post {
        id: ID!
        body: String!
        authot: Person!
      }
    `

    const ast = documentApi().addSDL(typeDefs)

    const obj = ast.getType('Post')

    expect(obj.isObjectType()).toBeTruthy()
    expect(obj.isEnumType()).toBeFalsy()

    expect(() => obj.assertEnumType().setDescription('abc')).toThrowError(`ObjectTypeDefinition`)
    expect(() => ast.getEnumType('Post').setDescription('asd')).toThrowError(`ObjectTypeDefinition`)
  })

  test(`objectTypeApi > mutate node & correct this reference`, () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const fields = objectTypeApi(node)
      .setDescription('My description')
      .getFieldNames()

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

    expect(obj.getFieldNames()).toEqual(['renamedField'])
  })

  test(`typeApi > set/update correct this and node reference`, () => {
    const fix = /* GraphQL */ `
      type MyObject {
        myField: ID!
      }
    `

    const node = getFirstObjectType(fix)

    const obj = objectTypeApi(node)

    const type = obj
      .getField('myField')
      .getType()
      .setType('Int!')

    const typePrim = obj.getField('myField').getType()

    expect(typePrim.getTypename()).toBe('Int')
    expect(typePrim.isNonNull()).toBeTruthy()

    type.setNonNull(false)

    expect(typePrim.isNonNull()).toBeFalsy()
  })
})
