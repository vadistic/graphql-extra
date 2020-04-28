import { Mixin, Ast } from '../internal'

describe(Mixin.variableMixin, () => {
  const p = Mixin.VariableMixin.prototype
  const node = Ast.variableDefinitionNode({ variable: 'myVariable', type: 'Int' })
  const mixin = Mixin.variableMixin(node)

  test('works', () => {
    expect(mixin).toBeInstanceOf(Mixin.VariableMixin)
  })

  test(p.getVariableName.name, () => {
    expect(mixin.getVariableName()).toBe('myVariable')
  })

  test(p.getVariable.name, () => {
    expect(mixin.getVariable().node).toBe(node.variable)
  })

  test(p.hasVariable.name, () => {
    expect(mixin.hasVariable('myVariable')).toBe(true)
    expect(mixin.hasVariable('notMyVariable')).toBe(false)
  })

  test(p.setVariable.name, () => {
    mixin.setVariable('myOtherVariable')
    expect(mixin.hasVariable('myOtherVariable')).toBe(true)
    expect(mixin.hasVariable('myVariable')).toBe(false)
  })
})
