import { Ast, Api } from '../internal'

describe('type-definition', () => {
  const node = Ast.objectTypeDefinitionNode({
    name: 'MyObject',
    fields: [{ name: 'Myfield', type: 'Int!' }],
  })

  const api = Api.objectTypeApi(node)

  test('chain apis', () => {
    api
      .fields
      .create({ name: 'asd1', type: 'Int!' })
      .create({ name: 'asd2', type: 'String!' })

    api.directives
      .create({ name: 'asd1' })
      .create({ name: 'asd2' })
      .upsert({ name: 'asd3' })
      .remove({ name: 'asd1' })

    const res = api
      .isObjectType()

    expect(res).toBe(true)
  })
})
