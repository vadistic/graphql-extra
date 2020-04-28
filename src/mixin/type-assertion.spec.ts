import { Mixin, Ast } from '../internal'

describe(Mixin.TypeDefinitionAssertionMixin, () => {
  const p = Mixin.TypeDefinitionAssertionMixin.prototype

  const node = Ast.objectTypeDefinitionNode({
    name: 'MyType',
    fields: [{ name: 'myField', type: 'String!' }],
  })

  const mixin = Mixin.typeDefinitionAssertionMixin(node)

  test(p.isObjectType.name, () => {
    expect(mixin.isObjectType()).toBe(true)
    expect(mixin.isEnumType()).toBe(false)
  })

  test(p.assertObjectType.name, () => {
    expect(() => mixin.assertObjectType()).not.toThrowError()
    expect(() => mixin.assertEnumType()).toThrowErrorMatchingInlineSnapshot(
      '"ObjectTypeDefinition node \\"MyType\\" cannot be asserted as EnumTypeDefinition"',
    )
  })
})
