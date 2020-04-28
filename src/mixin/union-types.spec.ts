import type * as GQL from 'graphql'

import { Mixin, Ast, Api } from '../internal'

describe(Mixin.UnionTypesMixin, () => {
  const p = Mixin.UnionTypesMixin.prototype

  let node: GQL.UnionTypeDefinitionNode
  let mixin: Mixin.UnionTypesMixin

  beforeEach(() => {
    node = Ast.unionTypeDefinitionNode({
      name: 'MyType',
      types: ['MyType'],
    })

    mixin = Mixin.unionTypesMixin(node)
  })

  test(p.getTypenames.name, () => {
    expect(mixin.getTypenames()).toEqual(['MyType'])
  })

  test(p.hasTypename.name, () => {
    expect(mixin.hasTypename('MyType')).toBe(true)
  })

  test(p.getTypes.name, () => {
    const types = mixin.getTypes()
    expect(types.length).toBe(1)
    expect(types[0]).toBeInstanceOf(Api.NamedTypeApi)
  })

  test(p.getType.name, () => {
    expect(mixin.getType('MyType')).toBeInstanceOf(Api.NamedTypeApi)

    expect(() => mixin.getType('NotMyType')).toThrowErrorMatchingInlineSnapshot(
      "\"cannot find 'NotMyType' in types of UnionTypeDefinition 'MyType' because it does not exist\"",
    )
  })

  test(p.createType.name, () => {
    mixin.createType('MyOtherType')
    expect(mixin.hasTypename('MyOtherType')).toBe(true)

    expect(() => mixin.createType('MyOtherType')).toThrowErrorMatchingInlineSnapshot(
      '"cannot create \'MyOtherType\' in types of UnionTypeDefinition \'MyType\' because it already exists"',
    )
  })

  test(p.updateType.name, () => {
    mixin.updateType('MyType', 'MyRenamedType')
    expect(mixin.hasTypename('MyType')).toBe(false)
    expect(mixin.hasTypename('MyRenamedType')).toBe(true)

    expect(() => mixin.updateType('NotMyType', 'anything')).toThrowErrorMatchingInlineSnapshot(
      '"cannot update \'NotMyType\' in types of UnionTypeDefinition \'MyType\' because it does not exist"',
    )
  })

  test(p.upsertType.name, () => {
    expect(mixin.hasTypename('MyOtherType')).toBe(false)
    mixin.upsertType('MyOtherType')
    expect(mixin.hasTypename('MyOtherType')).toBe(true)
    mixin.upsertType('MyOtherType')
    expect(mixin.hasTypename('MyOtherType')).toBe(true)
  })

  test(p.removeType.name, () => {
    expect(mixin.hasTypename('MyType')).toBe(true)
    mixin.removeType('MyType')
    expect(mixin.hasTypename('MyType')).toBe(false)

    expect(() => mixin.removeType('MyType')).toThrowErrorMatchingInlineSnapshot(
      '"cannot remove \'MyType\' in types of UnionTypeDefinition \'MyType\' because it does not exist"',
    )
  })
})
