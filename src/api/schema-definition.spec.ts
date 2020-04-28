import { Api, Mixin, Ast } from '../internal'

describe(Api.SchemaDefinitionApi.name, () => {
  const node = Ast.schemaDefinitionNode({
    operationTypes: [
      { operation: 'query', type: 'MyQueryRootType' },
      { operation: 'mutation', type: 'MyMutationRootType' },
    ],
  })

  const api = Api.schemaDefinitionApi(node)

  describe('mixins', () => {
    test(Mixin.DescriptionMixin.name, () => {
      api.setDescription('ABC')

      expect(api.node.description?.value).toBe('ABC')
      expect(api.hasDescription('ABC')).toBeTruthy()
    })

    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('SchemaDefinition')).toBe(true)
    })

    test(Mixin.DirectivesMixin.name, () => {
      api.upsertDirective('Client')
      expect(api.node.directives?.[0].name.value).toBe('Client')
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.OperationTypeDefinitionMixin.name, () => {
      expect(api.getOperationTypename('query')).toBe('MyQueryRootType')
      api.updateOperationType('mutation', { type: 'MyRenamedMutationRootType' })
      expect(api.getMutationTypename()).toBe('MyRenamedMutationRootType')
    })
  })
})

// ────────────────────────────────────────────────────────────────────────────────

describe(Api.SchemaExtensionApi.name, () => {
  const mode = Ast.schemaExtensionNode({
    operationTypes: [
      { operation: 'query', type: 'MyQueryRootType' },
      { operation: 'mutation', type: 'MyMutationRootType' },
    ],
  })

  const api = Api.schemaExtensionApi(mode)

  describe('mixins', () => {
    test(Mixin.KindAssertionMixin.name, () => {
      expect(api.isKind('SchemaExtension')).toBe(true)
    })

    test(Mixin.DirectivesMixin.name, () => {
      api.upsertDirective('Client')
      expect(api.node.directives?.[0].name.value).toBe('Client')
      expect(api.hasDirective('Client')).toBeTruthy()
    })

    test(Mixin.OperationTypeDefinitionMixin.name, () => {
      expect(api.getOperationTypename('query')).toBe('MyQueryRootType')
      api.updateOperationType('mutation', { type: 'MyRenamedMutationRootType' })
      expect(api.getMutationTypename()).toBe('MyRenamedMutationRootType')
    })
  })
})
