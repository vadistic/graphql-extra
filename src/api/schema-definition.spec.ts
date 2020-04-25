import { Api, Mixin, Ast } from '../internal'

describe(Api.SchemaDefinitionApi.name + ' & ' + Api.SchemaExtensionApi.name, () => {
  const defNode = Ast.schemaDefinitionNode({
    operationTypes: [
      { operation: 'query', type: 'MyQueryRootType' },
      { operation: 'mutation', type: 'MyMutationRootType' },
    ],
  })

  const extNode = Ast.schemaExtensionNode({
    operationTypes: [
      { operation: 'query', type: 'MyQueryRootType' },
      { operation: 'mutation', type: 'MyMutationRootType' },
    ],
  })

  const apiDef = Api.schemaDefinitionApi(defNode)
  const apiExt = Api.schemaExtensionApi(extNode)

  const cases = [
    apiDef,
    apiExt,
  ]

  test(Mixin.DescriptionApiMixin.name, () => {
    apiDef.setDescription('ABC')

    expect(apiDef.node.description?.value).toBe('ABC')
    expect(apiDef.hasDescription('ABC')).toBeTruthy()
  })


  test.each(cases)(Mixin.DirectivesApiMixin.name, (api) => {
    api.upsertDirective('Client')

    expect(api.node.directives?.[0].name.value).toBe('Client')
    expect(api.hasDirective('Client')).toBeTruthy()
  })

  test.each(cases)(Mixin.OperationTypeDefinitionApiMixin.name, (api) => {
    expect(api.getOperationTypename('query')).toBe('MyQueryRootType')
    api.updateOperationType('mutation', 'MyRenamedMutationRootType')

    expect(api.getMutationTypename()).toBe('MyRenamedMutationRootType')
    expect(api.node.operationTypes?.find((op) => op.operation === 'mutation')?.type.name.value)
      .toBe('MyRenamedMutationRootType')
  })
})
