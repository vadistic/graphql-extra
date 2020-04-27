import { Api, Ast } from '../internal'

describe(Api.InputValueDefinitionApi.name, () => {
  const node = Ast.inputValueDefinitionNode({
    name: 'myField',
    type: 'Int',
  })

  const api = Api.inputValueDefinitionApi(node)

  describe('hooks', () => {
    test('description', () => {
      expect(api.description.is()).toBe(false)
    })
  })
})
