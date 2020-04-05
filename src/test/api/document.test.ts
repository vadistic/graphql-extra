import { documentApi } from '../../api'

describe(`api > documentApi`, () => {
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
  const doc = documentApi().addSDL(typeDefs).addSDL(moreTypeDefs)

  test(`parse SDL & correct this reference`, () => {
    expect(Object.keys(doc)).toContain('hasType')
  })

  test(`type guards and assertions`, () => {
    const obj = doc.getType('Post')

    expect(obj.isObjectType()).toBeTruthy()
    expect(obj.isEnumType()).toBeFalsy()

    expect(() => obj.assertEnumType().setDescription('abc')).toThrowError(`ObjectTypeDefinition`)
    expect(() => doc.getEnumType('Post').setDescription('asd')).toThrowError(`ObjectTypeDefinition`)
  })
})
