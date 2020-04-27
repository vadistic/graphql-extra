/* eslint-disable @typescript-eslint/quotes */
import { print, Kind } from 'graphql'
import type * as GQL from 'graphql'

import { Ast } from '../src'
import { applyPropsPartial } from '../src/utils'
import { nodes } from './nodes'

describe('Ast node', () => {
  //
  // ─── NAME ───────────────────────────────────────────────────────────────────────
  //

  test(Ast.nameNode.name, () => {
    expect(print(nodes.Name)).toMatchInlineSnapshot(`"MyName"`)
    expect(applyPropsPartial(Ast.nameNode, {})).toMatchObject({ kind: Kind.NAME })
  })

  //
  // ─── DOCUMENT ───────────────────────────────────────────────────────────────────
  //

  test(Ast.documentNode.name, () => {
    expect(print(nodes.Name)).toMatchInlineSnapshot(`"MyName"`)
  })

  test(Ast.operationDefinitionNode.name, () => {
    expect(print(nodes.OperationDefinition)).toMatchInlineSnapshot(`
      "query MyQuery @Client {
        myField
        ...myFragment
      }"
    `)
  })

  test(Ast.variableDefinitionNode.name, () => {
    expect(print(nodes.VariableDefinition)).toMatchInlineSnapshot(`"$myVar: [String]"`)
  })

  test(Ast.variableNode.name, () => {
    expect(print(nodes.Variable)).toMatchInlineSnapshot(`"$age"`)
  })

  test(Ast.selectionSetNode.name, () => {
    expect(print(nodes.SelectionSet)).toMatchInlineSnapshot(`
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

  test(Ast.fieldNode.name, () => {
    expect(print(nodes.Field)).toMatchInlineSnapshot(`
      "myAlias: myField(age: 123) @Cache {
        nested
      }"
    `)
  })

  test(Ast.argumentNode.name, () => {
    expect(print(nodes.Argument)).toBe(`myArgument: 123`)
  })

  //
  // ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
  //

  test(Ast.fragmentSpreadNode.name, () => {
    const nodeString = Ast.fragmentSpreadNode('MyFragment')
    const nodeProps = Ast.fragmentSpreadNode({ name: 'MyFragment', directives: ['Client'] })

    expect(print(nodeString)).toBe(`...MyFragment`)
    expect(print(nodeProps)).toBe(`...MyFragment @Client`)
  })

  test(Ast.inlineFragmentNode.name, () => {
    expect(print(nodes.InlineFragment)).toMatchInlineSnapshot(`
      "... on MyType {
        myField
      }"
    `)
  })

  test(Ast.fragmentDefinitionNode.name, () => {
    expect(print(nodes.FieldDefinition)).toMatchInlineSnapshot(`
      "\\"my field description\\"
      myField(age: Int = 123): Int! @Client(timeout: 123)"
    `)
  })

  //
  // ─── VALUES ─────────────────────────────────────────────────────────────────────
  //

  test(Ast.intValueNode.name, () => {
    const nodeString = Ast.intValueNode('123')
    const nodeStringFloat = Ast.intValueNode('123.0001')
    const nodeNumInt = Ast.intValueNode(123)
    const nodeNumFloat = Ast.intValueNode(123.0001)

    const fix: GQL.IntValueNode = { kind: Kind.INT, value: '123' }

    expect(nodeString).toEqual(fix)
    expect(nodeStringFloat).toEqual(fix)
    expect(nodeNumInt).toEqual(fix)
    expect(nodeNumFloat).toEqual(fix)
  })

  test(Ast.floatValueNode.name, () => {
    const nodeString = Ast.floatValueNode('123.123')
    const nodeNum = Ast.floatValueNode(123.123)

    const fix: GQL.FloatValueNode = { kind: Kind.FLOAT, value: '123.123' }

    expect(nodeString).toEqual(fix)
    expect(nodeNum).toEqual(fix)
  })

  test(Ast.stringValueNode.name, () => {
    const node = Ast.stringValueNode('hello')

    const fix: GQL.StringValueNode = { kind: Kind.STRING, value: 'hello' }

    expect(node).toEqual(fix)
  })

  test(Ast.booleanValueNode.name, () => {
    const nodeStringBoolean = Ast.booleanValueNode('true')
    const nodeBoolean = Ast.booleanValueNode(false)

    const fixTrue: GQL.BooleanValueNode = { kind: Kind.BOOLEAN, value: true }
    const fixFalse: GQL.BooleanValueNode = { kind: Kind.BOOLEAN, value: false }

    expect(nodeStringBoolean).toEqual(fixTrue)
    expect(nodeBoolean).toEqual(fixFalse)
  })

  test(Ast.nullValueNode.name, () => {
    const node = Ast.nullValueNode()

    const fix: GQL.NullValueNode = { kind: Kind.NULL }

    expect(node).toEqual(fix)
  })

  test(Ast.enumValueNode.name, () => {
    const node = Ast.enumValueNode('TEST')

    const fix: GQL.EnumValueNode = {
      kind: Kind.ENUM,
      value: 'TEST',
    }

    expect(node).toEqual(fix)
  })

  test(Ast.listValueNode.name, () => {
    const node = Ast.listValueNode({ values: [Ast.intValueNode(123)] })

    const fix: GQL.ListValueNode = {
      kind: Kind.LIST,
      values: [Ast.intValueNode(123)],
    }

    expect(node).toEqual(fix)
  })

  test(Ast.objectValueNode.name, () => {
    const field = Ast.objectFieldNode({ name: 'field', value: Ast.intValueNode(123) })
    const node = Ast.objectValueNode({ fields: [field] })

    const fix: GQL.ObjectValueNode = {
      kind: Kind.OBJECT,
      fields: [field],
    }

    expect(node).toEqual(fix)
  })

  test(Ast.objectFieldNode.name, () => {
    const value = Ast.intValueNode(123)
    const node = Ast.objectFieldNode({ name: 'field', value })

    const fix: GQL.ObjectFieldNode = {
      kind: Kind.OBJECT_FIELD,
      name: Ast.nameNode('field'),
      value,
    }

    expect(node).toEqual(fix)
  })

  //
  // ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
  //

  test(Ast.directiveNode.name, () => {
    const nodeString = Ast.directiveNode('Client')
    const nodeProps = Ast.directiveNode({
      name: 'Client',
      arguments: [{ name: 'timeout', value: Ast.intValueNode(123) }],
    })

    expect(print(nodeString)).toBe(`@Client`)
    expect(print(nodeProps)).toBe(`@Client(timeout: 123)`)
  })

  //
  // ─── TYPES ──────────────────────────────────────────────────────────────────────
  //

  test(Ast.namedTypeNode.name, () => {
    const nodeString = Ast.namedTypeNode('MyType')
    const nodeProps = Ast.namedTypeNode({ name: 'MyType' })
    const nodeAST = Ast.namedTypeNode(Ast.nameNode('MyType'))

    expect(print(nodeString)).toBe(`MyType`)
    expect(print(nodeProps)).toBe(`MyType`)
    expect(print(nodeAST)).toBe(`MyType`)
  })

  test(Ast.listTypeNode.name, () => {
    const nodeString = Ast.listTypeNode('String')
    const nodeProps = Ast.listTypeNode({ named: 'String' })
    const nodeAST = Ast.listTypeNode(Ast.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`[String]`)
    expect(print(nodeProps)).toBe(`[String]`)
    expect(print(nodeAST)).toBe(`[String]`)
  })

  test(Ast.nonNullTypeNode.name, () => {
    const nodeString = Ast.nonNullTypeNode('String')
    const nodeProps = Ast.nonNullTypeNode({ named: 'String' })
    const nodeAST = Ast.nonNullTypeNode(Ast.namedTypeNode('String'))

    expect(print(nodeString)).toBe(`String!`)
    expect(print(nodeProps)).toBe(`String!`)
    expect(print(nodeAST)).toBe(`String!`)
  })

  test(Ast.typeNode.name, () => {
    const nodeString = Ast.typeNode('[String!]!')
    const nodeProps = Ast.typeNode({ named: 'String', list: true, nonNull: true })

    expect(nodeString.kind).toBe(Kind.NON_NULL_TYPE)
    expect(nodeProps.kind).toBe(Kind.NON_NULL_TYPE)

    expect(print(nodeString)).toBe(`[String!]!`)
    expect(print(nodeProps)).toBe(`[String!]!`)
  })

  //
  // ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
  //

  test(Ast.schemaDefinitionNode.name, () => {
    expect(print(nodes.SchemaDefinition)).toMatchInlineSnapshot(`
      "schema {
        query: MyQuery
        mutation: MyMutation
      }"
    `)
  })

  test(Ast.operationTypeDefinitionNode.name, () => {
    expect(print(nodes.OperationTypeDefinition)).toMatchInlineSnapshot(`"query: MyQuery"`)
  })

  test(Ast.scalarTypeDefinitionNode.name, () => {
    expect(print(nodes.ScalarTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my scalar description\\"
      scalar MyScalar @Client(timeout: 123)"
    `)
  })

  test(Ast.objectTypeDefinitionNode.name, () => {
    expect(print(nodes.ObjectTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my object description\\"
      type MyObject implements MyInterface @Client(timeout: 123) {
        \\"my field description\\"
        myField(age: Int = 123): Int! @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.fieldDefinitionNode.name, () => {
    expect(print(nodes.FieldDefinition)).toMatchInlineSnapshot(`
      "\\"my field description\\"
      myField(age: Int = 123): Int! @Client(timeout: 123)"
    `)
  })

  test(Ast.inputValueDefinitionNode.name, () => {
    expect(print(nodes.InputValueDefinition)).toMatchInlineSnapshot(`"age: Int!"`)
  })

  test(Ast.interfaceTypeDefinitionNode.name, () => {
    expect(print(nodes.InterfaceTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my interfcae description\\"
      interface MyInterface @Client(timeout: 123) {
        \\"my field description\\"
        myField(age: Int = 123): Int! @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.unionTypeDefinitionNode.name, () => {
    expect(print(nodes.UnionTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my union description\\"
      union MyUnion @Client(timeout: 123) = MyType"
    `)
  })

  test(Ast.enumTypeDefinitionNode.name, () => {
    expect(print(nodes.EnumTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my enum description\\"
      enum MyEnum @Client(timeout: 123) {
        \\"test enum value description\\"
        TEST @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.enumValueDefinitionNode.name, () => {
    expect(print(nodes.EnumValueDefinition)).toMatchInlineSnapshot(`
      "\\"test enum value description\\"
      TEST @Client(timeout: 123)"
    `)
  })

  test(Ast.inputObjectTypeDefinitionNode.name, () => {
    expect(print(nodes.InputObjectTypeDefinition)).toMatchInlineSnapshot(`
      "\\"my input description\\"
      input MyInput @Client(timeout: 123) {
        age: Int!
      }"
    `)
  })

  //
  // ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
  //

  test(Ast.directiveDefinitionNode.name, () => {
    expect(print(nodes.DirectiveDefinition)).toMatchInlineSnapshot(`
      "\\"my directive description\\"
      directive @Mydirective(age: Int!) repeatable on ARGUMENT_DEFINITION"
    `)
  })

  //
  // ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
  //

  test(Ast.schemaExtensionNode.name, () => {
    expect(print(nodes.SchemaExtension)).toMatchInlineSnapshot(`
      "extend schema {
        subscription: MySubscription
      }"
    `)
  })

  //
  // ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
  //

  test(Ast.scalarTypeExtensionNode.name, () => {
    expect(print(nodes.ScalarTypeExtension)).toMatchInlineSnapshot(`"extend scalar MyScalar @Client(timeout: 123)"`)
  })

  test(Ast.objectTypeExtensionNode.name, () => {
    expect(print(nodes.ObjectTypeExtension)).toMatchInlineSnapshot(`
      "extend type MyObject implements MyInterface @Client(timeout: 123) {
        \\"my field description\\"
        myField(age: Int = 123): Int! @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.interfaceTypeExtensionNode.name, () => {
    expect(print(nodes.InterfaceTypeExtension)).toMatchInlineSnapshot(`
      "extend interface MyInterface @Client(timeout: 123) {
        \\"my field description\\"
        myField(age: Int = 123): Int! @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.unionTypeExtensionNode.name, () => {
    expect(print(nodes.UnionTypeExtension)).toMatchInlineSnapshot(
      `"extend union MyUnion @Client(timeout: 123) = MyType"`,
    )
  })

  test(Ast.enumTypeExtensionNode.name, () => {
    expect(print(nodes.EnumTypeExtension)).toMatchInlineSnapshot(`
      "extend enum MyEnum @Client(timeout: 123) {
        \\"test enum value description\\"
        TEST @Client(timeout: 123)
      }"
    `)
  })

  test(Ast.inputObjectTypeExtensionNode.name, () => {
    expect(print(nodes.InputObjectTypeExtension)).toMatchInlineSnapshot(`
      "extend input MyInput @Client(timeout: 123) {
        age: Int!
      }"
    `)
  })
})
