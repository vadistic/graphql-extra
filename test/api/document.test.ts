import { documentSchemaApi } from '../../src'

describe('api > documentSchemaApi', () => {
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
      author: Person!
    }
  `
  const doc = documentSchemaApi(typeDefs).addSDL(moreTypeDefs)

  test('base', () => {
    expect(doc.getObjectType('Person').getName()).toBe('Person')
    expect(doc.getObjectType('Post').getFieldnames()).toEqual(['id', 'body', 'author'])
  })

  test('TypeDefinitionAssertionApiMixin', () => {
    const obj = doc.getType('Post')

    expect(obj.isObjectType()).toBeTruthy()
    expect(obj.isEnumType()).toBeFalsy()

    expect(() => obj.assertEnumType().setDescription('abc')).toThrowError('ObjectTypeDefinition')
  })

  test('.toJson()', () => {
    const copy = doc.clone()

    expect(() => copy.toJson()).toThrowError('root')

    const someRoot = /* GraphQL */`
      type Query {
        test: String
      }
    `

    copy.addSDL(someRoot)

    const schema = copy.toJson()

    expect(schema.data).toBeDefined()
    expect(schema.errors).toBeUndefined()
  })
})
