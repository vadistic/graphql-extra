import { Api, Mixin, Ast } from '../internal'

describe(Mixin.ArgumentsApiMixin.name, () => {
  const p = Mixin.ArgumentsApiMixin.prototype

  const args = [{ name: 'maxAge', value: Ast.intValueNode(123) }]

  const nodes = [
    Ast.directiveNode({
      name: 'Cache',
      arguments: args,
    }),
    Ast.fieldNode({
      name: 'myField',
      arguments: args,
    }),
  ]

  const apis = nodes.map(Mixin.argumentsApiMixin)

  test.each(apis)(p.getArgumentNames.name, (api) => {
    expect(api.getArgumentNames()).toEqual(['maxAge'])
  })

  test.each(apis)(p.hasArgument.name, (api) => {
    expect(api.hasArgument('maxAge')).toBe(true)
    expect(api.hasArgument('something')).toBe(false)
  })

  test.each(apis)(p.getArguments.name, (api) => {
    expect(api.getArguments().every((arg) => arg instanceof Api.ArgumentApi)).toBe(true)
  })

  test.each(apis)(p.getArgument.name, (api) => {
    expect(api.getArgument('maxAge')).toBeInstanceOf(Api.ArgumentApi)
    expect(() => api.getArgument('something')).toThrowError('cannot get')
  })

  // this test also covers crud helper

  test.each(apis)(p.createArgument.name, (api) => {
    const argname = 'hello'
    const value = Ast.booleanValueNode(true)

    api.createArgument({ name: argname, value })
    expect(api.getArgument(argname).getName()).toEqual(argname)
    expect(api.getArgument(argname).getValue()).toEqual(value)
  })

  test.each(apis)(p.updateArgument.name, (api) => {
    const value = Ast.nullValueNode()

    // partial
    api.updateArgument('hello', { value })
    expect(api.getArgument('hello').getValue()).toEqual(value)

    // rename
    api.updateArgument('hello', { value, name: 'bye' })
    expect(api.hasArgument('bye')).toBe(true)
    expect(api.hasArgument('hello')).toBe(false)

    // fail
    expect(() => api.updateArgument('something', {})).toThrowError('cannot update')
  })

  test.each(apis)(p.upsertArgument.name, (api) => {
    const value = Ast.stringValueNode('hello')

    // existing
    api.upsertArgument({ name: 'maxAge', value })
    expect(api.getArgument('maxAge').getValue()).toEqual(value)

    // new
    api.upsertArgument({ name: 'maxAge2', value })
    expect(api.getArgument('maxAge2').getValue()).toEqual(value)
  })

  test.each(apis)(p.removeArgument.name, (api) => {
    // ok
    api.removeArgument('maxAge2')
    expect(api.hasArgument('maAge2')).toBe(false)

    // fail
    expect(() => api.removeArgument('something')).toThrowError('cannot remove')
  })
})
