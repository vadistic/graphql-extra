import {
  NameNode,
  Kind,
  DocumentNode,
  VariableDefinitionNode,
  VariableNode,
  OperationDefinitionNode,
  SelectionSetNode,
  FieldNode,
  ArgumentNode,
  DirectiveNode,
} from 'graphql'

import { AST } from '../../src'
import { normaliseGql } from '../test-utils'

describe('node > ast', () => {
  test('nameNode', () => {
    const res = AST.nameNode('hello')

    const fix: NameNode = {
      kind: Kind.NAME,
      value: 'hello',
    }

    expect(normaliseGql(res)).toEqual(normaliseGql(fix))
  })

  test('documentNode', () => {
    const res = AST.documentNode([])

    const fix: DocumentNode = {
      kind: Kind.DOCUMENT,
      definitions: [],
    }

    expect(normaliseGql(res)).toEqual(normaliseGql(fix))
  })

  test('operationDefinitionNode', () => {
    const short = AST.operationDefinitionNode({
      name: 'MyQuery',
      operation: 'query',
      selections: ['field', { name: 'otherField' }],
    })

    const long = AST.operationDefinitionNode({
      name: AST.nameNode('MyQuery'),
      operation: 'query',
      selections: AST.selectionSetNode([
        AST.fieldNode({ name: AST.nameNode('field') }),
        AST.fieldNode({ name: AST.nameNode('otherField') }),
      ]),
    })

    const fix: OperationDefinitionNode = {
      kind: Kind.OPERATION_DEFINITION,
      name: { kind: Kind.NAME, value: 'MyQuery' },
      operation: 'query',
      selectionSet: {
        kind: Kind.SELECTION_SET,
        selections: [
          { kind: Kind.FIELD, name: { kind: Kind.NAME, value: 'field' } },
          { kind: Kind.FIELD, name: { kind: Kind.NAME, value: 'otherField' } },
        ],
      },
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  test('variableDefinitionNode', () => {
    const short = AST.variableDefinitionNode({
      variable: 'parent',
      type: { name: 'ID', nonNull: true },
      defaultValue: AST.intValueNode(10),
    })

    const long = AST.variableDefinitionNode({
      variable: 'parent',
      type: AST.nonNullTypeNode(AST.namedTypeNode(AST.nameNode('ID'))),
      defaultValue: AST.intValueNode(10),
    })

    const fix: VariableDefinitionNode = {
      kind: Kind.VARIABLE_DEFINITION,
      variable: {
        kind: Kind.VARIABLE,
        name: {
          kind: Kind.NAME,
          value: 'parent',
        },
      },
      type: {
        kind: Kind.NON_NULL_TYPE,
        type: {
          kind: Kind.NAMED_TYPE,
          name: {
            kind: Kind.NAME,
            value: 'ID',
          },
        },
      },
      defaultValue: {
        kind: Kind.INT,
        value: '10',
      },
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  test('variableNode', () => {
    const res = AST.variableNode('abc')

    const fix: VariableNode = {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: 'abc',
      },
    }

    expect(normaliseGql(res)).toEqual(normaliseGql(fix))
  })

  test('selectionSetNode', () => {
    const short = AST.selectionSetNode([
      'field',
      { name: 'otherField', selections: ['nestedField'] },
    ])

    const long = AST.selectionSetNode([
      AST.fieldNode({ name: AST.nameNode('field') }),
      AST.fieldNode({
        name: AST.nameNode('otherField'),
        selections: AST.selectionSetNode([AST.fieldNode({ name: AST.nameNode('nestedField') })]),
      }),
    ])

    const fix: SelectionSetNode = {
      kind: Kind.SELECTION_SET,
      selections: [
        {
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'field' },
        },
        {
          kind: Kind.FIELD,
          name: { kind: Kind.NAME, value: 'otherField' },
          selectionSet: {
            kind: Kind.SELECTION_SET,
            selections: [
              {
                kind: Kind.FIELD,
                name: { kind: Kind.NAME, value: 'nestedField' },
              },
            ],
          },
        },
      ],
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  test('fieldNode', () => {
    const short = AST.fieldNode('field')
    const long = AST.fieldNode({ name: AST.nameNode('field') })

    const fix: FieldNode = {
      kind: Kind.FIELD,
      name: { kind: Kind.NAME, value: 'field' },
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  test('argumentNode', () => {
    const short = AST.argumentNode({ name: 'skip', value: AST.variableNode('id') })
    const long = AST.argumentNode({ name: AST.nameNode('skip'), value: AST.variableNode('id') })

    const fix: ArgumentNode = {
      kind: Kind.ARGUMENT,
      name: { kind: Kind.NAME, value: 'skip' },
      value: { kind: Kind.VARIABLE, name: { kind: Kind.NAME, value: 'id' } },
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  test('directiveNode', () => {
    const short = AST.directiveNode({
      name: 'cache',
      arguments: [
        {
          name: 'days',
          value: AST.intValueNode(3),
        },
      ],
    })

    const long = AST.directiveNode({
      name: AST.nameNode('cache'),
      arguments: [
        AST.argumentNode({
          name: AST.nameNode('days'),
          value: AST.intValueNode('3'),
        }),
      ],
    })

    const fix: DirectiveNode = {
      kind: Kind.DIRECTIVE,
      name: { kind: Kind.NAME, value: 'cache' },
      arguments: [
        {
          kind: Kind.ARGUMENT,
          name: { kind: Kind.NAME, value: 'days' },
          value: { kind: Kind.INT, value: '3' },
        },
      ],
    }

    expect(normaliseGql(short)).toEqual(normaliseGql(fix))
    expect(normaliseGql(long)).toEqual(normaliseGql(fix))
  })

  // TODO: Types??, the rest will be tested in alias test & in api tests
})
