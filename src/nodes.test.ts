import { print } from 'graphql'
import { objectTypeDefinitionNode, namedTypeNode } from './nodes'

describe(`nodes`, () => {
  test(objectTypeDefinitionNode.name, () => {
    // props input
    const res = objectTypeDefinitionNode({
      name: 'MyObject',
      fields: [
        {
          name: 'myField',
          description: 'my description',
          type: namedTypeNode('Int'),
        },
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "type MyObject {
        \\"my description\\"
        myField: Int
      }"
    `)
  })
})
