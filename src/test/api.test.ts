import { objectTypeApi } from '../api/definition'
import { t } from '../alias'
import { documentApi } from '../api/document'

describe(`api`, () => {
  test(`astApi > parse SDL & correct this reference`, () => {
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

    const ast = documentApi(typeDefs)

    const _this = ast.addSDL(moreTypeDefs)

    expect(Object.keys(_this)).toContain('hasType')
  })

  test(`objectTypeApi > mutate node & correct this reference`, () => {
    const node = t.objectType({
      name: 'MyObject',
      fields: [{ name: 'myField', type: { name: 'ID', nonNull: true } }],
    })

    const fields = objectTypeApi(node)
      .setDescription('My description')
      .getFieldNames()

    expect(fields).toEqual(['myField'])
    expect(node.description && node.description.value).toEqual('My description')
  })

  test(`objectTypeApi > fieldDefinitionsApi`, () => {
    const node = t.objectType({
      name: 'MyObject',
      fields: [{ name: 'myField', type: { name: 'ID', nonNull: true } }],
    })

    const obj = objectTypeApi(node)
      .removeField('myField')
      .createField({ name: 'otherField', type: t.type.int() })
      .updateField('otherField', { name: 'renamedField' })

    expect(obj.getFieldNames()).toEqual(['renamedField'])
  })

  test(`objectTypeApi > type guards and assertions`, () => {
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

    const ast = documentApi(typeDefs)

    const obj = ast.getType('Post')

    expect(obj.isObjectType()).toBeTruthy()
    expect(obj.isEnumType()).toBeFalsy()

    expect(() => obj.assertEnumType().setDescription('abc')).toThrowError(`asserted`)
    expect(() => ast.getEnumType('Post').setDescription('asd')).toThrowError(`asserted`)
  })

  test(`typeApi > set/update preserve this node reference`, () => {
    const node = t.objectType({
      name: 'MyObject',
      fields: [{ name: 'myField', type: { name: 'ID', nonNull: true } }],
    })

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
