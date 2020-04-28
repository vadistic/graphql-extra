import { Kind } from 'graphql'

import { Mixin, Ast } from '../internal'

describe(Mixin.KindAssertionMixin, () => {
  const p = Mixin.KindAssertionMixin.prototype

  const node = Ast.argumentNode({
    name: 'arg',
    value: Ast.intValueNode(123),
  })

  const mixin = Mixin.kindAssertionMixin(node)

  test(p.isKind.name, () => {
    expect(mixin.isKind(Kind.ARGUMENT)).toBe(true)
    expect(mixin.isKind(Kind.FIELD)).toBe(false)
  })

  test(p.assertKind.name, () => {
    expect(() => mixin.assertKind(Kind.ARGUMENT)).not.toThrowError()
    expect(() => mixin.assertKind(Kind.FIELD)).toThrowErrorMatchingInlineSnapshot(
      '"Argument node \\"arg\\" cannot be asserted as Field"',
    )
  })
})
