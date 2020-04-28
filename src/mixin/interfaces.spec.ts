import { Mixin, Ast } from '../internal'

describe(Mixin.InterfacesMixin.name, () => {
  const p = Mixin.InterfacesMixin.prototype

  const node = Ast.objectTypeDefinitionNode({
    name: 'MyType',
    interfaces: ['MyInterface'],
  })

  const mixin = Mixin.interfacesMixin(node)

  test(p.hasInterface.name, () => {
    expect(mixin.hasInterface('MyInterface')).toBe(true)
    expect(mixin.hasInterface('NotMyInterface')).toBe(false)
  })

  test(p.createInterface.name, () => {
    mixin.createInterface('MyOtherInterface')
    expect(mixin.hasInterface('MyOtherInterface')).toBe(true)
  })

  test(p.updateInterface.name, () => {
    mixin.updateInterface('MyOtherInterface', 'MyRenamedInterface')
    expect(mixin.hasInterface('MyOtherInterface')).toBe(false)
    expect(mixin.hasInterface('MyRenamedInterface')).toBe(true)
  })

  test(p.upsertInterface.name, () => {
    mixin.upsertInterface('MyNewInterface')
    expect(mixin.hasInterface('MyNewInterface')).toBe(true)

    // kinda moot
    mixin.upsertInterface({ name: 'MyOtherInterface' })
    expect(mixin.hasInterface('MyNewInterface')).toBe(true)
  })

  test(p.removeInterface.name, () => {
    mixin.removeInterface('MyOtherInterface')
    expect(mixin.hasInterface('MyOtherInterface')).toBe(false)
  })
})
