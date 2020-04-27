import { t, Api, nodeToApi } from '../src'
import { objectTypeApi } from '../src/api'

// TODO: do it from dist!

describe('Api e2e', () => {
  const node = t.objectType({ name: 'MyType', fields: [{ name: 'myField', type: 'Int!' }] })

  test('top import', () => {
    const api = Api.objectTypeApi(node)
    expect(api.assertObjectType().name.get()).toBe('MyType')
  })

  test('submodule import', () => {
    const api = objectTypeApi(node)
    expect(api.assertObjectType().name.get()).toBe('MyType')
  })

  test('astNodeToApi', () => {
    const api = nodeToApi(node)
    expect(api.assertObjectType().name.get()).toBe('MyType')
  })
})
