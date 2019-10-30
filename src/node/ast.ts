import {
  ArgumentNode,
  BooleanValueNode,
  DefinitionNode,
  DirectiveDefinitionNode,
  DirectiveLocationEnum,
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
  parseType,
  ScalarTypeDefinitionNode,
  ScalarTypeExtensionNode,
  SchemaDefinitionNode,
  SchemaExtensionNode,
  SelectionNode,
  SelectionSetNode,
  StringValueNode,
  TypeNode,
  UnionTypeDefinitionNode,
  UnionTypeExtensionNode,
  ValueNode,
  VariableDefinitionNode,
  VariableNode,
  OperationTypeNode,
} from 'graphql'
import {
  isAstNode,
  applyPropsNullableArr,
  applyProps,
  applyPropsNullable,
  applyPropsArr,
} from '../utils'

//
// ─── NAME ───────────────────────────────────────────────────────────────────────
//

/**
 * `NameNode` create input
 *
 * @category AST Node
 */

export type NameNodeProps = string

/**
 * create `NameNode`
 *
 * @category AST Node
 */
export function nameNode(value: NameNodeProps): NameNode {
  return {
    kind: Kind.NAME,
    value,
  }
}

//
// ─── DOCUMENT ───────────────────────────────────────────────────────────────────
//

/**
 * `DocumentNode` create input
 *
 * @category AST Node
 */
export type DocumentNodeProps = ReadonlyArray<DefinitionNode>

/**
 * create `DocumentNode`
 *
 * @category AST Node
 */
export function documentNode(definitions: DocumentNodeProps): DocumentNode {
  return {
    kind: Kind.DOCUMENT,
    definitions,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `OperationDefinitionNode` create input
 *
 * @category AST Node
 */
export interface OperationDefinitionNodeProps {
  name?: NameNode | NameNodeProps
  operation: OperationTypeNode
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `OperationDefinitionNode`
 *
 * @category AST Node
 */
export function operationDefinitionNode(
  props: OperationDefinitionNodeProps,
): OperationDefinitionNode {
  return {
    kind: Kind.OPERATION_DEFINITION,
    operation: props.operation,
    name: applyPropsNullable(nameNode, props.name),
    variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode, props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `VariableDefinitionNode` create input
 *
 * @category AST Node
 */
export interface VariableDefinitionNodeProps {
  variable: VariableNode | VariableNodeProps
  type: TypeNode | TypeNodeProps
  defaultValue?: ValueNode
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * create `VariableDefinitionNode`
 *
 * @category AST Node
 */
export function variableDefinitionNode(props: VariableDefinitionNodeProps): VariableDefinitionNode {
  return {
    kind: Kind.VARIABLE_DEFINITION,
    variable: applyProps(variableNode, props.variable),
    type: applyProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `VariableNode` create input
 *
 * @category AST Node
 */
export type VariableNodeProps = string

/**
 * create `VariableNode`
 *
 * @category AST Node
 */
export function variableNode(name: VariableNodeProps): VariableNode {
  return {
    kind: Kind.VARIABLE,
    name: nameNode(name),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `SelectionSetNode` create input
 *
 * @category AST Node
 */
export type SelectionSetNodeProps = ReadonlyArray<SelectionNode | FieldNodeProps>

/**
 * create `SelectionSetNode`
 *
 * @category AST Node
 */
export function selectionSetNode(selections: SelectionSetNodeProps): SelectionSetNode {
  return {
    kind: Kind.SELECTION_SET,
    // bit unconventional because selection node is union, and fn is applied only for field props
    selections: selections.map(el => (isAstNode(el) ? el : applyProps(fieldNode, el))),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FieldNode` create input subtype
 *
 * @category AST Node
 */
export interface FieldNodeObjProps {
  name: NameNode | NameNodeProps
  alias?: NameNode | NameNodeProps
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections?: SelectionSetNode | SelectionSetNodeProps
}

/**
 * `FieldNode` create input
 *
 * @category AST Node
 */
export type FieldNodeProps = FieldNodeObjProps | string

/**
 * create `FieldNode`
 *
 * @category AST Node
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
    name: applyProps(nameNode, field.name),
    alias: applyPropsNullable(nameNode, field.alias),
    arguments: applyPropsNullableArr(argumentNode, field.arguments),
    directives: applyPropsNullableArr(directiveNode, field.directives),
    selectionSet: applyPropsNullable(selectionSetNode, field.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ArgumentNode` create input
 *
 * @category AST Node
 */
export interface ArgumentNodeProps {
  name: NameNode | NameNodeProps
  value: ValueNode
}

/**
 * create `ArgumentNode`
 *
 * @category AST Node
 */
export function argumentNode(props: ArgumentNodeProps): ArgumentNode {
  return {
    kind: Kind.ARGUMENT,
    name: applyProps(nameNode, props.name),
    value: props.value,
  }
}

//
// ─── FRAGMENTS ──────────────────────────────────────────────────────────────────
//

/**
 * `FragmentSpreadNode` create input
 *
 * @category AST Node
 */
export interface FragmentSpreadNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * create `FragmentSpreadNode`
 *
 * @category AST Node
 */
export function fragmentSpreadNode(props: FragmentSpreadNodeProps): FragmentSpreadNode {
  return {
    kind: Kind.FRAGMENT_SPREAD,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InlineFragmentNode` create input
 *
 * @category AST Node
 */
export interface InlineFragmentNodeProps {
  name: NameNode | NameNodeProps
  typeCondition?: NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `InlineFragmentNode`
 *
 * @category AST Node
 */
export function inlineFragmentNode(props: InlineFragmentNodeProps): InlineFragmentNode {
  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: applyPropsNullable(namedTypeNode, props.typeCondition),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode, props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FragmentDefinitionNode` create input
 *
 * @category AST Node
 */
export interface FragmentDefinitionNodeProps {
  name: NameNode | NameNodeProps
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  typeCondition: NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `FragmentDefinitionNode`
 *
 * @category AST Node
 */
export function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): FragmentDefinitionNode {
  return {
    kind: Kind.FRAGMENT_DEFINITION,
    name: applyProps(nameNode, props.name),
    variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
    typeCondition: applyProps(namedTypeNode, props.typeCondition),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode, props.selections),
  }
}

//
// ─── VALUES ─────────────────────────────────────────────────────────────────────
//

/**
 * `IntValueNode` create input
 *
 * @category AST Node
 */
export type IntValueNodeProps = string | number

/**
 * create `IntValueNode`
 *
 * @category AST Node
 */
export function intValueNode(value: IntValueNodeProps): IntValueNode {
  return {
    kind: Kind.INT,
    value: '' + value,
  }
}

/**
 * `FloatValueNode` create input
 *
 * @category AST Node
 */
export type FloatValueNodeProps = string | number

/**
 * create `FloatValueNode`
 *
 * @category AST Node
 */
export function floatValueNode(value: string | number): FloatValueNode {
  return {
    kind: Kind.FLOAT,
    value: '' + value,
  }
}

/**
 * `StringValueNode` create input
 *
 * @category AST Node
 */
export type StringValueNodeProps = string

/**
 * create `StringValueNode`
 *
 * @category AST Node
 */
export function stringValueNode(value: StringValueNodeProps): StringValueNode {
  return {
    kind: Kind.STRING,
    value,
  }
}

/**
 * `BooleanValueNode` create input
 *
 * @category AST Node
 */
export type BooleanValueNodeProps = boolean

/**
 * create `BooleanValueNode`
 *
 * @category AST Node
 */
export function booleanValueNode(value: BooleanValueNodeProps): BooleanValueNode {
  return {
    kind: Kind.BOOLEAN,
    value,
  }
}

/**
 * create `NullValueNode`
 *
 * @category AST Node
 */
export function nullValueNode(): NullValueNode {
  return {
    kind: Kind.NULL,
  }
}

/**
 * `EnumValueNode` create input
 *
 * @category AST Node
 */
export type EnumValueNodeProps = string

/**
 * create `EnumValueNode`
 *
 * @category AST Node
 */
export function enumValueNode(value: EnumValueNodeProps): EnumValueNode {
  return {
    kind: Kind.ENUM,
    value,
  }
}

/**
 * `ListValueNode` create input
 *
 * @category AST Node
 */
export type ListValueNodeProps = ReadonlyArray<ValueNode>

/**
 * `ListValueNode`
 *
 * @category AST Node
 */
export function listValueNode(values: ListValueNodeProps): ListValueNode {
  return {
    kind: Kind.LIST,
    values: values,
  }
}

/**
 * `ObjectValueNode` create input
 *
 * @category AST Node
 */
export type ObjectValueNodeProps = ReadonlyArray<ObjectFieldNode>

/**
 * create `ObjectValueNode`
 *
 * @category AST Node
 */
export function objectValueNode(fields: ObjectValueNodeProps): ObjectValueNode {
  return {
    kind: Kind.OBJECT,
    fields: fields,
  }
}

/**
 * `ObjectFieldNode` create input
 *
 * @category AST Node
 */
export interface ObjectFieldNodeProps {
  name: NameNode | NameNodeProps
  value: ValueNode
}

/**
 * create `ObjectFieldNode`
 *
 * @category AST Node
 */
export function objectFieldNode(props: ObjectFieldNodeProps): ObjectFieldNode {
  return {
    kind: Kind.OBJECT_FIELD,
    name: applyProps(nameNode, props.name),
    value: props.value,
  }
}

//
// ─── DIRECTIVES ─────────────────────────────────────────────────────────────────
//

/**
 * `DirectiveNode` create input subtype
 *
 * @category AST Node
 */
export interface DirectiveNodeObjProps {
  name: NameNode | NameNodeProps
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
}

/**
 * `DirectiveNode` create input
 *
 * @category AST Node
 */
export type DirectiveNodeProps = DirectiveNodeObjProps | string

/**
 * create `DirectiveNode`
 *
 * @category AST Node
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
    name: applyProps(nameNode, directive.name),
    arguments: applyPropsNullableArr(argumentNode, directive.arguments),
  }
}

//
// ─── TYPES ──────────────────────────────────────────────────────────────────────
//

/**
 * `NamedTypeNode` create input
 *
 * @category AST Node
 */
export type NamedTypeNodeProps = NameNode | string

/**
 * create `NamedTypeNode`
 *
 * @category AST Node
 */
export function namedTypeNode(value: NamedTypeNodeProps): NamedTypeNode {
  return {
    kind: Kind.NAMED_TYPE,
    name: applyProps(nameNode, value),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ListTypeNode` create input
 *
 * @category AST Node
 */
export type ListTypeNodeProps = TypeNode | string

/**
 * create `ListTypeNode`
 *
 * @category AST Node
 */
export function listTypeNode(type: ListTypeNodeProps): ListTypeNode {
  const namedType = typeof type === 'string' ? namedTypeNode(type) : type

  return {
    kind: Kind.LIST_TYPE,
    type: namedType,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `NonNullTypeNode` create input
 *
 * @category AST Node
 */
export type NonNullTypeNodeProps = TypeNode | string

/**
 * create `NonNullTypeNode`
 *
 * @category AST Node
 */
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

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `TypeNode` create input subtype
 *
 * @category AST Node
 */
export interface TypeNodeObjProps {
  // FIXME: should it be named `type` ??
  name: NamedTypeNode | string
  list?: boolean
  nonNull?: boolean
}

/**
 * `TypeNode` create input
 *
 * @category AST Node
 */
export type TypeNodeProps = TypeNodeObjProps | string

/**
 * create `TypeNode`
 *
 * @category AST Node
 */
export function typeNode(type: TypeNodeProps): TypeNode {
  if (typeof type === 'string') {
    return parseType(type)
  }

  const namedType = applyProps(namedTypeNode, type.name)

  if (!type.list && !type.nonNull) {
    return namedType
  }

  if (type.list && !type.nonNull) {
    return listTypeNode(namedType)
  }

  if (!type.list && type.nonNull) {
    return nonNullTypeNode(namedType)
  }

  // I've never saw nested list in GraphQL API so this is non-null list default
  return nonNullTypeNode(listTypeNode(nonNullTypeNode(namedType)))
}

//
// ─── TYPE SYSTEM DEFINITIONS ────────────────────────────────────────────────────
//

/**
 * `SchemaDefinitionNode` create input
 *
 * @category AST Node
 */
export interface SchemaDefinitionNodeProps {
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * create `SchemaDefinitionNode`
 *
 * @category AST Node
 */
export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): SchemaDefinitionNode {
  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: applyPropsNullableArr(directiveNode, props.directives),
    operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `OperationTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface OperationTypeDefinitionNodeProps {
  operation: OperationTypeNode
  type: NamedTypeNode | NamedTypeNodeProps
}

/**
 * create `OperationTypeDefinitionNode`
 *
 * @category AST Node
 */
export function operationTypeDefinitionNode(
  props: OperationTypeDefinitionNodeProps,
): OperationTypeDefinitionNode {
  return {
    kind: Kind.OPERATION_TYPE_DEFINITION,
    operation: props.operation,
    type: applyProps(namedTypeNode, props.type),
  }
}

//
// ─── TYPE DEFINITIONS ───────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface ScalarTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeDefinitionNode`
 *
 * @category AST Node
 */
export function scalarTypeDefinitionNode(
  props: ScalarTypeDefinitionNodeProps,
): ScalarTypeDefinitionNode {
  return {
    kind: Kind.SCALAR_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface ObjectTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  interfaces?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function objectTypeDefinitionNode(
  props: ObjectTypeDefinitionNodeProps,
): ObjectTypeDefinitionNode {
  return {
    kind: Kind.OBJECT_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FieldDefinitionNode` create input
 *
 * @category AST Node
 */
export interface FieldDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
  type: TypeNode | TypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>

  // shorthand
  nonNull?: boolean
  list?: string
}

/**
 * create `FieldDefinitionNode`
 *
 * @category AST Node
 */
export function fieldDefinitionNode(props: FieldDefinitionNodeProps): FieldDefinitionNode {
  return {
    kind: Kind.FIELD_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
    type: applyProps(typeNode, props.type),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputValueDefinitionNode` create input
 *
 * @category AST Node
 */
export interface InputValueDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  type: TypeNode | TypeNodeProps
  // TODO: allow coercing js value value by type?
  defaultValue?: ValueNode
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * create `InputValueDefinitionNode`
 *
 * @category AST Node
 */
export function inputValueDefinitionNode(
  props: InputValueDefinitionNodeProps,
): InputValueDefinitionNode {
  return {
    kind: Kind.INPUT_VALUE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    type: applyProps(typeNode, props.type),
    defaultValue: props.defaultValue,
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InterfaceTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface InterfaceTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeDefinitionNode`
 *
 * @category AST Node
 */
export function interfaceTypeDefinitionNode(
  props: InterfaceTypeDefinitionNodeProps,
): InterfaceTypeDefinitionNode {
  return {
    kind: Kind.INTERFACE_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `UnionTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface UnionTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeDefinitionNode`
 *
 * @category AST Node
 */
export function unionTypeDefinitionNode(
  props: UnionTypeDefinitionNodeProps,
): UnionTypeDefinitionNode {
  return {
    kind: Kind.UNION_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    types: applyPropsNullableArr(namedTypeNode, props.types),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface EnumTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeDefinitionNode`
 *
 * @category AST Node
 */
export function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): EnumTypeDefinitionNode {
  return {
    kind: Kind.ENUM_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumValueDefinitionNode` create input
 *
 * @category AST Node
 */
export interface EnumValueDefinitionNodeObjProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodeObjProps | string

/**
 * create `EnumValueDefinitionNode`
 *
 * @category AST Node
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
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export interface InputObjectTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeDefinitionNode(
  props: InputObjectTypeDefinitionNodeProps,
): InputObjectTypeDefinitionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
  }
}

//
// ─── DIRECTIVE DEFINITIONS ──────────────────────────────────────────────────────
//

/**
 * `DirectiveDefinitionNode` create input
 *
 * @category AST Node
 */
export interface DirectiveDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
  repeatable?: boolean
  locations: ReadonlyArray<NameNode | DirectiveLocationEnum>
}

/**
 * create `DirectiveDefinitionNode`
 *
 * @category AST Node
 */
export function directiveDefinitionNode(
  props: DirectiveDefinitionNodeProps,
): DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
    repeatable: props.repeatable || false,
    locations: applyPropsArr(nameNode, props.locations),
  }
}

//
// ─── TYPE SYSTEM EXTENSIONS ─────────────────────────────────────────────────────
//

/**
 * `SchemaExtensionNode` create input
 *
 * @category AST Node
 */
export interface SchemaExtensionNodeProps {
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * create `SchemaExtensionNode`
 *
 * @category AST Node
 */
export function schemaExtensionNode(props: SchemaExtensionNodeProps): SchemaExtensionNode {
  return {
    kind: Kind.SCHEMA_EXTENSION,
    directives: applyPropsNullableArr(directiveNode, props.directives),
    operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

//
// ─── TYPE EXTENSIONS ────────────────────────────────────────────────────────────
//

/**
 * `ScalarTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface ScalarTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeExtensionNode`
 *
 * @category AST Node
 */
export function scalarTypeExtensionNode(
  props: ScalarTypeExtensionNodeProps,
): ScalarTypeExtensionNode {
  return {
    kind: Kind.SCALAR_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface ObjectTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  interfaces?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function objectTypeExtensionNode(
  props: ObjectTypeExtensionNodeProps,
): ObjectTypeExtensionNode {
  return {
    kind: Kind.OBJECT_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InterfaceTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface InterfaceTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeExtensionNode`
 *
 * @category AST Node
 */
export function interfaceTypeExtensionNode(
  props: InterfaceTypeExtensionNodeProps,
): InterfaceTypeExtensionNode {
  return {
    kind: Kind.INTERFACE_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `UnionTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface UnionTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeExtensionNode`
 *
 * @category AST Node
 */
export function unionTypeExtensionNode(
  props: UnionTypeDefinitionNodeProps,
): UnionTypeExtensionNode {
  return {
    kind: Kind.UNION_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    types: applyPropsNullableArr(namedTypeNode, props.types),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `EnumTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface EnumTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeExtensionNode`
 *
 * @category AST Node
 */
export function enumTypeExtensionNode(props: EnumTypeDefinitionNodeProps): EnumTypeExtensionNode {
  return {
    kind: Kind.ENUM_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `InputObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export interface InputObjectTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeExtensionNode(
  props: InputObjectTypeDefinitionNodeProps,
): InputObjectTypeExtensionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
  }
}
