import { Mixin, Ast } from '../internal'

describe('crud util', () => {
  const args = [{ name: 'maxAge', value: Ast.intValueNode(123) }]

  const node = Ast.directiveNode({
    name: 'Cache',
    arguments: args,
  })

  const api = Mixin.argumentsMixin(node)

  describe('create', () => {
    const argname = 'hello'
    const value = Ast.booleanValueNode(true)

    test('create ok', () => {
      api.createArgument({ name: argname, value })

      expect(api.getArgument(argname).getName()).toEqual(argname)
      expect(api.getArgument(argname).getValue()).toEqual(value)
    })

    test('create fail', () => {
      expect(() => api.createArgument({ name: argname, value })).toThrowErrorMatchingInlineSnapshot(
        '"cannot create \'hello\' in arguments of Directive \'Cache\' because it already exists"',
      )
    })

    test('create works with kind in props', () => {
      api.createArgument({ name: 'myAnotherArgument', value, kind: 'Argument' })

      expect(api.hasArgument('myAnotherArgument')).toBe(true)
    })
  })

  describe('update', () => {
    const value = Ast.nullValueNode()

    test('update partial ok', () => {
      api.updateArgument('hello', { value })
      expect(api.getArgument('hello').getValue()).toEqual(value)
    })

    test('rename ok', () => {
      api.updateArgument('hello', { value, name: 'bye' })
      expect(api.hasArgument('bye')).toBe(true)
      expect(api.hasArgument('hello')).toBe(false)
    })

    test('update fail', () => {
      expect(() => api.updateArgument('something', {})).toThrowErrorMatchingInlineSnapshot(
        '"cannot update \'something\' in arguments of Directive \'Cache\' because it does not exist"',
      )
    })
  })

  describe('upsert', () => {
    const value = Ast.stringValueNode('hello')

    test('existing ok', () => {
      api.upsertArgument({ name: 'maxAge', value })
      expect(api.getArgument('maxAge').getValue()).toEqual(value)
    })

    test('new ok', () => {
      api.upsertArgument({ name: 'maxAge2', value })
      expect(api.getArgument('maxAge2').getValue()).toEqual(value)
    })
  })

  describe('remove', () => {
    test('remove ok', () => {
      api.removeArgument('maxAge2')
      expect(api.hasArgument('maAge2')).toBe(false)
    })

    test('remove fail', () => {
      expect(() => api.removeArgument('something')).toThrowErrorMatchingInlineSnapshot(
        '"cannot remove \'something\' in arguments of Directive \'Cache\' because it does not exist"',
      )
    })
  })
})
