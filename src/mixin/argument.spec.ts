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
    expect(() => api.getArgument('something')).toThrowError('cannot get')
  })

  // this test also covers crud helper

  test(p.createArgument.name, () => {
    const argname = 'hello'
    const value = Ast.booleanValueNode(true)

    api.createArgument({ name: argname, value })
    expect(api.getArgument(argname).getName()).toEqual(argname)
    expect(api.getArgument(argname).getValue()).toEqual(value)
  })

  test(p.updateArgument.name, () => {
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

  test(p.upsertArgument.name, () => {
    const value = Ast.stringValueNode('hello')

    // existing
    api.upsertArgument({ name: 'maxAge', value })
    expect(api.getArgument('maxAge').getValue()).toEqual(value)

    // new
    api.upsertArgument({ name: 'maxAge2', value })
    expect(api.getArgument('maxAge2').getValue()).toEqual(value)
  })

  test(p.removeArgument.name, () => {
    // ok
    api.removeArgument('maxAge2')
    expect(api.hasArgument('maAge2')).toBe(false)

    // fail
    expect(() => api.removeArgument('something')).toThrowError('cannot remove')
  })
})
