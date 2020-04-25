import { Mixin, Ast } from '../internal'

describe(Mixin.TypeDefinitionAssertionApiMixin, () => {
  const p = Mixin.TypeDefinitionAssertionApiMixin.prototype

  const node = Ast.objectTypeDefinitionNode({
    name: 'MyType',
    fields: [{ name: 'myField', type: 'String!' }],
  })

  const api = Mixin.typeDefinitionAssertionApiMixin(node)

  test(p.isObjectType.name, () => {
    expect(api.isObjectType()).toBe(true)
    expect(api.isEnumType()).toBe(false)
  })

  test(p.assertObjectType.name, () => {
    expect(() => api.assertObjectType()).not.toThrowError()
    expect(() => api.assertEnumType()).toThrowErrorMatchingInlineSnapshot(
      '"ObjectTypeDefinition node \\"MyType\\" cannot be asserted as EnumTypeDefinition"',
    )
  })
})
