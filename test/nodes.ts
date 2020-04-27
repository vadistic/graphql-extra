import { KindEnum, ASTKindToNode, Kind } from 'graphql'

import { Ast } from '../src/internal'

// Name
const Name = Ast.nameNode('MyName')

// Document
const Document = Ast.documentNode({
  definitions: [
    {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      name: 'MyObject',
      fields: [{ name: 'myField', type: 'Int!' }],
    },
  ],
})

const OperationDefinition = Ast.operationDefinitionNode({
  operation: 'query',
  directives: ['Client'],
  name: 'MyQuery',
  selections: ['myField', Ast.fragmentSpreadNode('myFragment')],
})

const VariableDefinition = Ast.variableDefinitionNode({
  variable: 'myVar',
  type: { list: true, named: 'String' },
})

const Variable = Ast.variableNode('age')

const SelectionSet = Ast.selectionSetNode({
  selections: [
    'myField',
    { name: 'myPropsField' },
    Ast.fieldNode('myAstField'),
    Ast.fragmentSpreadNode('MyFramgentSpread'),
    Ast.inlineFragmentNode({
      selections: ['myInlineFragmentField'],
      typeCondition: 'SomeType',
    }),
  ],
})

const Field = Ast.fieldNode({
  name: 'myField',
  alias: 'myAlias',
  arguments: [{ name: 'age', value: Ast.intValueNode(123) }],
  directives: ['Cache'],
  selections: ['nested'],
})

const Argument = Ast.argumentNode({
  name: 'myArgument',
  value: Ast.intValueNode(123),
})

const FragmentSpread = Ast.fragmentSpreadNode({
  name: 'MyFragment',
  directives: ['Client'],
})

const InlineFragment = Ast.inlineFragmentNode({
  selections: ['myField'],
  typeCondition: 'MyType',
})

const FragmentDefinition = Ast.fragmentDefinitionNode({
  name: 'MyFragment',
  selections: ['myField'],
  typeCondition: 'MyType',
  directives: ['Client'],
  variableDefinitions: [{ variable: 'age', type: 'Int!' }],
})

const IntValue = Ast.intValueNode('123')

const FloatValue = Ast.floatValueNode('123.123')

const StringValue = Ast.stringValueNode('hello')

const BooleanValue = Ast.booleanValueNode(true)

const NullValue = Ast.nullValueNode()

const EnumValue = Ast.enumValueNode('TEST')

const ListValue = Ast.listValueNode({ values: [IntValue] })

const ObjectField = Ast.objectFieldNode({ name: 'field', value: IntValue })

const ObjectValue = Ast.objectValueNode({ fields: [ObjectField] })

// Directives

const Directive = Ast.directiveNode({
  name: 'Client',
  arguments: [{ name: 'timeout', value: Ast.intValueNode(123) }],
})

// Types

const NamedType = Ast.namedTypeNode('MyType')

const ListType = Ast.listTypeNode(NamedType)

const NonNullType = Ast.nonNullTypeNode(NamedType)

// Type System Definitions


const SchemaDefinition = Ast.schemaDefinitionNode({
  operationTypes: [
    { operation: 'query', type: 'MyQuery' },
    { operation: 'mutation', type: 'MyMutation' },
  ],
})

const OperationTypeDefinition = Ast.operationTypeDefinitionNode(
  { operation: 'query', type: 'MyQuery' },
)

const EnumValueDefinition = Ast.enumValueDefinitionNode({
  name: 'TEST',
  description: 'test enum value description',
  directives: [Directive],
})

const FieldDefinition = Ast.fieldDefinitionNode({
  name: 'myField',
  type: 'Int!',
  arguments: [{ name: 'age', defaultValue: IntValue, type: 'Int' }],
  description: 'my field description',
  directives: [Directive],
})

const InputValueDefinition = Ast.inputValueDefinitionNode({ name: 'age', type: 'Int!' })

// Type Definitions

const ScalarTypeDefinition = Ast.scalarTypeDefinitionNode({
  name: 'MyScalar',
  description: 'my scalar description',
  directives: [Directive],
})

const ObjectTypeDefinition = Ast.objectTypeDefinitionNode({
  name: 'MyObject',
  description: 'my object description',
  directives: [Directive],
  fields: [FieldDefinition],
  interfaces: ['MyInterface'],
})

const InterfaceTypeDefinition = Ast.interfaceTypeDefinitionNode({
  name: 'MyInterface',
  description: 'my interfcae description',
  directives: [Directive],
  fields: [FieldDefinition],
})

const UnionTypeDefinition = Ast.unionTypeDefinitionNode({
  name: 'MyUnion',
  description: 'my union description',
  directives: [Directive],
  types: [NamedType],
})

const EnumTypeDefinition = Ast.enumTypeDefinitionNode({
  name: 'MyEnum',
  description: 'my enum description',
  directives: [Directive],
  values: [EnumValueDefinition],
})

const InputObjectTypeDefinition = Ast.inputObjectTypeDefinitionNode({
  name: 'MyInput',
  description: 'my input description',
  directives: [Directive],
  fields: [InputValueDefinition],
})


// Directive Definitions

const DirectiveDefinition = Ast.directiveDefinitionNode({
  name: 'Mydirective',
  description: 'my directive description',
  locations: ['ARGUMENT_DEFINITION'],
  arguments: [InputValueDefinition],
  repeatable: true,
})

// Type System Extensions

const SchemaExtension = Ast.schemaExtensionNode({
  operationTypes: [{ operation: 'subscription', type: 'MySubscription' }],
})

// Type Extensions

const ScalarTypeExtension = Ast.scalarTypeExtensionNode({
  name: 'MyScalar',
  directives: [Directive],
})

const ObjectTypeExtension = Ast.objectTypeExtensionNode({
  name: 'MyObject',
  directives: [Directive],
  fields: [FieldDefinition],
  interfaces: ['MyInterface'],
})

const InterfaceTypeExtension = Ast.interfaceTypeExtensionNode({
  name: 'MyInterface',
  directives: [Directive],
  fields: [FieldDefinition],
})

const UnionTypeExtension = Ast.unionTypeExtensionNode({
  name: 'MyUnion',
  directives: [Directive],
  types: [NamedType],
})

const EnumTypeExtension = Ast.enumTypeExtensionNode({
  name: 'MyEnum',
  directives: [Directive],
  values: [EnumValueDefinition],
})

const InputObjectTypeExtension = Ast.inputObjectTypeExtensionNode({
  name: 'MyInput',
  directives: [Directive],
  fields: [InputValueDefinition],
})


export const nodes: {[K in KindEnum]: ASTKindToNode[K]} = {
  // Name
  Name,
  // Document
  Document,
  OperationDefinition,
  VariableDefinition,
  Variable,
  SelectionSet,
  Field,
  Argument,
  FragmentSpread,
  InlineFragment,
  FragmentDefinition,
  // Values
  IntValue,
  FloatValue,
  StringValue,
  BooleanValue,
  NullValue,
  EnumValue,
  ListValue,
  ObjectValue,
  ObjectField,
  // Directives
  Directive,
  // Types
  NamedType,
  ListType,
  NonNullType,
  // Type System Definitions
  SchemaDefinition,
  OperationTypeDefinition,
  EnumValueDefinition,
  FieldDefinition,
  InputValueDefinition,
  // Type Definitions
  ScalarTypeDefinition,
  ObjectTypeDefinition,
  InterfaceTypeDefinition,
  UnionTypeDefinition,
  EnumTypeDefinition,
  InputObjectTypeDefinition,
  // Directive Definitions
  DirectiveDefinition,
  // Type System Extensions
  SchemaExtension,
  // Type Extensions
  ScalarTypeExtension,
  ObjectTypeExtension,
  InterfaceTypeExtension,
  UnionTypeExtension,
  EnumTypeExtension,
  InputObjectTypeExtension,
}
