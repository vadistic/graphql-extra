import { GraphQLSchema, parse } from 'graphql'

import { STARWARS_TYPEDEFS } from '../../test/fixture'
import * as t from '../alias'
import { documentSchemaApi } from './document-schema'

describe('DocumentSchemaApi', () => {
  const doc = documentSchemaApi(STARWARS_TYPEDEFS)

  describe('serialisation', () => {
    test('.clone() ok', () => {
      const copy = doc.clone()

      const originalType = doc.getQueryType()
      const copiedType = copy.getQueryType()

      // correct nested references
      expect(originalType?.node).toEqual(copiedType?.node)
      expect(originalType?.node).not.toBe(copiedType?.node)
      expect(originalType?.node).toBe(doc.getQueryType()?.node)

      // independent maps
      copy.removeInterfaceType('Character')

      expect(copy.hasType('Character')).toBeFalsy()
      expect(doc.hasType('Character')).toBeTruthy()
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


  describe('roots api', () => {
    test('.getQueryType() ok', () => {
      expect(doc.getQueryType()?.hasField('hero')).toBe(true)
    })

    test('.getMutationType() ok', () => {
      expect(doc.getMutationType()?.hasField('createReview')).toBe(true)
    })

    test('.getSubscriptionType() ok', () => {
      expect(doc.getSubscriptionType()).toBeUndefined()
    })

    test('.getSchemaType() ok', () => {
      expect(doc.getSchemaType()?.operationTypes.length).toBe(2)
    })
  })

  describe('type get all api', () => {
    test('.getAllTypes() ok', () => {
      const all = doc.getAllTypes()
      expect(all.some((api) => api.getName() === 'Review')).toBeTruthy()
    })

    test('.getAllEnumTypes() ok', () => {
      const enums = doc.getAllEnumTypes()

      expect(enums.some((api) => api.getName() === 'LengthUnit')).toBeTruthy()
      expect(enums.some((api) => api.getName() === 'Review')).toBeFalsy()
    })
  })

  describe('directive api', () => {
    test('.getAllDirectives() ok', () => {
      expect(doc.getAllDirectives().length).toBe(0)
    })
  })

  describe('basic type api', () => {
    test('.hasType() ok', () => {
      expect(doc.hasType('PageInfo')).toBeTruthy()
    })

    test('.getType() ok', () => {
      expect(doc.getType('PageInfo').isObjectType()).toBeTruthy()
    })

    test('.getType() fail', () => {
      const fn = (): any => doc.getType('XYZ')

      expect(fn).toThrowErrorMatchingInlineSnapshot(
        '"cannot get \'XYZ\' because is does not exist in type"',
      )
    })
  })

  describe('type of kind api', () => {
    const copy = doc.clone()

    test('.getTypeOfKind() fail', () => {
      const fn = (): any => copy.getTypeOfKind('Character', 'ObjectTypeDefinition')

      expect(fn).toThrowErrorMatchingInlineSnapshot(
        '"cannot get \'Character\' because it\'s InterfaceTypeDefinition instead of ObjectTypeDefinition"',
      )
    })

    test('.getTypeOfKind() ok', () => {
      const api = copy.getTypeOfKind('ColorInput', 'InputObjectTypeDefinition')
      expect(api.hasField('red')).toBeTruthy()
    })

    test('.getOrCreateTypeOfKind() ok', () => {
      // create
      copy.getOrCreateTypeOfKind(
        { name: 'MyUnion', types: ['Starship', 'Human'] },
        'UnionTypeDefinition',
      )

      const prev = copy.getUnionType('MyUnion')

      expect(prev).toBeDefined()

      // get
      const api = copy.getOrCreateTypeOfKind(
        { name: 'MyUnion', types: ['Starship', 'Human'] },
        'UnionTypeDefinition',
      )

      const fix = t.unionType({ name: 'MyUnion', types: ['Starship', 'Human'] })

      expect(api.node).toMatchObject(fix)
      expect(api.node).toBe(prev.node)
    })
  })
})
