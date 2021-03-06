
import { t, Api, nodeToApi } from '../src'
import { objectTypeApi } from '../src/api'

describe('Api e2e', () => {
  const node = t.objectType({ name: 'MyType', fields: [{ name: 'myField', type: 'Int!' }] })

  test('top import', () => {
    const api = Api.objectTypeApi(node)
    expect(api.assertObjectType().getName()).toBe('MyType')
  })

  test('submodule import', () => {
    const api = objectTypeApi(node)
    expect(api.assertObjectType().getName()).toBe('MyType')
  })

  test('astNodeToApi', () => {
    const api = nodeToApi(node)
    expect(api.assertObjectType().getName()).toBe('MyType')
  })
})
