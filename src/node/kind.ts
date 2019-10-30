import { Kind, KindEnum } from 'graphql'
import * as AST from './ast'

/**
 * @category Helper
 */
export interface AstKindToFunction {
  // NAME
  Name: typeof AST.nameNode

  // DOCUMENT
  Document: typeof AST.documentNode
  OperationDefinition: typeof AST.operationDefinitionNode
  VariableDefinition: typeof AST.variableDefinitionNode
  SelectionSet: typeof AST.selectionSetNode
  Field: typeof AST.fieldNode
  Argument: typeof AST.argumentNode

  // FRAGMENTS
  FragmentSpread: typeof AST.fragmentSpreadNode
  InlineFragment: typeof AST.inlineFragmentNode
  FragmentDefinition: typeof AST.fragmentDefinitionNode

  // VALUES
  Variable: typeof AST.variableNode
  IntValue: typeof AST.intValueNode
  FloatValue: typeof AST.floatValueNode
  StringValue: typeof AST.stringValueNode
  BooleanValue: typeof AST.booleanValueNode
  NullValue: typeof AST.nullValueNode
  EnumValue: typeof AST.enumValueNode
  ListValue: typeof AST.listValueNode
  ObjectValue: typeof AST.objectValueNode
  ObjectField: typeof AST.objectFieldNode

  // DIRECTIVES
  Directive: typeof AST.directiveNode

  // TYPES
  NamedType: typeof AST.namedTypeNode
  ListType: typeof AST.listTypeNode
  NonNullType: typeof AST.nonNullTypeNode

  // TYPE SYSTEM DEFINITIONS
  SchemaDefinition: typeof AST.schemaDefinitionNode
  OperationTypeDefinition: typeof AST.operationTypeDefinitionNode

  // TYPE DEFINITIONS
  ScalarTypeDefinition: typeof AST.scalarTypeDefinitionNode
  ObjectTypeDefinition: typeof AST.objectTypeDefinitionNode
  InterfaceTypeDefinition: typeof AST.interfaceTypeDefinitionNode
  UnionTypeDefinition: typeof AST.unionTypeDefinitionNode
  EnumValueDefinition: typeof AST.enumValueDefinitionNode
  InputObjectTypeDefinition: typeof AST.inputObjectTypeDefinitionNode

  // TYPE FIELD DEFINITIONS
  FieldDefinition: typeof AST.fieldDefinitionNode
  InputValueDefinition: typeof AST.inputValueDefinitionNode
  EnumTypeDefinition: typeof AST.enumTypeDefinitionNode

  // DIRECTIVE DEFINITIONS
  DirectiveDefinition: typeof AST.directiveDefinitionNode

  // TYPE SYSTEM EXTENSIONS
  SchemaExtension: typeof AST.schemaExtensionNode

  // TYPE EXTENSIONS
  ScalarTypeExtension: typeof AST.scalarTypeExtensionNode
  ObjectTypeExtension: typeof AST.objectTypeExtensionNode
  InterfaceTypeExtension: typeof AST.interfaceTypeExtensionNode
  UnionTypeExtension: typeof AST.unionTypeExtensionNode
  EnumTypeExtension: typeof AST.enumTypeExtensionNode
  InputObjectTypeExtension: typeof AST.inputObjectTypeExtensionNode
}

/**
 * @category Helper
 */
export function astKindToFunction<K extends KindEnum>(kind: K): AstKindToFunction[K] {
  switch (kind) {
    // NAME

    case Kind.NAME:
      return AST.nameNode as AstKindToFunction[K]

    // DOCUMENT

    case Kind.DOCUMENT:
      return AST.documentNode as AstKindToFunction[K]

    case Kind.OPERATION_DEFINITION:
      return AST.operationDefinitionNode as AstKindToFunction[K]

    case Kind.VARIABLE_DEFINITION:
      return AST.variableDefinitionNode as AstKindToFunction[K]

    case Kind.SELECTION_SET:
      return AST.selectionSetNode as AstKindToFunction[K]

    case Kind.FIELD:
      return AST.fieldNode as AstKindToFunction[K]

    case Kind.ARGUMENT:
      return AST.argumentNode as AstKindToFunction[K]

    // FRAGMENTS

    case Kind.FRAGMENT_SPREAD:
      return AST.fragmentSpreadNode as AstKindToFunction[K]

    case Kind.INLINE_FRAGMENT:
      return AST.inlineFragmentNode as AstKindToFunction[K]

    case Kind.FRAGMENT_DEFINITION:
      return AST.fragmentDefinitionNode as AstKindToFunction[K]

    // VALUES

    case Kind.VARIABLE:
      return AST.variableNode as AstKindToFunction[K]

    case Kind.INT:
      return AST.intValueNode as AstKindToFunction[K]

    case Kind.FLOAT:
      return AST.floatValueNode as AstKindToFunction[K]

    case Kind.STRING:
      return AST.stringValueNode as AstKindToFunction[K]

    case Kind.BOOLEAN:
      return AST.booleanValueNode as AstKindToFunction[K]

    case Kind.NULL:
      return AST.nullValueNode as AstKindToFunction[K]

    case Kind.ENUM:
      return AST.enumValueNode as AstKindToFunction[K]

    case Kind.LIST:
      return AST.listValueNode as AstKindToFunction[K]

    case Kind.OBJECT:
      return AST.objectValueNode as AstKindToFunction[K]

    case Kind.OBJECT_FIELD:
      return AST.objectFieldNode as AstKindToFunction[K]

    // DIRECTIVES

    case Kind.DIRECTIVE:
      return AST.directiveNode as AstKindToFunction[K]

    // TYPES

    case Kind.NAMED_TYPE:
      return AST.namedTypeNode as AstKindToFunction[K]

    case Kind.LIST_TYPE:
      return AST.listTypeNode as AstKindToFunction[K]

    case Kind.NON_NULL_TYPE:
      return AST.nonNullTypeNode as AstKindToFunction[K]

    // TYPE SYSTEM DEFINITIONS

    case Kind.SCHEMA_DEFINITION:
      return AST.schemaDefinitionNode as AstKindToFunction[K]

    case Kind.OPERATION_TYPE_DEFINITION:
      return AST.operationTypeDefinitionNode as AstKindToFunction[K]

    // TYPE DEFINITIONS

    case Kind.SCALAR_TYPE_DEFINITION:
      return AST.scalarTypeDefinitionNode as AstKindToFunction[K]

    case Kind.OBJECT_TYPE_DEFINITION:
      return AST.objectTypeDefinitionNode as AstKindToFunction[K]

    case Kind.INTERFACE_TYPE_DEFINITION:
      return AST.interfaceTypeDefinitionNode as AstKindToFunction[K]

    case Kind.UNION_TYPE_DEFINITION:
      return AST.unionTypeDefinitionNode as AstKindToFunction[K]

    case Kind.ENUM_TYPE_DEFINITION:
      return AST.enumTypeDefinitionNode as AstKindToFunction[K]

    case Kind.INPUT_OBJECT_TYPE_DEFINITION:
      return AST.inputObjectTypeDefinitionNode as AstKindToFunction[K]

    // TYPE FIELD DEFINITIONS

    case Kind.FIELD_DEFINITION:
      return AST.fieldDefinitionNode as AstKindToFunction[K]

    case Kind.INPUT_VALUE_DEFINITION:
      return AST.inputValueDefinitionNode as AstKindToFunction[K]

    case Kind.ENUM_VALUE_DEFINITION:
      return AST.enumValueDefinitionNode as AstKindToFunction[K]

    // DIRECTIVE DEFINITIONS

    case Kind.DIRECTIVE_DEFINITION:
      return AST.directiveDefinitionNode as AstKindToFunction[K]

    // TYPE SYSTEM EXTENSIONS

    case Kind.SCHEMA_EXTENSION:
      return AST.schemaExtensionNode as AstKindToFunction[K]

    // TYPE EXTENSIONS

    case Kind.SCALAR_TYPE_EXTENSION:
      return AST.scalarTypeExtensionNode as AstKindToFunction[K]

    case Kind.OBJECT_TYPE_EXTENSION:
      return AST.objectTypeExtensionNode as AstKindToFunction[K]

    case Kind.INTERFACE_TYPE_EXTENSION:
      return AST.interfaceTypeExtensionNode as AstKindToFunction[K]

    case Kind.UNION_TYPE_EXTENSION:
      return AST.unionTypeExtensionNode as AstKindToFunction[K]

    case Kind.ENUM_TYPE_EXTENSION:
      return AST.enumTypeExtensionNode as AstKindToFunction[K]

    case Kind.INPUT_OBJECT_TYPE_EXTENSION:
      return AST.inputObjectTypeExtensionNode as AstKindToFunction[K]

    default:
      throw Error(`invalid node kind: ${kind}'`)
  }
}
