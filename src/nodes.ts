import {
  Kind,
  NameNode,
  NamedTypeNode,
  ListTypeNode,
  TypeNode,
  NonNullTypeNode,
  StringValueNode,
  DefinitionNode,
  DocumentNode,
  ASTNode,
  FieldNode,
  OperationDefinitionNode,
  FragmentDefinitionNode,
  VariableNode,
  SelectionSetNode,
  SelectionNode,
  ArgumentNode,
  DirectiveNode,
  VariableDefinitionNode,
  ValueNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  IntValueNode,
  FloatValueNode,
  BooleanValueNode,
  NullValueNode,
  EnumValueNode,
  ListValueNode,
  ObjectFieldNode,
  ObjectValueNode,
  OperationTypeDefinitionNode,
  SchemaDefinitionNode,
  OperationTypeNode,
  ScalarTypeDefinitionNode,
  FieldDefinitionNode,
  ObjectTypeDefinitionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  UnionTypeDefinitionNode,
  EnumTypeDefinitionNode,
  EnumValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  DirectiveLocationEnum,
  DirectiveDefinitionNode,
} from 'graphql'
import { nodeOrProps, nodeOrPropsArr } from './utils'

// graphql/language/ast.d.ts

// ────────────────────────────────────────────────────────────────────────────────

/**
 * NameNode
 */

export function nameNode(value: string): NameNode
export function nameNode(value?: string): NameNode | undefined

export function nameNode(value?: string): NameNode | undefined {
  if (!value) {
    return
  }

  return {
    kind: Kind.NAME,
    value,
  }
}

export const isNameNode = (node: ASTNode): node is NameNode => node.kind === Kind.NAME

// ────────────────────────────────────────────────────────────────────────────────

/**
 * DocumentNode
 */

export function documentNode(definitions: DefinitionNode[]): DocumentNode {
  return {
    kind: Kind.DOCUMENT,
    definitions,
  }
}

export function isDocumentNode(node: ASTNode): node is DocumentNode {
  return node.kind === Kind.DOCUMENT
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * OperationDefinitionNode
 */

export function operationDefinitionNode(): OperationDefinitionNode {
  return {} as any
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * VariableDefinitionNode
 */

export function variableDefinitionNode(): VariableDefinitionNode {
  return {} as any
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * VariableNode
 */

export function variableNode(name: string): VariableNode
export function variableNode(name?: string): VariableNode | undefined

export function variableNode(name?: string): VariableNode | undefined {
  if (!name) {
    return
  }

  return {
    kind: Kind.VARIABLE,
    name: nameNode(name),
  }
}

export function isVariableNode(node: ASTNode): node is VariableNode {
  return node.kind === Kind.VARIABLE
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * SelectionSetNode
 */

// ! allowing input as array of props does not make much sense here, since it's an union

export function selectionSetNode(selections: (SelectionNode)[]): SelectionSetNode
export function selectionSetNode(selections?: (SelectionNode)[]): SelectionSetNode | undefined

export function selectionSetNode(selections?: (SelectionNode)[]): SelectionSetNode | undefined {
  if (!selections) {
    return
  }

  return {
    kind: Kind.SELECTION_SET,
    selections,
  }
}

export function isSelectionSetNode(node: ASTNode): node is SelectionSetNode {
  return node.kind === Kind.SELECTION_SET
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FieldNode create input
 */

export interface FieldNodeProps {
  name: NameNode | string
  alias?: NameNode | string
  arguments?: (ArgumentNode | ArgumentNodeProps)[]
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  selections?: SelectionNode[]
}

/**
 * FieldNode
 */

export function fieldNode(props: FieldNodeProps): FieldNode
export function fieldNode(props?: FieldNodeProps): FieldNode | undefined

export function fieldNode(props?: FieldNodeProps | undefined): FieldNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.FIELD,
    name: nodeOrProps(nameNode, props.name),
    alias: nodeOrProps(nameNode, props.alias),
    arguments: nodeOrPropsArr(argumentNode, props.arguments),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    selectionSet: selectionSetNode(props.selections),
  }
}

export function isFieldNode(node: ASTNode): node is FieldNode {
  return node.kind === Kind.FIELD
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * ArgumentNode create input
 */

export interface ArgumentNodeProps {
  name: NameNode | string
  value: ValueNode
}

/**
 * ArgumentNode
 */
export function argumentNode(props: ArgumentNodeProps): ArgumentNode
export function argumentNode(props?: ArgumentNodeProps): ArgumentNode | undefined

export function argumentNode(props?: ArgumentNodeProps): ArgumentNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.ARGUMENT,
    name: nodeOrProps(nameNode, props.name),
    value: props.value,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FragmentSpreadNode create input
 */

export interface FragmentSpreadNodeProps {
  name: NameNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * FragmentSpreadNode
 */

export function fragmentSpreadNode(props: FragmentSpreadNodeProps): FragmentSpreadNode
export function fragmentSpreadNode(props?: FragmentSpreadNodeProps): FragmentSpreadNode | undefined

export function fragmentSpreadNode(
  props?: FragmentSpreadNodeProps,
): FragmentSpreadNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.FRAGMENT_SPREAD,
    name: nodeOrProps(nameNode, props.name),
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InlineFragmentNode create input
 */

export interface InlineFragmentNodeProps {
  name: NameNode | string
  typeCondition?: NamedTypeNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  selections: SelectionNode[]
}

/**
 * InlineFragmentNode
 */
export function inlineFragmentNode(props: InlineFragmentNodeProps): InlineFragmentNode
export function inlineFragmentNode(props?: InlineFragmentNodeProps): InlineFragmentNode | undefined

export function inlineFragmentNode(
  props?: InlineFragmentNodeProps,
): InlineFragmentNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: nodeOrProps(namedTypeNode, props.typeCondition),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    selectionSet: selectionSetNode(props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FragmentDefinitionNode create input
 */

export interface FragmentDefinitionNodeProps {
  name: NameNode | string
  variableDefinitions?: (VariableDefinitionNode)[]
  typeCondition: NamedTypeNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  selections: SelectionNode[]
}

/**
 * FragmentDefinitionNode
 */
export function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): FragmentDefinitionNode
export function fragmentDefinitionNode(
  props?: FragmentDefinitionNodeProps,
): FragmentDefinitionNode | undefined

export function fragmentDefinitionNode(
  props?: FragmentDefinitionNodeProps,
): FragmentDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.FRAGMENT_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    variableDefinitions: props.variableDefinitions,
    typeCondition: nodeOrProps(namedTypeNode, props.typeCondition),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    selectionSet: selectionSetNode(props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * IntValueNode
 */

export function intValueNode(value: string | number): IntValueNode
export function intValueNode(value?: string | number): IntValueNode | undefined

export function intValueNode(value?: string | number): IntValueNode | undefined {
  if (typeof value === 'undefined') {
    return
  }

  return {
    kind: Kind.INT,
    value: '' + value,
  }
}

/**
 * FloatValueNode
 */

export function floatValueNode(value: string | number): FloatValueNode
export function floatValueNode(value?: string | number): FloatValueNode | undefined

export function floatValueNode(value?: string | number): FloatValueNode | undefined {
  if (typeof value === 'undefined') {
    return
  }

  return {
    kind: Kind.FLOAT,
    value: '' + value,
  }
}

/**
 * StringValueNode
 */

export function stringValueNode(value: string): StringValueNode
export function stringValueNode(value?: string): StringValueNode | undefined

export function stringValueNode(value?: string): StringValueNode | undefined {
  if (typeof value === 'undefined') {
    return
  }

  return {
    kind: Kind.STRING,
    value,
  }
}

/**
 * BooleanValueNode
 */

export function booleanValueNode(value: boolean): BooleanValueNode
export function booleanValueNode(value?: boolean): BooleanValueNode | undefined

export function booleanValueNode(value?: boolean): BooleanValueNode | undefined {
  if (typeof value === 'undefined') {
    return
  }

  return {
    kind: Kind.BOOLEAN,
    value,
  }
}

/**
 * NullValueNode
 */

export function nullValueNode(): NullValueNode {
  return {
    kind: Kind.NULL,
  }
}

/**
 * EnumValueNode
 */

export function enumValueNode(value: string): EnumValueNode
export function enumValueNode(value?: string): EnumValueNode | undefined

export function enumValueNode(value?: string): EnumValueNode | undefined {
  if (typeof value === 'undefined') {
    return
  }

  return {
    kind: Kind.ENUM,
    value,
  }
}

/**
 * ListValueNode
 */

export function listValueNode(values: ValueNode[]): ListValueNode
export function listValueNode(values?: ValueNode[]): ListValueNode | undefined

export function listValueNode(values?: ValueNode[]): ListValueNode | undefined {
  if (!values) {
    return
  }

  return {
    kind: Kind.LIST,
    values,
  }
}

/**
 * ObjectValueNode
 */

export function objectValueNode(fields: ObjectFieldNode[]): ObjectValueNode
export function objectValueNode(fields?: ObjectFieldNode[]): ObjectValueNode | undefined

export function objectValueNode(fields?: ObjectFieldNode[]): ObjectValueNode | undefined {
  if (!fields) {
    return
  }

  return {
    kind: Kind.OBJECT,
    fields,
  }
}

/**
 * ObjectFieldNode
 */

export interface ObjectFieldNodeProps {
  name: NameNode | string
  value: ValueNode
}

export function objectFieldNode(props: ObjectFieldNodeProps): ObjectFieldNode
export function objectFieldNode(props?: ObjectFieldNodeProps): ObjectFieldNode | undefined

export function objectFieldNode(props?: ObjectFieldNodeProps): ObjectFieldNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.OBJECT_FIELD,
    name: nodeOrProps(nameNode, props.name),
    value: props.value,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * DirectiveNode create input
 */

export interface DirectiveNodeProps {
  name: NameNode | string
  arguments?: (ArgumentNode | ArgumentNodeProps)[]
}

/**
 * DirectiveNode
 */

export function directiveNode(props: DirectiveNodeProps): DirectiveNode
export function directiveNode(props?: DirectiveNodeProps): DirectiveNode | undefined

export function directiveNode(props?: DirectiveNodeProps): DirectiveNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.DIRECTIVE,
    name: nodeOrProps(nameNode, props.name),
    arguments: nodeOrPropsArr(argumentNode, props.arguments),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * NamedTypeNode
 */

export function namedTypeNode(name: string): NamedTypeNode
export function namedTypeNode(name?: string): NamedTypeNode | undefined

export function namedTypeNode(name?: string): NamedTypeNode | undefined {
  if (typeof name === 'undefined') {
    return
  }

  return {
    kind: Kind.NAMED_TYPE,
    name: nameNode(name),
  }
}

export function isNamedTypeNode(node: ASTNode): node is NamedTypeNode {
  return node.kind === Kind.NAMED_TYPE
}

/**
 * ListTypeNode
 */

export function listTypeNode(type: TypeNode): ListTypeNode
export function listTypeNode(type?: TypeNode): ListTypeNode | undefined

export function listTypeNode(type?: TypeNode): ListTypeNode | undefined {
  if (!type) {
    return
  }

  return {
    kind: Kind.LIST_TYPE,
    type,
  }
}

export function isListTypeNode(node: ASTNode): node is ListTypeNode {
  return node.kind === Kind.LIST_TYPE
}

/**
 * NonNullTypeNode
 */

export function nonNullTypeNode(type: NamedTypeNode | ListTypeNode): NonNullTypeNode
export function nonNullTypeNode(type?: NamedTypeNode | ListTypeNode): NonNullTypeNode | undefined

export function nonNullTypeNode(type?: NamedTypeNode | ListTypeNode): NonNullTypeNode | undefined {
  if (!type) {
    return
  }

  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  }
}

export function isNonNullTypeNode(node: ASTNode): node is NonNullTypeNode {
  return node.kind === Kind.NON_NULL_TYPE
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * SchemaDefinitionNode create input
 */

export interface SchemaDefinitionNodeProps {
  directives: (DirectiveNode | DirectiveNodeProps)[]
  operationTypes: (OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps)[]
}

/**
 * SchemaDefinitionNode
 */

export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): SchemaDefinitionNode
export function schemaDefinitionNode(
  props?: SchemaDefinitionNodeProps,
): SchemaDefinitionNode | undefined

export function schemaDefinitionNode(
  props?: SchemaDefinitionNodeProps,
): SchemaDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: nodeOrPropsArr(directiveNode, props.directives),
    operationTypes: nodeOrPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

export function isSchemaDefinitionNode(node: ASTNode): node is SchemaDefinitionNode {
  return node.kind === Kind.SCHEMA_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * OperationTypeDefinitionNode create input
 */

export interface OperationTypeDefinitionNodeProps {
  operation: OperationTypeNode
  type: NamedTypeNode | string
}

/**
 * OperationTypeDefinitionNode
 */

export function operationTypeDefinitionNode(
  props: OperationTypeDefinitionNodeProps,
): OperationTypeDefinitionNode
export function operationTypeDefinitionNode(
  props?: OperationTypeDefinitionNodeProps,
): OperationTypeDefinitionNode | undefined

export function operationTypeDefinitionNode(
  props?: OperationTypeDefinitionNodeProps,
): OperationTypeDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.OPERATION_TYPE_DEFINITION,
    operation: props.operation,
    type: nodeOrProps(namedTypeNode, props.type),
  }
}

export function isOperationTypeDefinitionNode(node: ASTNode): node is OperationTypeDefinitionNode {
  return node.kind === Kind.OPERATION_TYPE_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * ScalarTypeDefinitionNode create input
 */

export interface ScalarTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * ScalarTypeDefinitionNode
 */

export function scalarTypeDefinitionNode(
  props: ScalarTypeDefinitionNodeProps,
): ScalarTypeDefinitionNode {
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

export function isScalarTypeDefinitionNode(node: ASTNode): node is ScalarTypeDefinitionNode {
  return node.kind === Kind.SCALAR_TYPE_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * ObjectTypeDefinitionNode create input
 */

export interface ObjectTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  interfaces?: (NamedTypeNode | string)[]
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  fields?: (FieldDefinitionNode | FieldDefinitionNodeProps)[]
}

/**
 * ObjectTypeDefinitionNode
 */

export function objectTypeDefinitionNode(
  props: ObjectTypeDefinitionNodeProps,
): ObjectTypeDefinitionNode {
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    interfaces: nodeOrPropsArr(namedTypeNode, props.interfaces),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    fields: nodeOrPropsArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FieldDefinitionNode create input
 */

export interface FieldDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  arguments?: (InputValueDefinitionNode | InputValueDefinitionNodeProps)[]
  type: TypeNode
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * FieldDefinitionNode
 */

export function fieldDefinitionNode(props: FieldDefinitionNodeProps): FieldDefinitionNode
export function fieldDefinitionNode(
  props?: FieldDefinitionNodeProps,
): FieldDefinitionNode | undefined

export function fieldDefinitionNode(
  props?: FieldDefinitionNodeProps,
): FieldDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.FIELD_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    arguments: nodeOrPropsArr(inputValueDefinitionNode, props.arguments),
    type: props.type,
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InputValueDefinitionNode create input
 */

export interface InputValueDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  type: TypeNode
  defaulfValue?: ValueNode
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * InputValueDefinitionNode
 */

export function inputValueDefinitionNode(
  props: InputValueDefinitionNodeProps,
): InputValueDefinitionNode
export function inputValueDefinitionNode(
  props?: InputValueDefinitionNodeProps,
): InputValueDefinitionNode | undefined

export function inputValueDefinitionNode(
  props?: InputValueDefinitionNodeProps,
): InputValueDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    type: props.type,
    defaultValue: props.defaulfValue,
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InterfaceTypeDefinitionNode create input
 */

export interface InterfaceTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  fields?: (FieldDefinitionNode | FieldDefinitionNodeProps)[]
}

/**
 * InterfaceTypeDefinitionNode
 */

export function interfaceTypeDefinitionNode(
  props: InterfaceTypeDefinitionNodeProps,
): InterfaceTypeDefinitionNode {
  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    fields: nodeOrPropsArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * UnionTypeDefinitionNode create input
 */

export interface UnionTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  types?: (NamedTypeNode | string)[]
}

/**
 * UnionTypeDefinitionNode
 */

export function unionTypeNode(props: UnionTypeDefinitionNodeProps): UnionTypeDefinitionNode {
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    types: nodeOrPropsArr(namedTypeNode, props.types),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * EnumTypeDefinitionNode create input
 */

export interface EnumTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  values?: (EnumValueDefinitionNode | EnumValueDefinitionNodeProps)[]
}

/**
 * EnumTypeDefinitionNode
 */

export function enumType(props: EnumTypeDefinitionNodeProps): EnumTypeDefinitionNode {
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    values: nodeOrPropsArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * EnumValueDefinitionNode create input
 */

export interface EnumValueDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * EnumValueDefinitionNode
 */
export function enumValueDefinitionNode(
  props: EnumValueDefinitionNodeProps,
): EnumValueDefinitionNode
export function enumValueDefinitionNode(
  props?: EnumValueDefinitionNodeProps,
): EnumValueDefinitionNode | undefined

export function enumValueDefinitionNode(
  props?: EnumValueDefinitionNodeProps,
): EnumValueDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InputObjectTypeDefinitionNode create input
 */

export interface InputObjectTypeDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  fields?: (InputValueDefinitionNode | InputValueDefinitionNodeProps)[]
}

/**
 * InputObjectTypeDefinitionNode
 */

export function inputObjectTypeDefinitionNode(
  props: InputObjectTypeDefinitionNodeProps,
): InputObjectTypeDefinitionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    fields: nodeOrPropsArr(inputValueDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * DirectiveDefinitionNode create input
 */

export interface DirectiveDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  arguments?: (InputValueDefinitionNode | InputValueDefinitionNodeProps)[]
  repeatable?: boolean
  locations: (NameNode | DirectiveLocationEnum)[]
}

/**
 * DirectiveDefinitionNode
 */

export function directiveDefinitionNode(
  props: DirectiveDefinitionNodeProps,
): DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    arguments: nodeOrPropsArr(inputValueDefinitionNode, props.arguments),
    repeatable: props.repeatable || false,
    locations: nodeOrPropsArr(nameNode, props.locations),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * ScalarTypeExtensionNode create input
 */

/**
 * ScalarTypeExtensionNode
 */

// ────────────────────────────────────────────────────────────────────────────────

/**
 * ObjectTypeExtensionNode create input
 */

/**
 * ObjectTypeExtensionNode
 */

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InterfaceTypeExtensionNode create input
 */

/**
 * InterfaceTypeExtensionNode
 */

// ────────────────────────────────────────────────────────────────────────────────

/**
 * UnionTypeExtensionNode create input
 */

/**
 * UnionTypeExtensionNode
 */

// ────────────────────────────────────────────────────────────────────────────────

/**
 * EnumTypeExtensionNode create input
 */

/**
 * EnumTypeExtensionNode
 */

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InputObjectTypeExtensionNode create input
 */

/**
 * InputObjectTypeExtensionNode
 */
