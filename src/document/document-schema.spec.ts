import { GraphQLSchema, parse } from 'graphql'

import { STARWARS_TYPEDEFS } from '../../test/fixture'
import { documentSchemaApi } from './document-schema'

describe('DocumentSchemaApi', () => {
  const doc = documentSchemaApi(STARWARS_TYPEDEFS)

  describe('serialisation', () => {
    test('.clone() ok', () => {
      const copy = doc.clone()

      copy.node.definitions.forEach((def, i) => {
        expect(def).toEqual(doc.node.definitions[i])
        expect(def).not.toBe(doc.node.definitions[i])
      })
    })

    test('.toJson() ok', () => {
      const schema = doc.toJson()

      expect(schema.data).toBeDefined()
      expect(schema.errors).toBeUndefined()
    })

    test('.toSchema() ok', () => {
      expect(doc.toSchema()).toBeInstanceOf(GraphQLSchema)
    })

    test('.toString() .toDocument() ok', () => {
      expect(parse(doc.toString(), { noLocation: true })).toMatchObject(doc.toDocument())
    })
  })
})
