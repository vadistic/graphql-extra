import { Ast } from '../internal'
import { matchNode } from './match-node'

describe(matchNode.name, () => {
  describe('basic', () => {
    test('shallow ok', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { a: 1 }

      expect(matchNode(main, subset)).toBe(true)
    })

    test('deep ok', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { nested: { a: 1 } }

      expect(matchNode(main, subset)).toBe(true)
    })

    test('shallow mismatch fail', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { a: 2 }

      expect(matchNode(main, subset)).toBe(false)
    })

    test('deep mismatch fail', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { nested: { a: 2 } }

      expect(matchNode(main, subset)).toBe(false)
    })

    test('shallow extra prop fail', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { a: 1, c: false }

      expect(matchNode(main, subset)).toBe(false)
    })

    test('deep extra prop fail', () => {
      const main = { a: 1, b: 'hey', nested: { a: 1 } }

      const subset = { nested: { a: 1, b: 1 } }

      expect(matchNode(main, subset)).toBe(false)
    })
  })

  describe('ast', () => {
    test('compare two string value nodes', () => {
      const a = Ast.stringValueNode('MyName')
      const b = Ast.stringValueNode('MyName')

      const res = matchNode(a, b)

      expect(res).toBe(true)
    })

    test('compare two type nodes and ignore loc', () => {
      const a = Ast.typeNode('String')
      const aPrim = Ast.typeNode('  String')
      const b = Ast.typeNode('String!')

      expect(matchNode(a, b)).toBe(false)
      expect(matchNode(a, aPrim)).toBe(true)
    })
  })
})
