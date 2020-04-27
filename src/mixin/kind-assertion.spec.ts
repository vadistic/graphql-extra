import { Kind } from 'graphql'

import { Ast, Mixin } from '../internal'

describe(Mixin.KindAssertionApiMixin, () => {
  const p = Mixin.KindAssertionApiMixin.prototype

  const node = Ast.argumentNode({
    name: 'arg',
    value: Ast.intValueNode(123),
  })

  const api = Mixin.kindAssertionApiMixin(node)

  test(p.isKind.name, () => {
    expect(api.isKind(Kind.ARGUMENT)).toBe(true)
    expect(api.isKind(Kind.FIELD)).toBe(false)
  })

  test(p.assertKind.name, () => {
    expect(() => api.assertKind(Kind.ARGUMENT)).not.toThrowError()
    expect(() => api.assertKind(Kind.FIELD)).toThrowErrorMatchingInlineSnapshot(
      '"Argument node \\"arg\\" cannot be asserted as Field"',
    )
  })
})
