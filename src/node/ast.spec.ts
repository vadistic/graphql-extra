/* eslint-disable @typescript-eslint/quotes */
import { print, Kind } from 'graphql'
import type * as GQL from 'graphql'

import * as AST from './ast'

describe('AST node', () => {
  //
  // ─── NAME ───────────────────────────────────────────────────────────────────────
  //

  test('nameNode', () => {
    const node = AST.nameNode('MyName')

    expect(print(node)).toBe(`MyName`)
  })

  //
  // ─── DOCUMENT ───────────────────────────────────────────────────────────────────
  //

  test('documentNode', () => {
    const node = AST.documentNode([])

    expect(node).toEqual({ kind: Kind.DOCUMENT, definitions: [] })
  })

  test('operationDefinitionNode', () => {
    const node = AST.operationDefinitionNode({
      operation: 'query',
      directives: ['Client'],
      name: 'MyQuery',
      selections: ['myField', AST.fragmentSpreadNode('myFragment')],
    })

    expect(print(node)).toMatchInlineSnapshot(`
      "query MyQuery @Client {
        myField
        ...myFragment
      }"
    `)
  })

  test('variableDefinitionNode', () => {
    const node = AST.variableDefinitionNode({
      variable: 'myVar',
      type: { list: true, name: 'String' },
    })

    expect(print(node)).toBe(`$myVar: [String]`)
  })

  test('variableNode', () => {
    const node = AST.variableNode('abc')

    expect(node).toEqual({ kind: Kind.VARIABLE, name: AST.nameNode('abc') })
    expect(print(node)).toBe(`$abc`)
  })

  test('selectionSetNode', () => {
    const node = AST.selectionSetNode([
      'myField',
      { name: 'myPropsField' },
      AST.fieldNode('myAstField'),
      AST.fragmentSpreadNode('MyFramgentSpread'),
      AST.inlineFragmentNode({
        selections: ['myInlineFragmentField'],
        typeCondition: 'SomeType',
      }),
    ])

    expect(print(node)).toMatchInlineSnapshot(`
      "{
        myField
        myPropsField
        myAstField
        ...MyFramgentSpread
        ... on SomeType {
          myInlineFragmentField
        }
      }"
    `)
  })

  test('fieldNode', () => {
    const node = AST.fieldNode({
      name: 'myField',
      alias: 'myAlias',
      arguments: [{ name: 'age', value: AST.intValueNode(123) }],
      directives: ['Cache'],
      selections: ['nested'],
    })

    expect(print(node)).toMatchInlineSnapshot(`
      "myAlias: myField(age: 123) @Cache {
        nested
      }"
    `)
  })

  test('argumentNode', () => {
    const node = AST.argumentNode({
      name: 'myArgument',
      value: AST.intValueNode(123),
    })

    expect(print(node)).toBe(`myArgument: 123`)
  })

  //
  // ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
  //

  test('fragmentSpreadNode', () => {
    const nodeString = AST.fragmentSpreadNode('MyFragment')
    const nodeProps = AST.fragmentSpreadNode({ name: 'MyFragment', directives: ['Client'] })

    expect(print(nodeString)).toBe(`...MyFragment`)
    expect(print(nodeProps)).toBe(`...MyFragment @Client`)
  })

  test('inlineFragmentNode', () => {
    const node = AST.inlineFragmentNode({
      selections: ['myField'],
      typeCondition: 'MyType',
    })

    expect(print(node)).toMatchInlineSnapshot(`
      "... on MyType {
        myField
      }"
    `)
  })

  test('fragmentDefinitionNode', () => {
    const node = AST.fragmentDefinitionNode({
      name: 'MyFragment',
      selections: ['myField'],
      typeCondition: 'MyType',
      directives: ['Client'],
      variableDefinitions: [{ variable: 'age', type: 'Int!' }],
    })

    expect(print(node)).toMatchInlineSnapshot(`
      "fragment MyFragment($age: Int!) on MyType @Client {
        myField
      }"
    `)
  })

  //
  // ─── VALUES ─────────────────────────────────────────────────────────────────────
  //

  test('intValueNode', () => {
    const nodeString = AST.intValueNode('123')
    const nodeStringFloat = AST.intValueNode('123.0001')
    const nodeNumInt = AST.intValueNode(123)
    const nodeNumFloat = AST.intValueNode(123.0001)

    const fix: GQL.IntValueNode = { kind: Kind.INT, value: '123' }

    expect(nodeString).toEqual(fix)
    expect(nodeStringFloat).toEqual(fix)
    expect(nodeNumInt).toEqual(fix)
    expect(nodeNumFloat).toEqual(fix)
  })

  test('floatValueNode', () => {
    const nodeString = AST.floatValueNode('123.123')
    const nodeNum = AST.floatValueNode(123.123)

    const fix: GQL.FloatValueNode = { kind: Kind.FLOAT, value: '123.123' }

    expect(nodeString).toEqual(fix)
    expect(nodeNum).toEqual(fix)
  })

  test('stringValueNode', () => {
    const node = AST.stringValueNode('hello')

    const fix: GQL.StringValueNode = { kind: Kind.STRING, value: 'hello' }

    expect(node).toEqual(fix)
  })

  test('booleanValueNode', () => {
    const nodeStringBoolean = AST.booleanValueNode('true')
    const nodeObject = AST.booleanValueNode({})

    const nodeBoolean = AST.booleanValueNode(false)
    const nodeNull = AST.booleanValueNode(null)

    const fixTrue: GQL.BooleanValueNode = { kind: Kind.BOOLEAN, value: true }
    const fixFalse: GQL.BooleanValueNode = { kind: Kind.BOOLEAN, value: false }

    expect(nodeStringBoolean).toEqual(fixTrue)
    expect(nodeObject).toEqual(fixTrue)

    expect(nodeBoolean).toEqual(fixFalse)
    expect(nodeNull).toEqual(fixFalse)
  })

  test('nullValueNode', () => {
    const node = AST.nullValueNode()

    const fix: GQL.NullValueNode = { kind: Kind.NULL }

    expect(node).toEqual(fix)
  })

  test('enumValueNode', () => {
    const node = AST.enumValueNode('ABC')

    const fix: GQL.EnumValueNode = {
      kind: Kind.ENUM,
      value: 'ABC',
    }

    expect(node).toEqual(fix)
  })

  test('listValueNode', () => {
    const node = AST.listValueNode([AST.intValueNode(123)])

    const fix: GQL.ListValueNode = {
      kind: Kind.LIST,
      values: [AST.intValueNode(123)],
    }

    expect(node).toEqual(fix)
  })

  test('objectValueNode', () => {
    const field = AST.objectFieldNode({ name: 'field', value: AST.intValueNode(123) })
    const node = AST.objectValueNode([field])

    const fix: GQL.ObjectValueNode = {
      kind: Kind.OBJECT,
      fields: [field],
    }

    expect(node).toEqual(fix)
  })

  test('objectFieldNode', () => {
    const value = AST.intValueNode(123)
    const node = AST.objectFieldNode({ name: 'field', value })

    const fix: GQL.ObjectFieldNode = {
      kind: Kind.OBJECT_FIELD,
      name: AST.nameNode('field'),
      value,
    }

    expect(node).toEqual(fix)
  })

  //
  // ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
  //

  test('directiveNode', () => {
    const nodeString = AST.directiveNode('Client')
    const nodeProps = AST.directiveNode({
      name: 'Client',
      arguments: [{ name: 'timeout', value: AST.intValueNode(123) }],
    })

    expect(print(nodeString)).toBe(`@Client`)
    expect(print(nodeProps)).toBe(`@Client(timeout: 123)`)
  })

  //
  // ─── TYPES ──────────────────────────────────────────────────────────────────────
  //

  test('namedTypeNode', () => {
    const nodeString = AST.namedTypeNode('MyType')
    const nodeProps = AST.namedTypeNode({ name: 'MyType' })
    const nodeAST = AST.namedTypeNode(AST.nameNode('MyType'))

    expect(print(nodeString)).toBe(`MyType`)
    expect(print(nodeProps)).toBe(`MyType`)
    expect(print(nodeAST)).toBe(`MyType`)
  })

  test('listTypeNode', () => {
    const nodeString = AST.listTypeNode('String')
    const nodeProps = AST.listTypeNode({ name: 'String' })
    const nodeAST = AST.listTypeNode(AST.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`[String]`)
    expect(print(nodeProps)).toBe(`[String]`)
    expect(print(nodeAST)).toBe(`[String]`)
  })

  test('nonNullTypeNode', () => {
    const nodeString = AST.nonNullTypeNode('String')
    const nodeProps = AST.nonNullTypeNode({ name: 'String' })
    const nodeAST = AST.nonNullTypeNode(AST.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`String!`)
    expect(print(nodeProps)).toBe(`String!`)
    expect(print(nodeAST)).toBe(`String!`)
  })

  test('typeNode', () => {
    const nodeString = AST.typeNode('[String!]!')
    const nodeProps = AST.typeNode({ name: 'String', list: true, nonNull: true })

    expect(print(nodeString)).toBe(`[String!]!`)
    expect(print(nodeProps)).toBe(`[String!]!`)
  })

  //
  // ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test('schemaDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('operationTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('scalarTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('objectTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('fieldDefinitionNode', () => {
    //
  })


  // eslint-disable-next-line jest/expect-expect
  test('inputValueDefinitionNode', () => {
    //
  })


  // eslint-disable-next-line jest/expect-expect
  test('interfaceTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('unionTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('enumTypeDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('enumValueDefinitionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('inputObjectTypeDefinitionNode', () => {
    //
  })

  //
  // ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test('directiveDefinitionNode', () => {
  //
  })

  //
  // ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test('schemaExtensionNode', () => {
    //
  })

  //
  // ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test('scalarTypeExtensionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('objectTypeExtensionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('interfaceTypeExtensionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('unionTypeExtensionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('enumTypeExtensionNode', () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test('inputObjectTypeExtensionNode', () => {
    //
  })
})
