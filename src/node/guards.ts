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

/** Name guard */
export function isNameNode(node: ASTNode): node is NameNode {
  return node.kind === Kind.NAME
}

//
// ─── DOCUMENT ───────────────────────────────────────────────────────────────────
//

/** Document guard */
export function isDocumentNode(node: ASTNode): node is DocumentNode {
  return node.kind === Kind.DOCUMENT
}

/** OperationDefinition guard */
export function isOperationDefinitionNode(node: ASTNode): node is OperationDefinitionNode {
  return node.kind === Kind.OPERATION_DEFINITION
}

/** VariableDefinition guard */
export function isVariableDefinitionNode(node: ASTNode): node is VariableDefinitionNode {
  return node.kind === Kind.VARIABLE_DEFINITION
}

/** SelectionSet guard */
export function isSelectionSetNode(node: ASTNode): node is SelectionSetNode {
  return node.kind === Kind.SELECTION_SET
}

/** Field guard */
export function isFieldNode(node: ASTNode): node is FieldNode {
  return node.kind === Kind.FIELD
}

/** Argument guard */
export function isArgumentNode(node: ASTNode): node is ArgumentNode {
  return node.kind === Kind.ARGUMENT
}

//
// ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
//

/** FragmentSpread guard */
export function isFragmentSpreadNode(node: ASTNode): node is FragmentSpreadNode {
  return node.kind === Kind.FRAGMENT_SPREAD
}

/** InlineFragment guard */
export function isInlineFragmentNode(node: ASTNode): node is InlineFragmentNode {
  return node.kind === Kind.INLINE_FRAGMENT
}

/** FragmentDefinition guard */
export function isFragmentDefinitionNode(node: ASTNode): node is FragmentDefinitionNode {
  return node.kind === Kind.FRAGMENT_DEFINITION
}

//
// ─── VALUES ─────────────────────────────────────────────────────────────────────
//

/** Variable guard */
export function isVariableNode(node: ASTNode): node is VariableNode {
  return node.kind === Kind.VARIABLE
}

/** IntValue guard */
export function isIntValueNode(node: ASTNode): node is IntValueNode {
  return node.kind === Kind.INT
}

/** FloatValue guard */
export function isFloatValueNode(node: ASTNode): node is FloatValueNode {
  return node.kind === Kind.FLOAT
}

/** StringValue guard */
export function isStringValueNode(node: ASTNode): node is StringValueNode {
  return node.kind === Kind.STRING
}

/** BooleanValue guard */
export function isBooleanValueNode(node: ASTNode): node is BooleanValueNode {
  return node.kind === Kind.BOOLEAN
}

/** NullValue guard */
export function isNullValueNode(node: ASTNode): node is NullValueNode {
  return node.kind === Kind.NULL
}

/** EnumValue guard */
export function iEnumValueNode(node: ASTNode): node is EnumValueNode {
  return node.kind === Kind.ENUM
}

/** ListValue guard */
export function isListValueNode(node: ASTNode): node is ListValueNode {
  return node.kind === Kind.LIST
}

/** ObjectValue guard */
export function isObjectValueNode(node: ASTNode): node is ObjectValueNode {
  return node.kind === Kind.OBJECT
}

/** ObjectField guard */
export function isObjectFieldNode(node: ASTNode): node is ObjectFieldNode {
  return node.kind === Kind.OBJECT_FIELD
}

//
// ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
//

/** Directive guard */
export function isDirectiveNode(node: ASTNode): node is DirectiveNode {
  return node.kind === Kind.DIRECTIVE
}

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

/** NamedType guard */
export function isNamedTypeNode(node: ASTNode): node is NamedTypeNode {
  return node.kind === Kind.NAMED_TYPE
}

/** ListType guard */
export function isListTypeNode(node: ASTNode): node is ListTypeNode {
  return node.kind === Kind.LIST_TYPE
}

/** NonNullType guard */
export function isNonNullTypeNode(node: ASTNode): node is NonNullTypeNode {
  return node.kind === Kind.NON_NULL_TYPE
}

//
// ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
//

/** SchemaDefinition guard */
export function isSchemaDefinitionNode(node: ASTNode): node is SchemaDefinitionNode {
  return node.kind === Kind.SCHEMA_DEFINITION
}

/** OperationTypeDefinition guard */
export function isOperationTypeDefinitionNode(node: ASTNode): node is OperationTypeDefinitionNode {
  return node.kind === Kind.OPERATION_TYPE_DEFINITION
}

//
// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────────
//

/** ScalarTypeDefinition guard */
export function isScalarTypeDefinitionNode(node: ASTNode): node is ScalarTypeDefinitionNode {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION
}

/** ObjectTypeDefinition guard */
export function isObjectTypeDefinitionNode(node: ASTNode): node is ObjectTypeDefinitionNode {
  return node.kind === Kind.OBJECT_TYPE_DEFINITION
}

/** FieldDefinition guard */
export function isFieldDefinitionNode(node: ASTNode): node is FieldDefinitionNode {
  return node.kind === Kind.FIELD_DEFINITION
}

/** InputValueDefinition guard */
export function isInputValueDefinitionNode(node: ASTNode): node is InputValueDefinitionNode {
  return node.kind === Kind.INPUT_VALUE_DEFINITION
}

/** InterfaceTypeDefinition guard */
export function isInterfaceTypeDefinitionNode(node: ASTNode): node is InterfaceTypeDefinitionNode {
  return node.kind === Kind.INTERFACE_TYPE_DEFINITION
}

/** UnionTypeDefinition guard */
export function isUnionTypeDefinitionNode(node: ASTNode): node is UnionTypeDefinitionNode {
  return node.kind === Kind.UNION_TYPE_DEFINITION
}

/** EnumTypeDefinition guard */
export function isEnumTypeDefinitionNode(node: ASTNode): node is EnumTypeDefinitionNode {
  return node.kind === Kind.ENUM_TYPE_DEFINITION
}

/** EnumValueDefinition guard */
export function isEnumValueDefinitionNode(node: ASTNode): node is EnumValueDefinitionNode {
  return node.kind === Kind.ENUM_VALUE_DEFINITION
}

/** InputObjectTypeDefinition guard */
export function isInputObjectTypeDefinitionNode(
  node: ASTNode,
): node is InputObjectTypeDefinitionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
}

//
// ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
//

/** DirectiveDefinition guard */
export function isDirectiveDefinitionNode(node: ASTNode): node is DirectiveDefinitionNode {
  return node.kind === Kind.DIRECTIVE_DEFINITION
}

//
// ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
//

/** SchemaExtension guard */
export function isSchemaExtensionNode(node: ASTNode): node is SchemaExtensionNode {
  return node.kind === Kind.SCHEMA_EXTENSION
}

//
// ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
//

/** ScalarTypeExtension guard */
export function isScalarTypeExtensionNode(node: ASTNode): node is ScalarTypeExtensionNode {
  return node.kind === Kind.SCALAR_TYPE_EXTENSION
}

/** ObjectTypeExtension guard */
export function isObjectTypeExtensionNode(node: ASTNode): node is ObjectTypeExtensionNode {
  return node.kind === Kind.OBJECT_TYPE_EXTENSION
}

/** InterfaceTypeExtension guard */
export function isInterfaceTypeExtensionNode(node: ASTNode): node is InterfaceTypeExtensionNode {
  return node.kind === Kind.INTERFACE_TYPE_EXTENSION
}

/** UnionTypeExtension guard */
export function isUnionTypeExtensionNode(node: ASTNode): node is UnionTypeExtensionNode {
  return node.kind === Kind.UNION_TYPE_EXTENSION
}

/** EnumTypeExtension guard */
export function isEnumTypeExtensionNode(node: ASTNode): node is EnumTypeExtensionNode {
  return node.kind === Kind.ENUM_TYPE_EXTENSION
}

/** InputObjectTypeExtension guard */
export function isInputObjectTypeExtensionNode(
  node: ASTNode,
): node is InputObjectTypeExtensionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_EXTENSION
}
