import { Kind } from 'graphql'

import { kindToNode } from '../src/kind-to-node'
import { applyPropsPartial } from '../src/utils'

// test if all ast functions can be used with partial input
describe('Ast partials', () => {
  test.each(Object.values(Kind))('partial of "%s"', (kind) => {
    const partial = applyPropsPartial(kindToNode(kind), {})

    // TODO: think how to handle default values in partials
    if (kind === Kind.DIRECTIVE_DEFINITION) {
      expect(Object.keys(partial).length).toBe(2)
    }
    else {
      expect(Object.keys(partial).length).toBe(1)
    }

    expect(partial.kind).toBe(kind)
  })
})
