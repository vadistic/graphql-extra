import { print } from 'graphql'

import * as t from './alias'

describe('AST alias', () => {
  test('objectType', () => {
    // props input
    const res = t.objectType({
      name: 'MyObject',
      description: 'My object',
      interfaces: [
        // shorthand interface
        'Smth',
        // ast interface
        t.type.named('Other'),
      ],
      fields: [
        // props field
        {
          name: 'myField',
          description: 'my description',
          // ast type
          type: t.type.int(),
        },
        {
          name: 'anotherField',
          // props directive
          directives: [
            {
              name: 'cache',
              arguments: [
                // with props arg
                { name: 'days', value: t.value.int(10) },
              ],
            },
          ],
          // props type
          type: { name: 'ID' },
        },
        // ast node
        t.fieldDef({
          name: 'myOtherField',
          // string type
          type: '[ID!]',
        }),
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My object\\"
      type MyObject implements Smth & Other {
        \\"my description\\"
        myField: Int
        anotherField: ID @cache(days: 10)
        myOtherField: [ID!]
      }"
    `)
  })

  test('interfaceType', () => {
    // it's the same as object...
    const res = t.interfaceType({
      name: 'MyInterface',
      description: 'My interface',
      fields: [
        // props
        {
          name: 'myField',
          description: 'my description',
          type: t.type.nonNull(t.type.named('Value')),
        },
        // ast
        t.fieldDef({ name: 'myOtherField', type: 'String!' }),
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My interface\\"
      interface MyInterface {
        \\"my description\\"
        myField: Value!
        myOtherField: String!
      }"
    `)
  })

  test('unionType', () => {
    const res = t.unionType({
      name: 'MyUnion',
      description: 'My union',
      types: ['TypeOne', t.type.named('TypeTwo')],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My union\\"
      union MyUnion = TypeOne | TypeTwo"
    `)
  })

  test('scalarType', () => {
    // props input
    const res = t.scalarType({
      name: 'MyScalar',
      description: 'My scalar',
      directives: [
        // props
        { name: 'search' },
        // ast
        t.directive({ name: 'smth' }),
        // string
        'another',
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My scalar\\"
      scalar MyScalar @search @smth @another"
    `)
  })

  test('enumType', () => {
    // props input
    const res = t.enumType({
      name: 'MyEnum',
      description: 'My enum',
      values: [
        // props value
        { name: 'A', description: 'Enum value description' },
        // shothand value
        'B',
        // ast value
        t.enumVal({ name: 'C', directives: [{ name: 'depreciated' }] }),
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My enum\\"
      enum MyEnum {
        \\"Enum value description\\"
        A
        B
        C @depreciated
      }"
    `)
  })

  test('inputType', () => {
    // props input
    const res = t.inputType({
      name: 'MyInput',
      description: 'My input',
      fields: [
        {
          name: 'id',
          description: 'field description',
          type: { name: 'ID', nonNull: true },
        },
      ],
    })

    expect(print(res)).toMatchInlineSnapshot(`
      "\\"My input\\"
      input MyInput {
        \\"field description\\"
        id: ID!
      }"
    `)
  })
})
