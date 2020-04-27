import { Api, Ast } from '../internal'

describe(Api.ArgumentApi.name, () => {
  const value = Ast.intValueNode(123)
  const node = Ast.argumentNode({ name: 'age', value })
  const api = Api.argumentApi(node)


  test('works', () => {
    expect(api.name.get()).toEqual('age')
  })

  describe('value', () => {
    test('get', () => {
      expect(api.value.node).toEqual(value)
    })

    test('set', () => {
      const next = Ast.intValueNode(1)

      api.value.set(next)
      expect(api.value.node).toEqual(next)
    })
  })
})
