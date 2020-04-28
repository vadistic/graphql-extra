import { Mixin, Ast, Api } from '../internal'

describe(Mixin.EnumValueDefinitionMixin, () => {
  const p = Mixin.EnumValueDefinitionMixin.prototype
  const node = Ast.enumTypeDefinitionNode({ name: 'MyEnum', values: ['VALUE'] })
  const mixin = Mixin.enumValueDefinitionMixin(node)

  test(p.hasValue.name, () => {
    expect(mixin.hasValue('VALUE')).toBe(true)
    expect(mixin.hasValue('NOT_VALUE')).toBe(false)
  })

  test(p.getValue.name, () => {
    expect(mixin.getValue('VALUE')).toBeInstanceOf(Api.EnumValueDefinitionApi)

    expect(() => mixin.getValue('NOT_VALUE')).toThrowErrorMatchingInlineSnapshot(
      '"cannot find \'NOT_VALUE\' in values of EnumTypeDefinition \'MyEnum\' because it does not exist"',
    )
  })

  test(p.createValue.name, () => {
    mixin.createValue('OTHER_VALUE')
    expect(mixin.hasValue('OTHER_VALUE')).toBe(true)
  })
})
