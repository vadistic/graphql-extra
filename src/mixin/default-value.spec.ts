import { Mixin, Ast } from '../internal'

describe(Mixin.DefaultValueMixin.name, () => {
  const p = Mixin.DefaultValueMixin.prototype
  const node = Ast.inputValueDefinitionNode({
    name: 'myField',
    type: 'Int',
    defaultValue: { kind: 'IntValue', value: '1' },
  })

  const mixin = Mixin.defaultValueMixin(node)

  test('works', () => {
    expect(mixin).toBeInstanceOf(Mixin.DefaultValueMixin)
  })

  test(p.hasDefaultValue.name, () => {
    expect(mixin.hasDefaultValue()).toBe(true)
  })

  test(p.getDefaultValue.name, () => {
    expect(mixin.getDefaultValue()?.toJs()).toBe(1)
  })

  test(p.setDefaultValue.name, () => {
    mixin.setDefaultValue({ kind: 'StringValue', value: 'ABC' })

    expect(mixin.getDefaultValue()?.toJs()).toBe('ABC')
    expect(mixin.node.defaultValue?.kind).toBe('StringValue')
  })
})
