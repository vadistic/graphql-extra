/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ObjectTypeDefinitionNode } from 'graphql'

import {
  DocumentApi, FieldDefinitionApi, t, inputTypeApi, InputValueDefinitionApi, objectTypeApi, documentApi,
} from '../src'
import { STARWARS_TYPEDEFS } from './fixture'

describe('complex unions issue', () => {
  type ActionType = 'Mutation' | 'Query'

  /**
   * Returns whether the Action is a Query or Mutation
   * Throws error if neither found
   */
  const getActionType = (doc: DocumentApi): ActionType => {
    if (doc.hasType('Query')) return 'Query'
    if (doc.hasType('Mutation')) return 'Mutation'
    throw new Error('Neither Mutation or Query found in Document SDL')
  }

  /**
   * Takes an argument from Action field in Schema
   * and converts it to an object type + adds to document
   * To codegen the Action's input parameter types later
   */
  const makeActionArgType = (
    field: FieldDefinitionApi,
  ): ObjectTypeDefinitionNode =>
    t.objectType({
      name: field.getName()[0].toUpperCase() + field.getName().substring(1) + 'Args',
      fields: field.getArguments().map((arg) => arg.toField().node),
    })

  /**
   * Maps through the Mutation fields to grab Action and creates types
   * in the schema document for each of them for codegen
   */
  const addActionArgumentTypesToSchema = (document: DocumentApi) =>
    document
      .getObjectType(getActionType(document))
      .getFields()
      .forEach((field) => {
        const actionArgType = makeActionArgType(field)
        document.createObjectType(actionArgType)
      })

  interface TypeMap{
    types: Record<string, (FieldDefinitionApi | InputValueDefinitionApi)[]>
    enums: Record<string, FieldDefinitionApi[]>
  }

  function buildtypeMap(document: DocumentApi): TypeMap {
    const res: TypeMap = {
      types: {},
      enums: {},
    }

    for (const [typeName, astNode] of document.typeMap) {
      switch (astNode.kind) {
        case 'InputObjectTypeDefinition':
          res.types[typeName] = inputTypeApi(astNode).getFields()
          break
        case 'ObjectTypeDefinition':
          res.types[typeName] = objectTypeApi(astNode).getFields()
          break

        default:
          // noop
      }
    }

    return res
  }

  // ────────────────────────────────────────────────────────────────────────────────


  test('works', () => {
    const doc = documentApi()
    doc.addSDL(STARWARS_TYPEDEFS)

    addActionArgumentTypesToSchema(doc)

    const map = buildtypeMap(doc)

    expect(map.types.HeroArgs).toBeDefined()
  })
})
