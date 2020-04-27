import { Api, Ast } from '../internal'

describe(Api.ArgumentApi.name, () => {
  const value = Ast.intValueNode(123)
  const node = Ast.argumentNode({ name: 'age', value })
  const api = Api.argumentApi(node)

  describe('hooks', () => {
    test('name', () => {
      expect(api.name.get()).toEqual('age')
    })

    test('value', () => {
      expect(api.value.is(value)).toBe(true)
    })
  })
})
