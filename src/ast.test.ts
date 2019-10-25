import { AST } from './ast'

describe('ast', () => {
  const ast = new AST()

  it('works', () => {
    const types = ast.types

    console.log(types)
  })
})
