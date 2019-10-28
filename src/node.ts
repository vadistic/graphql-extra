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
  parseType,
} from 'graphql'
import { nodeOrProps, nodeOrPropsArr, isAstNode } from './utils'

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
 * OperationDefinitionNode create input
 */

export interface OperationDefinitionNodeProps {
  name?: NameNode | string
  operation: OperationTypeNode
  variableDefinitions?: (VariableDefinitionNode | VariableDefinitionNodeProps)[]
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  selections: SelectionNode[]
}

/**
 * OperationDefinitionNode
 */

export function operationDefinitionNode(
  props: OperationDefinitionNodeProps,
): OperationDefinitionNode {
  return {
    kind: Kind.OPERATION_DEFINITION,
    operation: props.operation,
    name: nodeOrProps(nameNode, props.name),
    variableDefinitions: nodeOrPropsArr(variableDefinitionNode, props.variableDefinitions),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    selectionSet: selectionSetNode(props.selections),
  }
}

export function isOperationDefinitionNode(node: ASTNode): node is OperationDefinitionNode {
  return node.kind === Kind.OPERATION_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * VariableDefinitionNode create input
 */
export interface VariableDefinitionNodeProps {
  variable: VariableNode | string
  type: TypeNode | string
  defaultValue?: ValueNode
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

/**
 * VariableDefinitionNode
 */

export function variableDefinitionNode(props: VariableDefinitionNodeProps): VariableDefinitionNode
export function variableDefinitionNode(
  props?: VariableDefinitionNodeProps,
): VariableDefinitionNode | undefined

export function variableDefinitionNode(
  props?: VariableDefinitionNodeProps,
): VariableDefinitionNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: nodeOrProps(variableNode, props.variable),
    type: nodeOrProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

export function isVariableDefinitionNode(node: ASTNode): node is VariableDefinitionNode {
  return node.kind === Kind.VARIABLE_DEFINITION
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
 * SelectionNode create input
 */
export type SelectionNodeProps = SelectionNode | FieldNodeProps

/**
 * SelectionNode
 *
 * - helper for selectionSetNode, allows shorthands for fields
 */

export function selectionNode(props: SelectionNodeProps): SelectionNode
export function selectionNode(props?: SelectionNodeProps): SelectionNode | undefined

export function selectionNode(props?: SelectionNodeProps): SelectionNode | undefined {
  if (!props) {
    return
  }

  if (isAstNode(props)) {
    return props
  }

  return fieldNode(props)
}

/**
 * SelectionSetNode
 */

export type SelectionSetNodeProps = (SelectionNodeProps)[]

export function selectionSetNode(props: SelectionSetNodeProps): SelectionSetNode
export function selectionSetNode(props?: SelectionSetNodeProps): SelectionSetNode | undefined

export function selectionSetNode(props?: SelectionSetNodeProps): SelectionSetNode | undefined {
  if (!props) {
    return
  }

  return {
    kind: Kind.SELECTION_SET,
    selections: nodeOrPropsArr(selectionNode, props),
  }
}

export function isSelectionSetNode(node: ASTNode): node is SelectionSetNode {
  return node.kind === Kind.SELECTION_SET
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FieldNode create input
 */

export interface FieldNodePropsObj {
  name: NameNode | string
  alias?: NameNode | string
  arguments?: (ArgumentNode | ArgumentNodeProps)[]
  directives?: (DirectiveNode | DirectiveNodeProps)[]
  selections?: SelectionNodeProps[]
}

export type FieldNodeProps = FieldNodePropsObj | string

/**
 * FieldNode
 */

export function fieldNode(props: FieldNodeProps): FieldNode
export function fieldNode(props?: FieldNodeProps): FieldNode | undefined

export function fieldNode(props?: FieldNodeProps): FieldNode | undefined {
  if (typeof props === 'undefined') {
    return
  }

  if (typeof props === 'string') {
    return {
      kind: Kind.FIELD,
      name: nameNode(props),
    }
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

export function isArgumentNode(node: ASTNode): node is ArgumentNode {
  return node.kind === Kind.ARGUMENT
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

export function isFragmentSpreadNode(node: ASTNode): node is FragmentSpreadNode {
  return node.kind === Kind.FRAGMENT_SPREAD
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

export function isInlineFragmentNode(node: ASTNode): node is InlineFragmentNode {
  return node.kind === Kind.INLINE_FRAGMENT
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FragmentDefinitionNode create input
 */

export interface FragmentDefinitionNodeProps {
  name: NameNode | string
  variableDefinitions?: (VariableDefinitionNode | VariableDefinitionNodeProps)[]
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
    variableDefinitions: nodeOrPropsArr(variableDefinitionNode, props.variableDefinitions),
    typeCondition: nodeOrProps(namedTypeNode, props.typeCondition),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    selectionSet: selectionSetNode(props.selections),
  }
}

export function isFragmentDefinitionNode(node: ASTNode): node is FragmentDefinitionNode {
  return node.kind === Kind.FRAGMENT_DEFINITION
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

export function isIntValueNode(node: ASTNode): node is IntValueNode {
  return node.kind === Kind.INT
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

export function isFloatValueNode(node: ASTNode): node is FloatValueNode {
  return node.kind === Kind.FLOAT
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

export function isStringValueNode(node: ASTNode): node is StringValueNode {
  return node.kind === Kind.STRING
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

export function isBooleanValueNode(node: ASTNode): node is BooleanValueNode {
  return node.kind === Kind.BOOLEAN
}

/**
 * NullValueNode
 */

export function nullValueNode(): NullValueNode {
  return {
    kind: Kind.NULL,
  }
}

export function isNullValueNode(node: ASTNode): node is NullValueNode {
  return node.kind === Kind.NULL
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

export function iEnumValueNode(node: ASTNode): node is EnumValueNode {
  return node.kind === Kind.ENUM
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
    values: values,
  }
}

export function isListValueNode(node: ASTNode): node is ListValueNode {
  return node.kind === Kind.LIST
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
    fields: fields,
  }
}

export function isObjectValueNode(node: ASTNode): node is ObjectValueNode {
  return node.kind === Kind.OBJECT
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

export function isObjectFieldNode(node: ASTNode): node is ObjectFieldNode {
  return node.kind === Kind.OBJECT_FIELD
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * DirectiveNode create input
 */

export interface DirectiveNodePropsObj {
  name: NameNode | string
  arguments?: (ArgumentNode | ArgumentNodeProps)[]
}

export type DirectiveNodeProps = DirectiveNodePropsObj | string

/**
 * DirectiveNode
 */

export function directiveNode(props: DirectiveNodeProps): DirectiveNode
export function directiveNode(props?: DirectiveNodeProps): DirectiveNode | undefined

export function directiveNode(props?: DirectiveNodeProps): DirectiveNode | undefined {
  if (typeof props === 'undefined') {
    return
  }

  // shorthand
  if (typeof props === 'string') {
    return {
      kind: Kind.DIRECTIVE,
      name: nameNode(props),
    }
  }

  return {
    kind: Kind.DIRECTIVE,
    name: nodeOrProps(nameNode, props.name),
    arguments: nodeOrPropsArr(argumentNode, props.arguments),
  }
}

export function isDirectiveNode(node: ASTNode): node is DirectiveNode {
  return node.kind === Kind.DIRECTIVE
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

export function listTypeNode(type: TypeNode | string): ListTypeNode
export function listTypeNode(type?: TypeNode | string): ListTypeNode | undefined

export function listTypeNode(type?: TypeNode | string): ListTypeNode | undefined {
  if (typeof type === 'undefined') {
    return
  }

  const namedType = typeof type === 'string' ? namedTypeNode(type) : type

  return {
    kind: Kind.LIST_TYPE,
    type: namedType,
  }
}

export function isListTypeNode(node: ASTNode): node is ListTypeNode {
  return node.kind === Kind.LIST_TYPE
}

/**
 * NonNullTypeNode
 */

export function nonNullTypeNode(type: TypeNode | string): NonNullTypeNode
export function nonNullTypeNode(type?: TypeNode | string): NonNullTypeNode | undefined

export function nonNullTypeNode(type?: TypeNode | string): NonNullTypeNode | undefined {
  if (typeof type === 'undefined') {
    return
  }

  const namedType = typeof type === 'string' ? namedTypeNode(type) : type

  if (namedType.kind === Kind.NON_NULL_TYPE) {
    return namedType
  }

  return {
    kind: Kind.NON_NULL_TYPE,
    type: namedType,
  }
}

export function isNonNullTypeNode(node: ASTNode): node is NonNullTypeNode {
  return node.kind === Kind.NON_NULL_TYPE
}

/**
 * TypeNode
 */

export interface TypeNodePropsObj {
  // or should it be type: ??
  name: NamedTypeNode | string
  list?: boolean
  nonNull?: boolean
}

export type TypeNodeProps = TypeNodePropsObj | string

export function typeNode(props: TypeNodeProps): TypeNode
export function typeNode(props?: TypeNodeProps): TypeNode | undefined

export function typeNode(props?: TypeNodeProps): TypeNode | undefined {
  if (typeof props === 'undefined') {
    return
  }

  if (typeof props === 'string') {
    return parseType(props)
  }

  const namedType = nodeOrProps(namedTypeNode, props.name)

  if (!props.list && !props.nonNull) {
    return namedType
  }

  if (props.list && !props.nonNull) {
    return listTypeNode(namedType)
  }

  if (!props.list && props.nonNull) {
    return nonNullTypeNode(namedType)
  }

  // I've never saw nested list in GraphQL API so this is non-null lsit default
  return nonNullTypeNode(listTypeNode(nonNullTypeNode(namedType)))
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
 * True enum for OperationTypeEnum
 */

export enum OperationTypeNode {
  query = 'query',
  mutation = 'mutation',
  subscription = 'subscription',
}

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

export function isObjectTypeDefinitionNode(node: ASTNode): node is ObjectTypeDefinitionNode {
  return node.kind === Kind.OBJECT_TYPE_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * FieldDefinitionNode create input
 */

export interface FieldDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  arguments?: (InputValueDefinitionNode | InputValueDefinitionNodeProps)[]
  type: TypeNode | TypeNodeProps
  directives?: (DirectiveNode | DirectiveNodeProps)[]

  // shorthand
  nonNull?: boolean
  list?: string
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
    type: nodeOrProps(typeNode, props.type),
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

export function isFieldDefinitionNode(node: ASTNode): node is FieldDefinitionNode {
  return node.kind === Kind.FIELD_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * InputValueDefinitionNode create input
 */

export interface InputValueDefinitionNodeProps {
  name: NameNode | string
  description?: StringValueNode | string
  type: TypeNode | TypeNodeProps
  // TODO: allow coercing js value value by type?
  defaultValue?: ValueNode
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
    type: nodeOrProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

export function isInputValueDefinitionNode(node: ASTNode): node is InputValueDefinitionNode {
  return node.kind === Kind.INPUT_VALUE_DEFINITION
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

export function isInterfaceTypeDefinitionNode(node: ASTNode): node is InterfaceTypeDefinitionNode {
  return node.kind === Kind.INTERFACE_TYPE_DEFINITION
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

export function unionTypeDefinitionNode(
  props: UnionTypeDefinitionNodeProps,
): UnionTypeDefinitionNode {
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    types: nodeOrPropsArr(namedTypeNode, props.types),
  }
}

export function isUnionTypeDefinitionNode(node: ASTNode): node is UnionTypeDefinitionNode {
  return node.kind === Kind.UNION_TYPE_DEFINITION
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

export function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): EnumTypeDefinitionNode {
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
    values: nodeOrPropsArr(enumValueDefinitionNode, props.values),
  }
}

export function isEnumTypeDefinitionNode(node: ASTNode): node is EnumTypeDefinitionNode {
  return node.kind === Kind.ENUM_TYPE_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * EnumValueDefinitionNode create input
 */

export interface EnumValueDefinitionNodePropsObj {
  name: NameNode | string
  description?: StringValueNode | string
  directives?: (DirectiveNode | DirectiveNodeProps)[]
}

export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodePropsObj | string

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
): EnumValueDefinitionNode | string | undefined {
  if (typeof props === 'undefined') {
    return
  }

  // shorthand
  if (typeof props === 'string') {
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      name: nameNode(props),
    }
  }

  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    name: nodeOrProps(nameNode, props.name),
    description: nodeOrProps(stringValueNode, props.description),
    directives: nodeOrPropsArr(directiveNode, props.directives),
  }
}

export function isEnumValueDefinitionNode(node: ASTNode): node is EnumValueDefinitionNode {
  return node.kind === Kind.ENUM_VALUE_DEFINITION
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

export function isInputObjectTypeDefinitionNode(
  node: ASTNode,
): node is InputObjectTypeDefinitionNode {
  return node.kind === Kind.INPUT_OBJECT_TYPE_DEFINITION
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

export function isDirectiveDefinitionNode(node: ASTNode): node is DirectiveDefinitionNode {
  return node.kind === Kind.DIRECTIVE_DEFINITION
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
