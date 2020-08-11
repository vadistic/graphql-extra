import type * as GQL from 'graphql';
/**
 * `NameNode` guard
 *
 * @category AST Guard
 */
export declare function isNameNode(node: GQL.ASTNode): node is GQL.NameNode;
/**
 * `DocumentNode` guard
 *
 * @category AST Guard
 */
export declare function isDocumentNode(node: GQL.ASTNode): node is GQL.DocumentNode;
/**
 * `OperationDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isOperationDefinitionNode(node: GQL.ASTNode): node is GQL.OperationDefinitionNode;
/**
 * `VariableDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isVariableDefinitionNode(node: GQL.ASTNode): node is GQL.VariableDefinitionNode;
/**
 * `SelectionSetNode` guard
 *
 * @category AST Guard
 */
export declare function isSelectionSetNode(node: GQL.ASTNode): node is GQL.SelectionSetNode;
/**
 * `FieldNode` guard
 *
 * @category AST Guard
 */
export declare function isFieldNode(node: GQL.ASTNode): node is GQL.FieldNode;
/**
 * `ArgumentNode` guard
 *
 * @category AST Guard
 */
export declare function isArgumentNode(node: GQL.ASTNode): node is GQL.ArgumentNode;
/**
 * `FragmentSpreadNode` guard
 *
 * @category AST Guard
 */
export declare function isFragmentSpreadNode(node: GQL.ASTNode): node is GQL.FragmentSpreadNode;
/**
 * `InlineFragmentNode` guard
 *
 * @category AST Guard
 */
export declare function isInlineFragmentNode(node: GQL.ASTNode): node is GQL.InlineFragmentNode;
/**
 * `FragmentDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isFragmentDefinitionNode(node: GQL.ASTNode): node is GQL.FragmentDefinitionNode;
/**
 * `VariableNode` guard
 *
 * @category AST Guard
 */
export declare function isVariableNode(node: GQL.ASTNode): node is GQL.VariableNode;
/**
 * `IntValueNode` guard
 *
 * @category AST Guard
 */
export declare function isIntValueNode(node: GQL.ASTNode): node is GQL.IntValueNode;
/**
 * `FloatValueNode` guard
 *
 * @category AST Guard
 */
export declare function isFloatValueNode(node: GQL.ASTNode): node is GQL.FloatValueNode;
/**
 * `StringValueNode` guard
 *
 * @category AST Guard
 */
export declare function isStringValueNode(node: GQL.ASTNode): node is GQL.StringValueNode;
/**
 * `BooleanValueNode` guard
 *
 * @category AST Guard
 */
export declare function isBooleanValueNode(node: GQL.ASTNode): node is GQL.BooleanValueNode;
/**
 * `NullValueNode` guard
 *
 * @category AST Guard
 */
export declare function isNullValueNode(node: GQL.ASTNode): node is GQL.NullValueNode;
/**
 * `EnumValueNode` guard
 *
 * @category AST Guard
 */
export declare function iEnumValueNode(node: GQL.ASTNode): node is GQL.EnumValueNode;
/**
 * `ListValueNode` guard
 *
 * @category AST Guard
 */
export declare function isListValueNode(node: GQL.ASTNode): node is GQL.ListValueNode;
/**
 * `ObjectValueNode` guard
 *
 * @category AST Guard
 */
export declare function isObjectValueNode(node: GQL.ASTNode): node is GQL.ObjectValueNode;
/**
 * `ObjectFieldNode` guard
 *
 * @category AST Guard
 */
export declare function isObjectFieldNode(node: GQL.ASTNode): node is GQL.ObjectFieldNode;
/**
 * `DirectiveNode` guard
 *
 * @category AST Guard
 */
export declare function isDirectiveNode(node: GQL.ASTNode): node is GQL.DirectiveNode;
/**
 * `NamedTypeNode` guard
 *
 * @category AST Guard
 */
export declare function isNamedTypeNode(node: GQL.ASTNode): node is GQL.NamedTypeNode;
/**
 * `ListTypeNode` guard
 *
 * @category AST Guard
 */
export declare function isListTypeNode(node: GQL.ASTNode): node is GQL.ListTypeNode;
/**
 * `NonNullTypeNode` guard
 *
 * @category AST Guard
 */
export declare function isNonNullTypeNode(node: GQL.ASTNode): node is GQL.NonNullTypeNode;
/**
 * `SchemaDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isSchemaDefinitionNode(node: GQL.ASTNode): node is GQL.SchemaDefinitionNode;
/**
 * `OperationTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isOperationTypeDefinitionNode(node: GQL.ASTNode): node is GQL.OperationTypeDefinitionNode;
/**
 * `ScalarTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isScalarTypeDefinitionNode(node: GQL.ASTNode): node is GQL.ScalarTypeDefinitionNode;
/**
 * `ObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isObjectTypeDefinitionNode(node: GQL.ASTNode): node is GQL.ObjectTypeDefinitionNode;
/**
 * `FieldDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isFieldDefinitionNode(node: GQL.ASTNode): node is GQL.FieldDefinitionNode;
/**
 * `InputValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isInputValueDefinitionNode(node: GQL.ASTNode): node is GQL.InputValueDefinitionNode;
/**
 * `InterfaceTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isInterfaceTypeDefinitionNode(node: GQL.ASTNode): node is GQL.InterfaceTypeDefinitionNode;
/**
 * `UnionTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isUnionTypeDefinitionNode(node: GQL.ASTNode): node is GQL.UnionTypeDefinitionNode;
/**
 * `EnumTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isEnumTypeDefinitionNode(node: GQL.ASTNode): node is GQL.EnumTypeDefinitionNode;
/**
 * `EnumValueDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isEnumValueDefinitionNode(node: GQL.ASTNode): node is GQL.EnumValueDefinitionNode;
/**
 * `InputObjectTypeDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isInputObjectTypeDefinitionNode(node: GQL.ASTNode): node is GQL.InputObjectTypeDefinitionNode;
/**
 * `DirectiveDefinitionNode` guard
 *
 * @category AST Guard
 */
export declare function isDirectiveDefinitionNode(node: GQL.ASTNode): node is GQL.DirectiveDefinitionNode;
/**
 * `SchemaExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isSchemaExtensionNode(node: GQL.ASTNode): node is GQL.SchemaExtensionNode;
/**
 * `ScalarTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isScalarTypeExtensionNode(node: GQL.ASTNode): node is GQL.ScalarTypeExtensionNode;
/**
 * `ObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isObjectTypeExtensionNode(node: GQL.ASTNode): node is GQL.ObjectTypeExtensionNode;
/**
 * `InterfaceTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isInterfaceTypeExtensionNode(node: GQL.ASTNode): node is GQL.InterfaceTypeExtensionNode;
/**
 * `UnionTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isUnionTypeExtensionNode(node: GQL.ASTNode): node is GQL.UnionTypeExtensionNode;
/**
 * `EnumTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isEnumTypeExtensionNode(node: GQL.ASTNode): node is GQL.EnumTypeExtensionNode;
/**
 * `InputObjectTypeExtensionNode` guard
 *
 * @category AST Guard
 */
export declare function isInputObjectTypeExtensionNode(node: GQL.ASTNode): node is GQL.InputObjectTypeExtensionNode;
