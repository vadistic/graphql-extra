import {
  ArgumentNode,
  ASTNode,
  BooleanValueNode,
  DirectiveDefinitionNode,
  DirectiveNode,
  DocumentNode,
  EnumTypeDefinitionNode,
  EnumTypeExtensionNode,
  EnumValueDefinitionNode,
  EnumValueNode,
  FieldDefinitionNode,
  FieldNode,
  FloatValueNode,
  FragmentDefinitionNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  InterfaceTypeExtensionNode,
  IntValueNode,
  Kind,
  ListTypeNode,
  ListValueNode,
  NamedTypeNode,
  NameNode,
  NonNullTypeNode,
  NullValueNode,
  ObjectFieldNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
  ObjectValueNode,
  OperationDefinitionNode,
  OperationTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  ScalarTypeExtensionNode,
  SchemaDefinitionNode,
  SchemaExtensionNode,
  SelectionSetNode,
  StringValueNode,
  UnionTypeDefinitionNode,
  UnionTypeExtensionNode,
  VariableDefinitionNode,
  VariableNode,
} from 'graphql'

//
// ─── NAME ───────────────────────────────────────────────────────────────────────
//

/**
 * `NameNode` guard
 *
 * @category AST Guard
 */
export function isNameNode(node: ASTNode): node is NameNode {
  return node.kind === Kind.NAME
}

//
// ─── DOCUMENT ───────────────────────────────────────────────────────────────────
//

/**
 * `DocumentNode` guard
 *
 * @category AST Guard
 */
export function isDocumentNode(node: ASTNode): node is DocumentNode {
  return node.kind === Kind.DOCUMENT
}

/**
 * `OperationDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isOperationDefinitionNode(node: ASTNode): node is OperationDefinitionNode {
  return node.kind === Kind.OPERATION_DEFINITION
}

/**
 * `VariableDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isVariableDefinitionNode(node: ASTNode): node is VariableDefinitionNode {
  return node.kind === Kind.VARIABLE_DEFINITION
}

/**
 * `SelectionSetNode` guard
 *
 * @category AST Guard
 */
export function isSelectionSetNode(node: ASTNode): node is SelectionSetNode {
  return node.kind === Kind.SELECTION_SET
}

/**
 * `FieldNode` guard
 *
 * @category AST Guard
 */
export function isFieldNode(node: ASTNode): node is FieldNode {
  return node.kind === Kind.FIELD
}

/**
 * `ArgumentNode` guard
 *
 * @category AST Guard
 */
export function isArgumentNode(node: ASTNode): node is ArgumentNode {
  return node.kind === Kind.ARGUMENT
}

//
// ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
//

/**
 * `FragmentSpreadNode` guard
 *
 * @category AST Guard
 */
export function isFragmentSpreadNode(node: ASTNode): node is FragmentSpreadNode {
  return node.kind === Kind.FRAGMENT_SPREAD
}

/**
 * `InlineFragmentNode` guard
 *
 * @category AST Guard
 */
export function isInlineFragmentNode(node: ASTNode): node is InlineFragmentNode {
  return node.kind === Kind.INLINE_FRAGMENT
}

/**
 * `FragmentDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isFragmentDefinitionNode(node: ASTNode): node is FragmentDefinitionNode {
  return node.kind === Kind.FRAGMENT_DEFINITION
}

//
// ─── VALUES ─────────────────────────────────────────────────────────────────────
//

/**
 * `VariableNode` guard
 *
 * @category AST Guard
 */
export function isVariableNode(node: ASTNode): node is VariableNode {
  return node.kind === Kind.VARIABLE
}

/**
 * `IntValueNode` guard
 *
 * @category AST Guard
 */
export function isIntValueNode(node: ASTNode): node is IntValueNode {
  return node.kind === Kind.INT
}

/**
 * `FloatValueNode` guard
 *
 * @category AST Guard
 */
export function isFloatValueNode(node: ASTNode): node is FloatValueNode {
  return node.kind === Kind.FLOAT
}

/**
 * `StringValueNode` guard
 *
 * @category AST Guard
 */
export function isStringValueNode(node: ASTNode): node is StringValueNode {
  return node.kind === Kind.STRING
}

/**
 * `BooleanValueNode` guard
 *
 * @category AST Guard
 */
export function isBooleanValueNode(node: ASTNode): node is BooleanValueNode {
  return node.kind === Kind.BOOLEAN
}

/**
 * `NullValueNode` guard
 *
 * @category AST Guard
 */
export function isNullValueNode(node: ASTNode): node is NullValueNode {
  return node.kind === Kind.NULL
}

/**
 * `EnumValueNode` guard
 *
 * @category AST Guard
 */
export function iEnumValueNode(node: ASTNode): node is EnumValueNode {
  return node.kind === Kind.ENUM
}

/**
 * `ListValueNode` guard
 *
 * @category AST Guard
 */
export function isListValueNode(node: ASTNode): node is ListValueNode {
  return node.kind === Kind.LIST
}

/**
 * `ObjectValueNode` guard
 *
 * @category AST Guard
 */
export function isObjectValueNode(node: ASTNode): node is ObjectValueNode {
  return node.kind === Kind.OBJECT
}

/**
 * `ObjectFieldNode` guard
 *
 * @category AST Guard
 */
export function isObjectFieldNode(node: ASTNode): node is ObjectFieldNode {
  return node.kind === Kind.OBJECT_FIELD
}

//
// ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
//

/**
 * `DirectiveNode` guard
 *
 * @category AST Guard
 */
export function isDirectiveNode(node: ASTNode): node is DirectiveNode {
  return node.kind === Kind.DIRECTIVE
}

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

/**
 * `NamedTypeNode` guard
 *
 * @category AST Guard
 */
export function isNamedTypeNode(node: ASTNode): node is NamedTypeNode {
  return node.kind === Kind.NAMED_TYPE
}

/**
 * `ListTypeNode` guard
 *
 * @category AST Guard
 */
export function isListTypeNode(node: ASTNode): node is ListTypeNode {
  return node.kind === Kind.LIST_TYPE
}

/**
 * `NonNullTypeNode` guard
 *
 * @category AST Guard
 */
export function isNonNullTypeNode(node: ASTNode): node is NonNullTypeNode {
  return node.kind === Kind.NON_NULL_TYPE
}

//
// ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
//

/**
 * `SchemaDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isSchemaDefinitionNode(node: ASTNode): node is SchemaDefinitionNode {
  return node.kind === Kind.SCHEMA_DEFINITION
}

/**
 * `OperationTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isOperationTypeDefinitionNode(node: ASTNode): node is OperationTypeDefinitionNode {
  return node.kind === Kind.OPERATION_TYPE_DEFINITION
}

//
// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isScalarTypeDefinitionNode(node: ASTNode): node is ScalarTypeDefinitionNode {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION
}

/**
 * `ObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isObjectTypeDefinitionNode(node: ASTNode): node is ObjectTypeDefinitionNode {
  return node.kind === Kind.OBJECT_TYPE_DEFINITION
}

/**
 * `FieldDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isFieldDefinitionNode(node: ASTNode): node is FieldDefinitionNode {
  return node.kind === Kind.FIELD_DEFINITION
}

/**
 * `InputValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInputValueDefinitionNode(node: ASTNode): node is InputValueDefinitionNode {
  return node.kind === Kind.INPUT_VALUE_DEFINITION
}

/**
 * `InterfaceTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInterfaceTypeDefinitionNode(node: ASTNode): node is InterfaceTypeDefinitionNode {
  return node.kind === Kind.INTERFACE_TYPE_DEFINITION
}

/**
 * `UnionTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isUnionTypeDefinitionNode(node: ASTNode): node is UnionTypeDefinitionNode {
  return node.kind === Kind.UNION_TYPE_DEFINITION
}

/**
 * `EnumTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isEnumTypeDefinitionNode(node: ASTNode): node is EnumTypeDefinitionNode {
  return node.kind === Kind.ENUM_TYPE_DEFINITION
}

/**
 * `EnumValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isEnumValueDefinitionNode(node: ASTNode): node is EnumValueDefinitionNode {
  return node.kind === Kind.ENUM_VALUE_DEFINITION
}

/**
 * `InputObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInputObjectTypeDefinitionNode(
  node: ASTNode,
): node is InputObjectTypeDefinitionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
}

//
// ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
//

/**
 * `DirectiveDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isDirectiveDefinitionNode(node: ASTNode): node is DirectiveDefinitionNode {
  return node.kind === Kind.DIRECTIVE_DEFINITION
}

//
// ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
//

/**
 * `SchemaExtensionNode` guard
 *
 * @category AST Guard
 */
export function isSchemaExtensionNode(node: ASTNode): node is SchemaExtensionNode {
  return node.kind === Kind.SCHEMA_EXTENSION
}

//
// ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isScalarTypeExtensionNode(node: ASTNode): node is ScalarTypeExtensionNode {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION
}

/**
 * `ObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isObjectTypeExtensionNode(node: ASTNode): node is ObjectTypeExtensionNode {
  return node.kind === Kind.OBJECT_TYPE_EXTENSION
}

/**
 * `InterfaceTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isInterfaceTypeExtensionNode(node: ASTNode): node is InterfaceTypeExtensionNode {
  return node.kind === Kind.INTERFACE_TYPE_EXTENSION
}

/**
 * `UnionTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isUnionTypeExtensionNode(node: ASTNode): node is UnionTypeExtensionNode {
  return node.kind === Kind.UNION_TYPE_EXTENSION
}

/**
 * `EnumTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isEnumTypeExtensionNode(node: ASTNode): node is EnumTypeExtensionNode {
  return node.kind === Kind.ENUM_TYPE_EXTENSION
}

/**
 * `InputObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isInputObjectTypeExtensionNode(
  node: ASTNode,
): node is InputObjectTypeExtensionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
}
