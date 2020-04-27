import { Ast } from '../internal'
import { matchObject } from './match-object'

describe(matchObject.name, () => {
  test('shallow ok', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { a: 1 }

    expect(matchObject(main, subset)).toBe(true)
  })

  test('deep ok', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { nested: { a: 1 } }

    expect(matchObject(main, subset)).toBe(true)
  })

  test('shallow mismatch fail', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { a: 2 }

    expect(matchObject(main, subset)).toBe(false)
  })

  test('deep mismatch fail', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { nested: { a: 2 } }

    expect(matchObject(main, subset)).toBe(false)
  })

  test('shallow extra prop fail', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { a: 1, c: false }

    expect(matchObject(main, subset)).toBe(false)
  })

  test('deep extra prop fail', () => {
    const main = { a: 1, b: 'hey', nested: { a: 1 } }

    const subset = { nested: { a: 1, b: 1 } }

    expect(matchObject(main, subset)).toBe(false)
  })

  test('compare two string value nodes', () => {
    const a = Ast.stringValueNode('MyName')
    const b = Ast.stringValueNode('MyName')

    const res = matchObject(a, b)

    expect(res).toBe(true)
  })
})
