import { astApi, objectTypeApi } from '../api'
import { t } from '../alias'

describe(`api`, () => {
  test(`astApi > parse SDL & correct this context`, () => {
    const typeDefs = /* GraphQL */ `
      type Person {
        id: ID!
        name: String!
      }
    `

    const ast = astApi(typeDefs)

    const _this = ast.addSDL()

    expect(Object.keys(_this)).toContain('hasType')
  })

  test(`objectTypeApi > mutate node & correct this context`, () => {
    const node = t.objectType({
      name: 'MyObject',
      fields: [{ name: 'myField', type: { name: 'ID', nonNull: true } }],
    })

    const fields = objectTypeApi(node)
      .upsertDescription('My description')
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
})
