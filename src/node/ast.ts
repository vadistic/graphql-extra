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

export type NameNodeProps = string

/** NameNode */
export function nameNode(value: NameNodeProps): NameNode {
  return {
    kind: Kind.NAME,
    value,
  }
}

//
// ─── DOCUMENT ───────────────────────────────────────────────────────────────────
//

export type DocumentNodeProps = ReadonlyArray<DefinitionNode>

/** DocumentNode */
export function documentNode(definitions: DocumentNodeProps): DocumentNode {
  return {
    kind: Kind.DOCUMENT,
    definitions,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** OperationDefinitionNode create input */
export interface OperationDefinitionNodeProps {
  name?: NameNode | NameNodeProps
  operation: OperationTypeNode
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/** OperationDefinitionNode */
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

/** VariableDefinitionNode create input */
export interface VariableDefinitionNodeProps {
  variable: VariableNode | VariableNodeProps
  type: TypeNode | TypeNodeProps
  defaultValue?: ValueNode
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/** VariableDefinitionNode */
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

export type VariableNodeProps = string

/** VariableNode */
export function variableNode(name: VariableNodeProps): VariableNode {
  return {
    kind: Kind.VARIABLE,
    name: nameNode(name),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** SelectionSetNode */
export type SelectionSetNodeProps = ReadonlyArray<SelectionNode | FieldNodeProps>

export function selectionSetNode(selections: SelectionSetNodeProps): SelectionSetNode {
  return {
    kind: Kind.SELECTION_SET,
    // bit unconventional because selection node is union, and fn is applied only for field props
    selections: selections.map(el => (isAstNode(el) ? el : applyProps(fieldNode, el))),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** FieldNode create input */
export interface FieldNodeObjProps {
  name: NameNode | NameNodeProps
  alias?: NameNode | NameNodeProps
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections?: SelectionSetNode | SelectionSetNodeProps
}

export type FieldNodeProps = FieldNodeObjProps | string

/** FieldNode */
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

/** ArgumentNode create input */
export interface ArgumentNodeProps {
  name: NameNode | NameNodeProps
  value: ValueNode
}

/** ArgumentNode */
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

/** FragmentSpreadNode create input */
export interface FragmentSpreadNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/** FragmentSpreadNode */
export function fragmentSpreadNode(props: FragmentSpreadNodeProps): FragmentSpreadNode {
  return {
    kind: Kind.FRAGMENT_SPREAD,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** InlineFragmentNode create input */
export interface InlineFragmentNodeProps {
  name: NameNode | NameNodeProps
  typeCondition?: NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/** InlineFragmentNode */
export function inlineFragmentNode(props: InlineFragmentNodeProps): InlineFragmentNode {
  return {
    kind: Kind.INLINE_FRAGMENT,
    typeCondition: applyPropsNullable(namedTypeNode, props.typeCondition),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    selectionSet: applyProps(selectionSetNode, props.selections),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** FragmentDefinitionNode create input */
export interface FragmentDefinitionNodeProps {
  name: NameNode | NameNodeProps
  variableDefinitions?: ReadonlyArray<VariableDefinitionNode | VariableDefinitionNodeProps>
  typeCondition: NamedTypeNode | NamedTypeNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  selections: SelectionSetNode | SelectionSetNodeProps
}

/** FragmentDefinitionNode */
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

export type IntValueNodeProps = string | number

/** IntValueNode */
export function intValueNode(value: IntValueNodeProps): IntValueNode {
  return {
    kind: Kind.INT,
    value: '' + value,
  }
}

export type FloatValueNodeProps = string | number

/** FloatValueNode */
export function floatValueNode(value: string | number): FloatValueNode {
  return {
    kind: Kind.FLOAT,
    value: '' + value,
  }
}

export type StringValueNodeProps = string

/** StringValueNode */
export function stringValueNode(value: StringValueNodeProps): StringValueNode {
  return {
    kind: Kind.STRING,
    value,
  }
}

export type BooleanValueNodeProps = boolean

/** BooleanValueNode */
export function booleanValueNode(value: BooleanValueNodeProps): BooleanValueNode {
  return {
    kind: Kind.BOOLEAN,
    value,
  }
}

/** NullValueNode */
export function nullValueNode(): NullValueNode {
  return {
    kind: Kind.NULL,
  }
}

export type EnumValueNodeProps = string

/** EnumValueNode */
export function enumValueNode(value: EnumValueNodeProps): EnumValueNode {
  return {
    kind: Kind.ENUM,
    value,
  }
}

export type ListValueNodeProps = ReadonlyArray<ValueNode>

/** ListValueNode */
export function listValueNode(values: ListValueNodeProps): ListValueNode {
  return {
    kind: Kind.LIST,
    values: values,
  }
}

export type ObjectValueNodeProps = ReadonlyArray<ObjectFieldNode>

/** ObjectValueNode */
export function objectValueNode(fields: ObjectValueNodeProps): ObjectValueNode {
  return {
    kind: Kind.OBJECT,
    fields: fields,
  }
}

/** ObjectFieldNode create input */
export interface ObjectFieldNodeProps {
  name: NameNode | NameNodeProps
  value: ValueNode
}

/** ObjectFieldNode */
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

export interface DirectiveNodeObjProps {
  name: NameNode | NameNodeProps
  arguments?: ReadonlyArray<ArgumentNode | ArgumentNodeProps>
}

/** DirectiveNode create input */
export type DirectiveNodeProps = DirectiveNodeObjProps | string

/** DirectiveNode */
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

/** NamedTypeNode create input */
export type NamedTypeNodeProps = NameNode | string

/** NamedTypeNode */
export function namedTypeNode(value: NamedTypeNodeProps): NamedTypeNode {
  return {
    kind: Kind.NAMED_TYPE,
    name: applyProps(nameNode, value),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** ListTypeNode create input */
export type ListTypeNodeProps = TypeNode | string

/** ListTypeNode */
export function listTypeNode(type: ListTypeNodeProps): ListTypeNode {
  const namedType = typeof type === 'string' ? namedTypeNode(type) : type

  return {
    kind: Kind.LIST_TYPE,
    type: namedType,
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** NonNullTypeNode create input */
export type NonNullTypeNodeProps = TypeNode | string

/** NonNullTypeNode */
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

export interface TypeNodeObjProps {
  // or should it be type: ??
  name: NamedTypeNode | string
  list?: boolean
  nonNull?: boolean
}

/** TypeNode create input */
export type TypeNodeProps = TypeNodeObjProps | string

/** TypeNode */
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

/** SchemaDefinitionNode create input */
export interface SchemaDefinitionNodeProps {
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/** SchemaDefinitionNode */
export function schemaDefinitionNode(props: SchemaDefinitionNodeProps): SchemaDefinitionNode {
  return {
    kind: Kind.SCHEMA_DEFINITION,
    directives: applyPropsNullableArr(directiveNode, props.directives),
    operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** OperationTypeDefinitionNode create input */
export interface OperationTypeDefinitionNodeProps {
  operation: OperationTypeNode
  type: NamedTypeNode | NamedTypeNodeProps
}

/** OperationTypeDefinitionNode */
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

/** ScalarTypeDefinitionNode create input */
export interface ScalarTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/** ScalarTypeDefinitionNode */
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

/** ObjectTypeDefinitionNode create input */
export interface ObjectTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  interfaces?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/** ObjectTypeDefinitionNode */
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

/** FieldDefinitionNode create input */
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

/** FieldDefinitionNode */
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

/** InputValueDefinitionNode create input */
export interface InputValueDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  type: TypeNode | TypeNodeProps
  // TODO: allow coercing js value value by type?
  defaultValue?: ValueNode
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/** InputValueDefinitionNode */
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

/** InterfaceTypeDefinitionNode create input */
export interface InterfaceTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/** InterfaceTypeDefinitionNode */
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

/** UnionTypeDefinitionNode create input */
export interface UnionTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
}

/** UnionTypeDefinitionNode */
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

/** EnumTypeDefinitionNode create input */
export interface EnumTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/** EnumTypeDefinitionNode */
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

/** EnumValueDefinitionNode create input */
export interface EnumValueDefinitionNodeObjProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

export type EnumValueDefinitionNodeProps = EnumValueDefinitionNodeObjProps | string

/** EnumValueDefinitionNode */
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

/** InputObjectTypeDefinitionNode create input */
export interface InputObjectTypeDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/** InputObjectTypeDefinitionNode */
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

/** DirectiveDefinitionNode create input */
export interface DirectiveDefinitionNodeProps {
  name: NameNode | NameNodeProps
  description?: StringValueNode | StringValueNodeProps
  arguments?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
  repeatable?: boolean
  locations: ReadonlyArray<NameNode | DirectiveLocationEnum>
}

/** DirectiveDefinitionNode */
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

/** SchemaExtensionNode create input */
export interface SchemaExtensionNodeProps {
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  operationTypes: ReadonlyArray<OperationTypeDefinitionNode | OperationTypeDefinitionNodeProps>
}

/** SchemaExtensionNode */
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

/** ScalarTypeExtensionNode create input */
export interface ScalarTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
}

/** ScalarTypeExtensionNode */
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

/** ObjectTypeExtensionNode create input */
export interface ObjectTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  interfaces?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/** ObjectTypeExtensionNode */
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

/** InterfaceTypeExtensionNode create input */
export interface InterfaceTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<FieldDefinitionNode | FieldDefinitionNodeProps>
}

/** InterfaceTypeExtensionNode */
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

/** UnionTypeExtensionNode create input */
export interface UnionTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  types?: ReadonlyArray<NamedTypeNode | NamedTypeNodeProps>
}

/** UnionTypeExtensionNode */
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

/** EnumTypeExtensionNode create input */
export interface EnumTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  values?: ReadonlyArray<EnumValueDefinitionNode | EnumValueDefinitionNodeProps>
}

/** EnumTypeExtensionNode */
export function enumTypeExtensionNode(props: EnumTypeDefinitionNodeProps): EnumTypeExtensionNode {
  return {
    kind: Kind.ENUM_TYPE_EXTENSION,
    name: applyProps(nameNode, props.name),
    directives: applyPropsNullableArr(directiveNode, props.directives),
    values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
  }
}

// ────────────────────────────────────────────────────────────────────────────────

/** InputObjectTypeExtensionNode create input */
export interface InputObjectTypeExtensionNodeProps {
  name: NameNode | NameNodeProps
  directives?: ReadonlyArray<DirectiveNode | DirectiveNodeProps>
  fields?: ReadonlyArray<InputValueDefinitionNode | InputValueDefinitionNodeProps>
}

/** InputObjectTypeExtensionNode */
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
