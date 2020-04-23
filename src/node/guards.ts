import type * as GQL from 'graphql'
import { Kind } from 'graphql'

//
// ─── NAME ───────────────────────────────────────────────────────────────────────
//

/**
 * `NameNode` guard
 *
 * @category AST Guard
 */
export function isNameNode(node: GQL.ASTNode): node is GQL.NameNode {
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
export function isDocumentNode(node: GQL.ASTNode): node is GQL.DocumentNode {
  return node.kind === Kind.DOCUMENT
}

/**
 * `OperationDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isOperationDefinitionNode(node: GQL.ASTNode): node is GQL.OperationDefinitionNode {
  return node.kind === Kind.OPERATION_DEFINITION
}

/**
 * `VariableDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isVariableDefinitionNode(node: GQL.ASTNode): node is GQL.VariableDefinitionNode {
  return node.kind === Kind.VARIABLE_DEFINITION
}

/**
 * `SelectionSetNode` guard
 *
 * @category AST Guard
 */
export function isSelectionSetNode(node: GQL.ASTNode): node is GQL.SelectionSetNode {
  return node.kind === Kind.SELECTION_SET
}

/**
 * `FieldNode` guard
 *
 * @category AST Guard
 */
export function isFieldNode(node: GQL.ASTNode): node is GQL.FieldNode {
  return node.kind === Kind.FIELD
}

/**
 * `ArgumentNode` guard
 *
 * @category AST Guard
 */
export function isArgumentNode(node: GQL.ASTNode): node is GQL.ArgumentNode {
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
export function isFragmentSpreadNode(node: GQL.ASTNode): node is GQL.FragmentSpreadNode {
  return node.kind === Kind.FRAGMENT_SPREAD
}

/**
 * `InlineFragmentNode` guard
 *
 * @category AST Guard
 */
export function isInlineFragmentNode(node: GQL.ASTNode): node is GQL.InlineFragmentNode {
  return node.kind === Kind.INLINE_FRAGMENT
}

/**
 * `FragmentDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isFragmentDefinitionNode(node: GQL.ASTNode): node is GQL.FragmentDefinitionNode {
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
export function isVariableNode(node: GQL.ASTNode): node is GQL.VariableNode {
  return node.kind === Kind.VARIABLE
}

/**
 * `IntValueNode` guard
 *
 * @category AST Guard
 */
export function isIntValueNode(node: GQL.ASTNode): node is GQL.IntValueNode {
  return node.kind === Kind.INT
}

/**
 * `FloatValueNode` guard
 *
 * @category AST Guard
 */
export function isFloatValueNode(node: GQL.ASTNode): node is GQL.FloatValueNode {
  return node.kind === Kind.FLOAT
}

/**
 * `StringValueNode` guard
 *
 * @category AST Guard
 */
export function isStringValueNode(node: GQL.ASTNode): node is GQL.StringValueNode {
  return node.kind === Kind.STRING
}

/**
 * `BooleanValueNode` guard
 *
 * @category AST Guard
 */
export function isBooleanValueNode(node: GQL.ASTNode): node is GQL.BooleanValueNode {
  return node.kind === Kind.BOOLEAN
}

/**
 * `NullValueNode` guard
 *
 * @category AST Guard
 */
export function isNullValueNode(node: GQL.ASTNode): node is GQL.NullValueNode {
  return node.kind === Kind.NULL
}

/**
 * `EnumValueNode` guard
 *
 * @category AST Guard
 */
export function iEnumValueNode(node: GQL.ASTNode): node is GQL.EnumValueNode {
  return node.kind === Kind.ENUM
}

/**
 * `ListValueNode` guard
 *
 * @category AST Guard
 */
export function isListValueNode(node: GQL.ASTNode): node is GQL.ListValueNode {
  return node.kind === Kind.LIST
}

/**
 * `ObjectValueNode` guard
 *
 * @category AST Guard
 */
export function isObjectValueNode(node: GQL.ASTNode): node is GQL.ObjectValueNode {
  return node.kind === Kind.OBJECT
}

/**
 * `ObjectFieldNode` guard
 *
 * @category AST Guard
 */
export function isObjectFieldNode(node: GQL.ASTNode): node is GQL.ObjectFieldNode {
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
export function isDirectiveNode(node: GQL.ASTNode): node is GQL.DirectiveNode {
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
export function isNamedTypeNode(node: GQL.ASTNode): node is GQL.NamedTypeNode {
  return node.kind === Kind.NAMED_TYPE
}

/**
 * `ListTypeNode` guard
 *
 * @category AST Guard
 */
export function isListTypeNode(node: GQL.ASTNode): node is GQL.ListTypeNode {
  return node.kind === Kind.LIST_TYPE
}

/**
 * `NonNullTypeNode` guard
 *
 * @category AST Guard
 */
export function isNonNullTypeNode(node: GQL.ASTNode): node is GQL.NonNullTypeNode {
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
export function isSchemaDefinitionNode(node: GQL.ASTNode): node is GQL.SchemaDefinitionNode {
  return node.kind === Kind.SCHEMA_DEFINITION
}

/**
 * `OperationTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isOperationTypeDefinitionNode(node: GQL.ASTNode): node is GQL.OperationTypeDefinitionNode {
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
export function isScalarTypeDefinitionNode(node: GQL.ASTNode): node is GQL.ScalarTypeDefinitionNode {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION
}

/**
 * `ObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isObjectTypeDefinitionNode(node: GQL.ASTNode): node is GQL.ObjectTypeDefinitionNode {
  return node.kind === Kind.OBJECT_TYPE_DEFINITION
}

/**
 * `FieldDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isFieldDefinitionNode(node: GQL.ASTNode): node is GQL.FieldDefinitionNode {
  return node.kind === Kind.FIELD_DEFINITION
}

/**
 * `InputValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInputValueDefinitionNode(node: GQL.ASTNode): node is GQL.InputValueDefinitionNode {
  return node.kind === Kind.INPUT_VALUE_DEFINITION
}

/**
 * `InterfaceTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInterfaceTypeDefinitionNode(node: GQL.ASTNode): node is GQL.InterfaceTypeDefinitionNode {
  return node.kind === Kind.INTERFACE_TYPE_DEFINITION
}

/**
 * `UnionTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isUnionTypeDefinitionNode(node: GQL.ASTNode): node is GQL.UnionTypeDefinitionNode {
  return node.kind === Kind.UNION_TYPE_DEFINITION
}

/**
 * `EnumTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isEnumTypeDefinitionNode(node: GQL.ASTNode): node is GQL.EnumTypeDefinitionNode {
  return node.kind === Kind.ENUM_TYPE_DEFINITION
}

/**
 * `EnumValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isEnumValueDefinitionNode(node: GQL.ASTNode): node is GQL.EnumValueDefinitionNode {
  return node.kind === Kind.ENUM_VALUE_DEFINITION
}

/**
 * `InputObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export function isInputObjectTypeDefinitionNode(
  node: GQL.ASTNode,
): node is GQL.InputObjectTypeDefinitionNode {
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
export function isDirectiveDefinitionNode(node: GQL.ASTNode): node is GQL.DirectiveDefinitionNode {
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
export function isSchemaExtensionNode(node: GQL.ASTNode): node is GQL.SchemaExtensionNode {
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
export function isScalarTypeExtensionNode(node: GQL.ASTNode): node is GQL.ScalarTypeExtensionNode {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION
}

/**
 * `ObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isObjectTypeExtensionNode(node: GQL.ASTNode): node is GQL.ObjectTypeExtensionNode {
  return node.kind === Kind.OBJECT_TYPE_EXTENSION
}

/**
 * `InterfaceTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isInterfaceTypeExtensionNode(node: GQL.ASTNode): node is GQL.InterfaceTypeExtensionNode {
  return node.kind === Kind.INTERFACE_TYPE_EXTENSION
}

/**
 * `UnionTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isUnionTypeExtensionNode(node: GQL.ASTNode): node is GQL.UnionTypeExtensionNode {
  return node.kind === Kind.UNION_TYPE_EXTENSION
}

/**
 * `EnumTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isEnumTypeExtensionNode(node: GQL.ASTNode): node is GQL.EnumTypeExtensionNode {
  return node.kind === Kind.ENUM_TYPE_EXTENSION
}

/**
 * `InputObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export function isInputObjectTypeExtensionNode(
  node: GQL.ASTNode,
): node is GQL.InputObjectTypeExtensionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
}
