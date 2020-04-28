import { Api, Mixin, Ast } from '../internal'

describe(Mixin.ArgumentsApiMixin.name, () => {
  const p = Mixin.ArgumentsApiMixin.prototype

  const args = [{ name: 'maxAge', value: Ast.intValueNode(123) }]

  const node = Ast.directiveNode({
    name: 'Cache',
    arguments: args,
  })

  const api = Mixin.argumentsApiMixin(node)


  test(p.getArgumentNames.name, () => {
    expect(api.getArgumentNames()).toEqual(['maxAge'])
  })

  test(p.hasArgument.name, () => {
    expect(api.hasArgument('maxAge')).toBe(true)
    expect(api.hasArgument('something')).toBe(false)
  })

  test(p.getArguments.name, () => {
    expect(api.getArguments().every((arg) => arg instanceof Api.ArgumentApi)).toBe(true)
  })

  test(p.getArgument.name, () => {
    expect(api.getArgument('maxAge')).toBeInstanceOf(Api.ArgumentApi)
    expect(() => api.getArgument('something')).toThrowError('cannot find')
  })
})
