import { Kind } from 'graphql'

import { getFirstNodeOfKind } from '../../../test/test-utils'
import {
  schemaDefinitionApi, schemaExtensionApi, SchemaExtensionApi, SchemaDefinitionApi,
} from './schema-definition'


describe('SchemaDefinitionApi & SchemaExtensionApi', () => {
  const defFix = /* GraphQL */`
    schema {
      query: MyQueryRootType
      mutation: MyMutationRootType
    }
  `
  const extFix = /* GraphQL */`
    extend schema {
      query: MyQueryRootType
      mutation: MyMutationRootType
    }
  `

  const defApi = schemaDefinitionApi(getFirstNodeOfKind(Kind.SCHEMA_DEFINITION)(defFix))
  const extApi = schemaExtensionApi(getFirstNodeOfKind(Kind.SCHEMA_EXTENSION)(extFix))

  const cases: [string, SchemaDefinitionApi | SchemaExtensionApi][] = [
    [SchemaDefinitionApi.name, defApi],
    [SchemaExtensionApi.name, extApi],
  ]

  test('SchemaDefinitionApi > DescriptionApiMixin', () => {
    defApi.setDescription('ABC')

    expect(defApi.node.description?.value).toBe('ABC')
    expect(defApi.hasDescription('ABC')).toBeTruthy()
  })


  test.each(cases)('%s > DirectivesApiMixin', (name, api) => {
    api.upsertDirective('Client')

    expect(api.node.directives?.[0].name.value).toBe('Client')
    expect(api.hasDirective('Client')).toBeTruthy()
  })

  test.each(cases)('%s > OperationTypeDefinitionApiMixin', (name, api) => {
    expect(api.getOperationTypename('query')).toBe('MyQueryRootType')
    api.updateOperationType('mutation', 'MyRenamedMutationRootType')

    expect(api.getMutationTypename()).toBe('MyRenamedMutationRootType')
    expect(api.node.operationTypes?.find((op) => op.operation === 'mutation')?.type.name.value)
      .toBe('MyRenamedMutationRootType')
  })
})
