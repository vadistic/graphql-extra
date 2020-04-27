import { Api, Ast } from '../internal'


describe(Api.FieldDefinitionApi.name, () => {
  const node = Ast.fieldDefinitionNode({ name: 'myField', type: 'Int!' })
  const api = Api.fieldDefinitionApi(node)

  test('works', () => {
    expect(api.name.get()).toBe('myField')
  })
})
