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
import { isAstNode, nodeFnNullableArr, nodeFn, nodeFnNullable, nodeFnArr } from './utils'

// graphql/language/ast.d.ts

// ────────────────────────────────────────────────────────────────────────────────

/**
 * NameNode
 */

export function nameNode(value: string): NameNode {
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

export function documentNode(definitions: ReadonlyArray<DefinitionNode>): DocumentNode {
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
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<SelectionNode | SelectionNodeProps>
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
    name: nodeFnNullable(nameNode)(props.name),
    variableDefinitions: nodeFnNullableArr(variableDefinitionNode)(props.variableDefinitions),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    selectionSet: nodeFn(selectionSetNode)(props.selections),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * VariableDefinitionNode
 */

export function variableDefinitionNode(props: VariableDefinitionNodeProps): VariableDefinitionNode {
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: nodeFn(variableNode)(props.variable),
    type: nodeFn(typeNode)(props.type),
    defaultValue: props.defaultValue,
    directives: nodeFnNullableArr(directiveNode)(props.directives),
  }
}

export function isVariableDefinitionNode(node: ASTNode): node is VariableDefinitionNode {
  return node.kind === Kind.VARIABLE_DEFINITION
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * VariableNode
 */

export function variableNode(name: string): VariableNode {
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

export function selectionNode(props: SelectionNodeProps): SelectionNode {
  if (isAstNode(props)) {
    return props
  }

  return fieldNode(props)
}

/**
 * SelectionSetNode
 */

export type SelectionSetNodeProps = ReadonlyArray<SelectionNodeProps>

export function selectionSetNode(selections: SelectionSetNodeProps): SelectionSetNode {
  return {
    kind: Kind.SELECTION_SET,
    selections: nodeFnArr(selectionNode)(selections),
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
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections?: ReadonlyArray<SelectionNodeProps>
}

export type FieldNodeProps = FieldNodePropsObj | string

/**
 * FieldNode
 */

export function fieldNode(field: FieldNodeProps): FieldNode {
  if (typeof field === 'string') {
    return {
      kind: Kind.FIELD,
      name: nameNode(field),
    }
  }

  return {
    kind: Kind.FIELD,
    name: nodeFn(nameNode)(field.name),
    alias: nodeFnNullable(nameNode)(field.alias),
    arguments: nodeFnNullableArr(argumentNode)(field.arguments),
    directives: nodeFnNullableArr(directiveNode)(field.directives),
    selectionSet: nodeFnNullable(selectionSetNode)(field.selections),
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

export function argumentNode(props: ArgumentNodeProps): ArgumentNode {
  return {
    kind: Kind.ARGUMENT,
    name: nodeFn(nameNode)(props.name),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * FragmentSpreadNode
 */

export function fragmentSpreadNode(props: FragmentSpreadNodeProps): FragmentSpreadNode {
  return {
    kind: Kind.FRAGMENT_SPREAD,
    name: nodeFn(nameNode)(props.name),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<SelectionNode>
}

/**
 * InlineFragmentNode
 */
export function inlineFragmentNode(props: InlineFragmentNodeProps): InlineFragmentNode {
  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: nodeFnNullable(namedTypeNode)(props.typeCondition),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  typeCondition: NamedTypeNode | string
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: ReadonlyArray<SelectionNode | SelectionNodeProps>
}

/**
 * FragmentDefinitionNode
 */

export function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): FragmentDefinitionNode {
  return {
    kind: Kind.FRAGMENT_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    variableDefinitions: nodeFnNullableArr(variableDefinitionNode)(props.variableDefinitions),
    typeCondition: nodeFn(namedTypeNode)(props.typeCondition),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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

export function intValueNode(value: string | number): IntValueNode {
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

export function floatValueNode(value: string | number): FloatValueNode {
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

export function stringValueNode(value: string): StringValueNode {
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

export function booleanValueNode(value: boolean): BooleanValueNode {
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

export function enumValueNode(value: string): EnumValueNode {
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

export function listValueNode(values: ReadonlyArray<ValueNode>): ListValueNode {
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

export function objectValueNode(fields: ReadonlyArray<ObjectFieldNode>): ObjectValueNode {
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

export function objectFieldNode(props: ObjectFieldNodeProps): ObjectFieldNode {
  return {
    kind: Kind.OBJECT_FIELD,
    name: nodeFn(nameNode)(props.name),
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
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
}

export type DirectiveNodeProps = DirectiveNodePropsObj | string

/**
 * DirectiveNode
 */

export function directiveNode(directive: DirectiveNodeProps): DirectiveNode {
  // shorthand
  if (typeof directive === 'string') {
    return {
      kind: Kind.DIRECTIVE,
      name: nameNode(directive),
    }
  }

  return {
    kind: Kind.DIRECTIVE,
    name: nodeFn(nameNode)(directive.name),
    arguments: nodeFnNullableArr(argumentNode)(directive.arguments),
  }
}

export function isDirectiveNode(node: ASTNode): node is DirectiveNode {
  return node.kind === Kind.DIRECTIVE
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * NamedTypeNode
 */

export type NamedtypeNodeProps = NameNode | string

export function namedTypeNode(name: NamedtypeNodeProps): NamedTypeNode {
  return {
    kind: Kind.NAMED_TYPE,
    name: nodeFn(nameNode)(name),
  }
}

export function isNamedTypeNode(node: ASTNode): node is NamedTypeNode {
  return node.kind === Kind.NAMED_TYPE
}

/**
 * ListTypeNode
 */

export type ListTypeNodeProps = TypeNode | string

export function listTypeNode(type: ListTypeNodeProps): ListTypeNode {
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

export type NonNullTypeNodeProps = TypeNode | string

export function nonNullTypeNode(type: NonNullTypeNodeProps): NonNullTypeNode {
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

export function typeNode(type: TypeNodeProps): TypeNode {
  if (typeof type === 'string') {
    return parseType(type)
  }

  const namedType = nodeFn(namedTypeNode)(type.name)

  if (!type.list && !type.nonNull) {
    return namedType
  }

  if (type.list && !type.nonNull) {
    return listTypeNode(namedType)
  }

  if (!type.list && type.nonNull) {
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * SchemaDefinitionNode
 */

export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): SchemaDefinitionNode {
  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    operationTypes: nodeFnArr(operationTypeDefinitionNode)(props.operationTypes),
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
): OperationTypeDefinitionNode {
  return {
    kind: Kind.OPERATION_TYPE_DEFINITION,
    operation: props.operation,
    type: nodeFn(namedTypeNode)(props.type),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * ScalarTypeDefinitionNode
 */

export function scalarTypeDefinitionNode(
  props: ScalarTypeDefinitionNodeProps,
): ScalarTypeDefinitionNode {
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  interfaces?: ReadonlyArray<NamedTypeNode | string>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * ObjectTypeDefinitionNode
 */

export function objectTypeDefinitionNode(
  props: ObjectTypeDefinitionNodeProps,
): ObjectTypeDefinitionNode {
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    interfaces: nodeFnNullableArr(namedTypeNode)(props.interfaces),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    fields: nodeFnNullableArr(fieldDefinitionNode)(props.fields),
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
  arguments?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
  type: TypeNode | TypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>

  // shorthand
  nonNull?: boolean
  list?: string
}

/**
 * FieldDefinitionNode
 */

export function fieldDefinitionNode(props: FieldDefinitionNodeProps): FieldDefinitionNode {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    arguments: nodeFnNullableArr(inputValueDefinitionNode)(props.arguments),
    type: nodeFn(typeNode)(props.type),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * InputValueDefinitionNode
 */

export function inputValueDefinitionNode(
  props: InputValueDefinitionNodeProps,
): InputValueDefinitionNode {
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    type: nodeFn(typeNode)(props.type),
    defaultValue: props.defaultValue,
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * InterfaceTypeDefinitionNode
 */

export function interfaceTypeDefinitionNode(
  props: InterfaceTypeDefinitionNodeProps,
): InterfaceTypeDefinitionNode {
  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    fields: nodeFnNullableArr(fieldDefinitionNode)(props.fields),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<NamedTypeNode | string>
}

/**
 * UnionTypeDefinitionNode
 */

export function unionTypeDefinitionNode(
  props: UnionTypeDefinitionNodeProps,
): UnionTypeDefinitionNode {
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    types: nodeFnNullableArr(namedTypeNode)(props.types),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * EnumTypeDefinitionNode
 */

export function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): EnumTypeDefinitionNode {
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    values: nodeFnNullableArr(enumValueDefinitionNode)(props.values),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodePropsObj | string

/**
 * EnumValueDefinitionNode
 */

export function enumValueDefinitionNode(
  props: EnumValueDefinitionNodeProps,
): EnumValueDefinitionNode {
  if (typeof props === 'string') {
    return {
      kind: Kind.ENUM_VALUE_DEFINITION,
      name: nameNode(props),
    }
  }

  return {
    kind: Kind.ENUM_VALUE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
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
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * InputObjectTypeDefinitionNode
 */

export function inputObjectTypeDefinitionNode(
  props: InputObjectTypeDefinitionNodeProps,
): InputObjectTypeDefinitionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    directives: nodeFnNullableArr(directiveNode)(props.directives),
    fields: nodeFnNullableArr(inputValueDefinitionNode)(props.fields),
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
  arguments?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
  repeatable?: boolean
  locations: ReadonlyArray<NameNode | DirectiveLocationEnum>
}

/**
 * DirectiveDefinitionNode
 */

export function directiveDefinitionNode(
  props: DirectiveDefinitionNodeProps,
): DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: nodeFn(nameNode)(props.name),
    description: nodeFnNullable(stringValueNode)(props.description),
    arguments: nodeFnNullableArr(inputValueDefinitionNode)(props.arguments),
    repeatable: props.repeatable || false,
    locations: nodeFnArr(nameNode)(props.locations),
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
