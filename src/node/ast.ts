import type * as GQL from 'graphql'
import { Kind, parseType } from 'graphql'

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
 * `NameNode` create input subtype
 *
 * @category AST Node
 */
export type NameNodeObjProps = {
  name: string
}

/**
 * `NameNode` create input
 *
 * @category AST Node
 */
export type NameNodeProps = NameNodeObjProps | string

/**
 * create `NameNode`
 *
 * @category AST Node
 */
export function nameNode(props: NameNodeProps): GQL.NameNode {
  return {
    kind: Kind.NAME,
    value: typeof props === 'string' ? props : props.name,
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
export type DocumentNodeProps = ReadonlyArray<GQL.DefinitionNode>

/**
 * create `DocumentNode`
 *
 * @category AST Node
 */
export function documentNode(definitions: DocumentNodeProps): GQL.DocumentNode {
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
export type OperationDefinitionNodeProps = {
  name?: GQL.NameNode | NameNodeProps
  operation: GQL.OperationTypeNode
  variableDefinitions?: ReadonlyArray<GQL.VariableDefinitionNode | VariableDefinitionNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: GQL.SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `OperationDefinitionNode`
 *
 * @category AST Node
 */
export function operationDefinitionNode(props: OperationDefinitionNodeProps): GQL.OperationDefinitionNode {
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
export type VariableDefinitionNodeProps = {
  variable: GQL.VariableNode | VariableNodeProps
  type: GQL.TypeNode | TypeNodeProps
  defaultValue?: GQL.ValueNode
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `VariableDefinitionNode`
 *
 * @category AST Node
 */
export function variableDefinitionNode(props: VariableDefinitionNodeProps): GQL.VariableDefinitionNode {
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
export function variableNode(name: VariableNodeProps): GQL.VariableNode {
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
export type SelectionSetNodeProps = ReadonlyArray<GQL.SelectionNode | FieldNodeProps>

/**
 * create `SelectionSetNode`
 *
 * @category AST Node
 */
export function selectionSetNode(selections: SelectionSetNodeProps): GQL.SelectionSetNode {
  return {
    kind: Kind.SELECTION_SET,
    // bit unconventional because selection node is union, and fn is applied only for field props
    selections: selections.map((el) => (isAstNode(el) ? el : applyProps(fieldNode, el))),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `FieldNode` create input subtype
 *
 * @category AST Node
 */
export type FieldNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  alias?: GQL.NameNode | NameNodeProps
  arguments?: ReadonlyArray<GQL.ArgumentNode | ArgumentNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections?: GQL.SelectionSetNode | SelectionSetNodeProps
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
export function fieldNode(field: FieldNodeProps): GQL.FieldNode {
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
export type ArgumentNodeProps = {
  name: GQL.NameNode | NameNodeProps
  value: GQL.ValueNode
}

/**
 * create `ArgumentNode`
 *
 * @category AST Node
 */
export function argumentNode(props: ArgumentNodeProps): GQL.ArgumentNode {
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
 * `FragmentSpreadNode` create input subtype
 *
 * @category AST Node
 */
export type FragmentSpreadNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}


/**
 * `FragmentSpreadNode` create input
 *
 * @category AST Node
 */
export type FragmentSpreadNodeProps = string | FragmentSpreadNodeObjProps

/**
 * create `FragmentSpreadNode`
 *
 * @category AST Node
 */
export function fragmentSpreadNode(props: FragmentSpreadNodeProps): GQL.FragmentSpreadNode {
  if (typeof props === 'string') {
    return {
      kind: Kind.FRAGMENT_SPREAD,
      name: applyProps(nameNode, props),
      directives: [],
    }
  }

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
export type InlineFragmentNodeProps = {
  name: GQL.NameNode | NameNodeProps
  typeCondition?: GQL.NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: GQL.SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `InlineFragmentNode`
 *
 * @category AST Node
 */
export function inlineFragmentNode(props: InlineFragmentNodeProps): GQL.InlineFragmentNode {
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
export type FragmentDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  variableDefinitions?: ReadonlyArray<GQL.VariableDefinitionNode | VariableDefinitionNodeProps>
  typeCondition: GQL.NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  selections: GQL.SelectionSetNode | SelectionSetNodeProps
}

/**
 * create `FragmentDefinitionNode`
 *
 * @category AST Node
 */
export function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): GQL.FragmentDefinitionNode {
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
export function intValueNode(value: IntValueNodeProps): GQL.IntValueNode {
  return {
    kind: Kind.INT,
    value: String(Math.floor(+value)),
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
export function floatValueNode(value: string | number): GQL.FloatValueNode {
  return {
    kind: Kind.FLOAT,
    value: String(value),
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
export function stringValueNode(value: StringValueNodeProps): GQL.StringValueNode {
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
export type BooleanValueNodeProps = any

/**
 * create `BooleanValueNode`
 *
 * @category AST Node
 */
export function booleanValueNode(value: BooleanValueNodeProps): GQL.BooleanValueNode {
  const toBool: any = {
    true: true,
    false: false,
  }

  return {
    kind: Kind.BOOLEAN,
    value: toBool['' + value] ?? !!value,
  }
}

/**
 * create `NullValueNode`
 *
 * @category AST Node
 */
export function nullValueNode(): GQL.NullValueNode {
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
export function enumValueNode(value: EnumValueNodeProps): GQL.EnumValueNode {
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
export type ListValueNodeProps = ReadonlyArray<GQL.ValueNode>

/**
 * `ListValueNode`
 *
 * @category AST Node
 */
export function listValueNode(values: ListValueNodeProps): GQL.ListValueNode {
  return {
    kind: Kind.LIST,
    values,
  }
}

/**
 * `ObjectValueNode` create input
 *
 * @category AST Node
 */
// ! does not need special props since it's simple
// may need to chnage after implementing value helper
export type ObjectValueNodeProps = ReadonlyArray<GQL.ObjectFieldNode>

/**
 * create `ObjectValueNode`
 *
 * @category AST Node
 */
export function objectValueNode(fields: ObjectValueNodeProps): GQL.ObjectValueNode {
  return {
    kind: Kind.OBJECT,
    fields,
  }
}

/**
 * `ObjectFieldNode` create input
 *
 * @category AST Node
 */
export type ObjectFieldNodeProps = {
  name: GQL.NameNode | NameNodeProps
  value: GQL.ValueNode
}

/**
 * create `ObjectFieldNode`
 *
 * @category AST Node
 */
export function objectFieldNode(props: ObjectFieldNodeProps): GQL.ObjectFieldNode {
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
export type DirectiveNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  arguments?: ReadonlyArray<GQL.ArgumentNode | ArgumentNodeProps>
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
export function directiveNode(directive: DirectiveNodeProps): GQL.DirectiveNode {
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
export type NamedTypeNodeProps = GQL.NameNode | NameNodeProps | string

/**
 * create `NamedTypeNode`
 *
 * @category AST Node
 */
export function namedTypeNode(props: NamedTypeNodeProps): GQL.NamedTypeNode {
  return {
    kind: Kind.NAMED_TYPE,
    name: applyProps(nameNode, props),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `ListTypeNode` create input
 *
 * @category AST Node
 */
export type ListTypeNodeProps = GQL.TypeNode |TypeNodeProps | string

/**
 * create `ListTypeNode`
 *
 * @category AST Node
 */
export function listTypeNode(props: ListTypeNodeProps): GQL.ListTypeNode {
  const type = applyProps(typeNode, props)

  // ! nesting is skipped
  if (type.kind === Kind.LIST_TYPE) {
    return type
  }

  return {
    kind: Kind.LIST_TYPE,
    type,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `NonNullTypeNode` create input
 *
 * @category AST Node
 */
export type NonNullTypeNodeProps = GQL.TypeNode | TypeNodeProps | string

/**
 * create `NonNullTypeNode`
 *
 * @category AST Node
 */
export function nonNullTypeNode(props: NonNullTypeNodeProps): GQL.NonNullTypeNode {
  const type = applyProps(typeNode, props)

  // ! nesting is skipped
  if (type.kind === Kind.NON_NULL_TYPE) {
    return type
  }

  return {
    kind: Kind.NON_NULL_TYPE,
    type,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * `TypeNode` create input subtype
 *
 * @category AST Node
 */
export type TypeNodeObjProps = {
  // FIXME: should it be named `type` ??
  name: GQL.NamedTypeNode | string
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
export function typeNode(type: TypeNodeProps): GQL.TypeNode {
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
export type SchemaDefinitionNodeProps = {
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<GQL.OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * create `SchemaDefinitionNode`
 *
 * @category AST Node
 */
export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): GQL.SchemaDefinitionNode {
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
export type OperationTypeDefinitionNodeProps = {
  operation: GQL.OperationTypeNode
  type: GQL.NamedTypeNode | NamedTypeNodeProps
}

/**
 * create `OperationTypeDefinitionNode`
 *
 * @category AST Node
 */
export function operationTypeDefinitionNode(props: OperationTypeDefinitionNodeProps): GQL.OperationTypeDefinitionNode {
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
export type ScalarTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeDefinitionNode`
 *
 * @category AST Node
 */
export function scalarTypeDefinitionNode(props: ScalarTypeDefinitionNodeProps): GQL.ScalarTypeDefinitionNode {
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
export type ObjectTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  interfaces?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function objectTypeDefinitionNode(props: ObjectTypeDefinitionNodeProps): GQL.ObjectTypeDefinitionNode {
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
export type FieldDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
  type: GQL.TypeNode | TypeNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>

  // shorthand
  nonNull?: boolean
  list?: string
}

/**
 * create `FieldDefinitionNode`
 *
 * @category AST Node
 */
export function fieldDefinitionNode(props: FieldDefinitionNodeProps): GQL.FieldDefinitionNode {
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
export type InputValueDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  type: GQL.TypeNode | TypeNodeProps
  // TODO: allow coercing js value value by type?
  defaultValue?: GQL.ValueNode
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `InputValueDefinitionNode`
 *
 * @category AST Node
 */
export function inputValueDefinitionNode(props: InputValueDefinitionNodeProps): GQL.InputValueDefinitionNode {
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
export type InterfaceTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeDefinitionNode`
 *
 * @category AST Node
 */
export function interfaceTypeDefinitionNode(props: InterfaceTypeDefinitionNodeProps): GQL.InterfaceTypeDefinitionNode {
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
export type UnionTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeDefinitionNode`
 *
 * @category AST Node
 */
export function unionTypeDefinitionNode(props: UnionTypeDefinitionNodeProps): GQL.UnionTypeDefinitionNode {
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
export type EnumTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<GQL.EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeDefinitionNode`
 *
 * @category AST Node
 */
export function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): GQL.EnumTypeDefinitionNode {
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
 * `EnumValueDefinitionNode` create input subtype
 *
 * @category AST Node
 */
export type EnumValueDefinitionNodeObjProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * `EnumValueDefinitionNode` create input
 *
 * @category AST Node
 */
export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodeObjProps | string

/**
 * create `EnumValueDefinitionNode`
 *
 * @category AST Node
 */
export function enumValueDefinitionNode(props: EnumValueDefinitionNodeProps): GQL.EnumValueDefinitionNode {
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
export type InputObjectTypeDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeDefinitionNode(
  props: InputObjectTypeDefinitionNodeProps,
): GQL.InputObjectTypeDefinitionNode {
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
export type DirectiveDefinitionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  description?: GQL.StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
  repeatable?: boolean
  locations: ReadonlyArray<GQL.NameNode | GQL.DirectiveLocationEnum>
}

/**
 * create `DirectiveDefinitionNode`
 *
 * @category AST Node
 */
export function directiveDefinitionNode(props: DirectiveDefinitionNodeProps): GQL.DirectiveDefinitionNode {
  return {
    kind: Kind.DIRECTIVE_DEFINITION,
    name: applyProps(nameNode, props.name),
    description: applyPropsNullable(stringValueNode, props.description),
    arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
    repeatable: props.repeatable ?? false,
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
export type SchemaExtensionNodeProps = {
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<GQL.OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/**
 * create `SchemaExtensionNode`
 *
 * @category AST Node
 */
export function schemaExtensionNode(props: SchemaExtensionNodeProps): GQL.SchemaExtensionNode {
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
export type ScalarTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
}

/**
 * create `ScalarTypeExtensionNode`
 *
 * @category AST Node
 */
export function scalarTypeExtensionNode(props: ScalarTypeExtensionNodeProps): GQL.ScalarTypeExtensionNode {
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
export type ObjectTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  interfaces?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `ObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function objectTypeExtensionNode(
  props: ObjectTypeExtensionNodeProps,
): GQL.ObjectTypeExtensionNode {
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
export type InterfaceTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.FieldDefinitionNode | FieldDefinitionNodeProps>
}

/**
 * create `InterfaceTypeExtensionNode`
 *
 * @category AST Node
 */
export function interfaceTypeExtensionNode(props: InterfaceTypeExtensionNodeProps): GQL.InterfaceTypeExtensionNode {
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
export type UnionTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<GQL.NamedTypeNode | NamedTypeNodeProps>
}

/**
 * create `UnionTypeExtensionNode`
 *
 * @category AST Node
 */
export function unionTypeExtensionNode(props: UnionTypeDefinitionNodeProps): GQL.UnionTypeExtensionNode {
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
export type EnumTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<GQL.EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/**
 * create `EnumTypeExtensionNode`
 *
 * @category AST Node
 */
export function enumTypeExtensionNode(props: EnumTypeDefinitionNodeProps): GQL.EnumTypeExtensionNode {
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
export type InputObjectTypeExtensionNodeProps = {
  name: GQL.NameNode | NameNodeProps
  directives?: ReadonlyArray<GQL.DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/**
 * create `InputObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export function inputObjectTypeExtensionNode(
  props: InputObjectTypeDefinitionNodeProps,
): GQL.InputObjectTypeExtensionNode {
  return {
    kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
  }
}
