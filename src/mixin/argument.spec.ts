import { Api, Mixin, Ast } from '../internal'

describe(Mixin.ArgumentsMixin.name, () => {
  const p = Mixin.ArgumentsMixin.prototype
  const args = [{ name: 'maxAge', value: Ast.intValueNode(123) }]

  const node = Ast.directiveNode({
    name: 'Cache',
    arguments: args,
  })

  const mixin = Mixin.argumentsMixin(node)


  test(p.getArgumentNames.name, () => {
    expect(mixin.getArgumentNames()).toEqual(['maxAge'])
  })

  test(p.hasArgument.name, () => {
    expect(mixin.hasArgument('maxAge')).toBe(true)
    expect(mixin.hasArgument('something')).toBe(false)
  })

  test(p.getArguments.name, () => {
    expect(mixin.getArguments().every((arg) => arg instanceof Api.ArgumentApi)).toBe(true)
  })

  test(p.getArgument.name, () => {
    expect(mixin.getArgument('maxAge')).toBeInstanceOf(Api.ArgumentApi)
    expect(() => mixin.getArgument('something')).toThrowError('cannot find')
  })
})
