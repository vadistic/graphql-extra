/* eslint-disable @typescript-eslint/quotes */
import { print, Kind } from 'graphql'
import type * as GQL from 'graphql'

import * as AST from './ast'

describe('AST node', () => {
  //
  // ─── NAME ───────────────────────────────────────────────────────────────────────
  //

  test(AST.nameNode.name, () => {
    const node = AST.nameNode('MyName')

    expect(print(node)).toBe(`MyName`)
  })

  //
  // ─── DOCUMENT ───────────────────────────────────────────────────────────────────
  //

  test(AST.documentNode.name, () => {
    const node = AST.documentNode([])

    expect(node).toEqual({ kind: Kind.DOCUMENT, definitions: [] })
  })

  test(AST.operationDefinitionNode.name, () => {
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

  test(AST.variableDefinitionNode.name, () => {
    const node = AST.variableDefinitionNode({
      variable: 'myVar',
      type: { list: true, name: 'String' },
    })

    expect(print(node)).toBe(`$myVar: [String]`)
  })

  test(AST.variableNode.name, () => {
    const node = AST.variableNode('abc')

    expect(node).toEqual({ kind: Kind.VARIABLE, name: AST.nameNode('abc') })
    expect(print(node)).toBe(`$abc`)
  })

  test(AST.selectionSetNode.name, () => {
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

  test(AST.fieldNode.name, () => {
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

  test(AST.argumentNode.name, () => {
    const node = AST.argumentNode({
      name: 'myArgument',
      value: AST.intValueNode(123),
    })

    expect(print(node)).toBe(`myArgument: 123`)
  })

  //
  // ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
  //

  test(AST.fragmentSpreadNode.name, () => {
    const nodeString = AST.fragmentSpreadNode('MyFragment')
    const nodeProps = AST.fragmentSpreadNode({ name: 'MyFragment', directives: ['Client'] })

    expect(print(nodeString)).toBe(`...MyFragment`)
    expect(print(nodeProps)).toBe(`...MyFragment @Client`)
  })

  test(AST.inlineFragmentNode.name, () => {
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

  test(AST.fragmentDefinitionNode.name, () => {
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

  test(AST.intValueNode.name, () => {
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

  test(AST.floatValueNode.name, () => {
    const nodeString = AST.floatValueNode('123.123')
    const nodeNum = AST.floatValueNode(123.123)

    const fix: GQL.FloatValueNode = { kind: Kind.FLOAT, value: '123.123' }

    expect(nodeString).toEqual(fix)
    expect(nodeNum).toEqual(fix)
  })

  test(AST.stringValueNode.name, () => {
    const node = AST.stringValueNode('hello')

    const fix: GQL.StringValueNode = { kind: Kind.STRING, value: 'hello' }

    expect(node).toEqual(fix)
  })

  test(AST.booleanValueNode.name, () => {
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

  test(AST.nullValueNode.name, () => {
    const node = AST.nullValueNode()

    const fix: GQL.NullValueNode = { kind: Kind.NULL }

    expect(node).toEqual(fix)
  })

  test(AST.enumValueNode.name, () => {
    const node = AST.enumValueNode('ABC')

    const fix: GQL.EnumValueNode = {
      kind: Kind.ENUM,
      value: 'ABC',
    }

    expect(node).toEqual(fix)
  })

  test(AST.listValueNode.name, () => {
    const node = AST.listValueNode([AST.intValueNode(123)])

    const fix: GQL.ListValueNode = {
      kind: Kind.LIST,
      values: [AST.intValueNode(123)],
    }

    expect(node).toEqual(fix)
  })

  test(AST.objectValueNode.name, () => {
    const field = AST.objectFieldNode({ name: 'field', value: AST.intValueNode(123) })
    const node = AST.objectValueNode([field])

    const fix: GQL.ObjectValueNode = {
      kind: Kind.OBJECT,
      fields: [field],
    }

    expect(node).toEqual(fix)
  })

  test(AST.objectFieldNode.name, () => {
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

  test(AST.directiveNode.name, () => {
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

  test(AST.namedTypeNode.name, () => {
    const nodeString = AST.namedTypeNode('MyType')
    const nodeProps = AST.namedTypeNode({ name: 'MyType' })
    const nodeAST = AST.namedTypeNode(AST.nameNode('MyType'))

    expect(print(nodeString)).toBe(`MyType`)
    expect(print(nodeProps)).toBe(`MyType`)
    expect(print(nodeAST)).toBe(`MyType`)
  })

  test(AST.listTypeNode.name, () => {
    const nodeString = AST.listTypeNode('String')
    const nodeProps = AST.listTypeNode({ name: 'String' })
    const nodeAST = AST.listTypeNode(AST.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`[String]`)
    expect(print(nodeProps)).toBe(`[String]`)
    expect(print(nodeAST)).toBe(`[String]`)
  })

  test(AST.nonNullTypeNode.name, () => {
    const nodeString = AST.nonNullTypeNode('String')
    const nodeProps = AST.nonNullTypeNode({ name: 'String' })
    const nodeAST = AST.nonNullTypeNode(AST.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`String!`)
    expect(print(nodeProps)).toBe(`String!`)
    expect(print(nodeAST)).toBe(`String!`)
  })

  test(AST.typeNode.name, () => {
    const nodeString = AST.typeNode('[String!]!')
    const nodeProps = AST.typeNode({ name: 'String', list: true, nonNull: true })

    expect(print(nodeString)).toBe(`[String!]!`)
    expect(print(nodeProps)).toBe(`[String!]!`)
  })

  //
  // ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test(AST.schemaDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.operationTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.scalarTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.objectTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.fieldDefinitionNode.name, () => {
    //
  })


  // eslint-disable-next-line jest/expect-expect
  test(AST.inputValueDefinitionNode.name, () => {
    //
  })


  // eslint-disable-next-line jest/expect-expect
  test(AST.interfaceTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.unionTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.enumTypeDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.enumValueDefinitionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.inputObjectTypeDefinitionNode.name, () => {
    //
  })

  //
  // ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test(AST.directiveDefinitionNode.name, () => {
  //
  })

  //
  // ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test(AST.schemaExtensionNode.name, () => {
    //
  })

  //
  // ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
  //

  // eslint-disable-next-line jest/expect-expect
  test(AST.scalarTypeExtensionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.objectTypeExtensionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.interfaceTypeExtensionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.unionTypeExtensionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.enumTypeExtensionNode.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(AST.inputObjectTypeExtensionNode.name, () => {
    //
  })
})
