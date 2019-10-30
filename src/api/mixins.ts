import {
  ArgumentNode,
  DirectiveDefinitionNode,
  DirectiveNode,
  EnumValueDefinitionNode,
  FieldDefinitionNode,
  FieldNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  InterfaceTypeExtensionNode,
  NamedTypeNode,
  ObjectTypeDefinitionNode,
  ObjectTypeExtensionNode,
  SchemaDefinitionNode,
  TypeDefinitionNode,
  TypeExtensionNode,
  TypeNode,
  TypeSystemExtensionNode,
  VariableDefinitionNode,
} from 'graphql'
import {
  argumentNode,
  ArgumentNodeProps,
  directiveNode,
  DirectiveNodeProps,
  fieldDefinitionNode,
  FieldDefinitionNodeProps,
  inputValueDefinitionNode,
  InputValueDefinitionNodeProps,
  nameNode,
  stringValueNode,
  TypeNodeProps,
} from '../node/ast'
import { DeepMutable, getName } from '../utils'
import {
  oneToManyCreate,
  oneToManyGet,
  oneToManyRemove,
  oneToManyUpdate,
  oneToManyUpsert,
} from './crud'
import {
  ArgumentApi,
  argumentApi,
  DirectiveApi,
  directiveApi,
  FieldApi,
  fieldApi,
  InputValueApi,
  inputValueApi,
  TypeApi,
  typeApi,
} from './nested'

// ────────────────────────────────────────────────────────────────────────────────

export type NameApiMixinCompatibleNode =
  | TypeDefinitionNode
  | DirectiveDefinitionNode
  | TypeExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode
  | DirectiveNode
  | ArgumentNode

export interface NameApiMixin<This> {
  getName(): string
  setName(value: string): This
}

export function nameApiMixin<This>(node: NameApiMixinCompatibleNode): NameApiMixin<This> {
  const _node = node as DeepMutable<NameApiMixinCompatibleNode>

  return {
    getName() {
      return node.name.value
    },

    setName(value) {
      _node.name = nameNode(value)

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type DescriptionApiMixinCompatibleNode =
  | TypeDefinitionNode
  | DirectiveDefinitionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode

export interface DescriptionApiMixin<This> {
  hasDescription(): boolean
  getDescription(): string | undefined
  setDescription(value?: string): This
}

export function descriptionApiMixin<This>(
  node: DescriptionApiMixinCompatibleNode,
): DescriptionApiMixin<This> {
  const _node = node as DeepMutable<TypeDefinitionNode>

  return {
    hasDescription() {
      return !!node.description
    },

    getDescription() {
      return node.description ? node.description.value : undefined
    },

    setDescription(value) {
      if (typeof value === 'undefined') {
        _node.description = undefined
      } else {
        _node.description = stringValueNode(value)
      }

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type TypeApiMixinCompatibleNode =
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | VariableDefinitionNode

export interface TypeApiMixin<This> {
  getType(): TypeApi

  getNamedType(): NamedTypeNode
  getTypename(): string

  setTypename(value: string): This
  setType(props: TypeNode | TypeNodeProps): This

  isNonNullType(deep?: boolean): boolean
  isListType(deep?: boolean): boolean

  setNonNullType(value?: boolean): This
  setListType(value?: boolean): This
}

export function typeApiMixin<This>(node: TypeApiMixinCompatibleNode): TypeApiMixin<This> {
  return {
    getType() {
      return typeApi(node.type)
    },

    getTypename() {
      return this.getType().getTypename()
    },

    getNamedType() {
      return this.getType().getNamedType()
    },

    setTypename(value) {
      this.getType().setTypename(value)

      return this as any
    },

    setType(props) {
      this.getType().setType(props)

      return this as any
    },

    isNonNullType(deep) {
      return this.getType().isNonNull(deep)
    },

    isListType(deep) {
      return this.getType().isList(deep)
    },

    setNonNullType(value) {
      this.getType().setNonNull(value)

      return this as any
    },

    setListType(value) {
      this.getType().setList(value)

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type ArgumentsMixinCompatibleNode = DirectiveNode | FieldNode

export interface ArgumentsApiMixin<This> {
  getArgumentNames(): string[]
  getArguments(): ArgumentApi[]

  hasArgument(argumentName: string): boolean
  getArgument(argumentName: string): ArgumentApi

  createArgument(props: ArgumentNode | ArgumentNodeProps): This
  updateArgument(argumentName: string, props: ArgumentNode | ArgumentNodeProps): This
  upsertArgument(props: ArgumentNode | ArgumentNodeProps): This
  removeArgument(argumentName: string): This
}

export function argumentsApiMixin<This>(
  node: ArgumentsMixinCompatibleNode,
): ArgumentsApiMixin<This> {
  return {
    getArgumentNames() {
      return (node.arguments || []).map(arg => arg.name.value)
    },

    hasArgument(argName) {
      return !!node.arguments && node.arguments.some(arg => arg.name.value === argName)
    },

    getArguments() {
      return (node.arguments || []).map(argumentApi)
    },

    getArgument(argName) {
      const arg = oneToManyGet<ArgumentNode>({
        node,
        key: 'arguments',
        elementName: argName,
        parentName: node.name.value,
      })

      return argumentApi(arg)
    },

    createArgument(props) {
      oneToManyCreate({
        node,
        key: 'arguments',
        elementName: getName(props.name),
        parentName: node.name.value,
        nodeCreateFn: argumentNode,
        props,
      })

      return this as any
    },

    updateArgument(argumentName, props) {
      oneToManyUpdate({
        node,
        key: 'arguments',
        elementName: argumentName,
        parentName: node.name.value,
        nodeCreateFn: argumentNode,
        props,
      })

      return this as any
    },

    upsertArgument(props) {
      oneToManyUpsert({
        node,
        key: 'arguments',
        elementName: getName(props.name),
        parentName: node.name.value,
        nodeCreateFn: argumentNode,
        props,
      })

      return this as any
    },

    removeArgument(argumentName) {
      oneToManyRemove({
        node,
        key: 'arguments',
        elementName: argumentName,
        parentName: node.name.value,
      })

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type DirectivesApiMixinCompatibleNode =
  | SchemaDefinitionNode
  | TypeDefinitionNode
  | TypeSystemExtensionNode
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | EnumValueDefinitionNode

export interface DirectivesApiMixin<This> {
  getDirectiveNames(): string[]
  getDirectives(): DirectiveApi[]

  hasDirective(directiveName: string): boolean
  getDirective(directiveName: string): DirectiveApi

  createDirective(props: DirectiveNode | DirectiveNodeProps): This
  updateDirective(directiveName: string, props: DirectiveNode | DirectiveNodeProps): This
  upsertDirective(props: DirectiveNode | DirectiveNodeProps): This
  removeDirective(directiveName: string): This
}

export function directivesApiMixin<This>(
  node: DirectivesApiMixinCompatibleNode,
): DirectivesApiMixin<This> {
  return {
    getDirectiveNames() {
      return (node.directives || []).map(dir => dir.name.value)
    },

    hasDirective(directiveName) {
      return !!node.directives && node.directives.some(dir => dir.name.value === directiveName)
    },

    getDirectives() {
      return (node.directives || []).map(directiveApi)
    },

    getDirective(directiveName) {
      const directive = oneToManyGet<DirectiveNode>({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
      })

      return directiveApi(directive)
    },

    createDirective(props) {
      oneToManyCreate({
        node,
        key: 'directives',
        elementName: getName(props),
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    updateDirective(directiveName, props) {
      oneToManyUpdate({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    upsertDirective(props) {
      oneToManyUpsert({
        node,
        key: 'directives',
        elementName: getName(props),
        parentName: getName(node),
        nodeCreateFn: directiveNode,
        props,
      })

      return this as any
    },

    removeDirective(directiveName) {
      oneToManyRemove({
        node,
        key: 'directives',
        elementName: directiveName,
        parentName: getName(node),
      })

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type FieldDefinitionsApiMixinCompatibleNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

export interface FieldDefinitionsApiMixin<This> {
  getFieldNames(): string[]
  getFields(): FieldApi[]

  hasField(fieldName: string): boolean
  getField(fieldName: string): FieldApi

  createField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  updateField(
    fieldname: string,
    props: Partial<FieldDefinitionNode | FieldDefinitionNodeProps>,
  ): This
  upsertField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  removeField(fieldName: string): This

  getFieldType(fieldname: string): TypeApi
  getFieldArguments(fieldname: string): InputValueApi[]
  getFieldDirectives(fieldName: string): DirectiveApi[]
}

export function fieldDefinitionsApiMixin<This>(
  node: FieldDefinitionsApiMixinCompatibleNode,
): FieldDefinitionsApiMixin<This> {
  return {
    getFieldNames() {
      return (node.fields || []).map(field => field.name.value)
    },

    getFields() {
      return (node.fields || []).map(fieldApi)
    },

    hasField(fieldName) {
      return !!node.fields && node.fields.some(field => field.name.value === fieldName)
    },

    getField(fieldName) {
      const field = oneToManyGet<FieldDefinitionNode>({
        node,
        key: 'fields',
        elementName: fieldName,
        parentName: node.name.value,
      })

      return fieldApi(field)
    },

    createField(props) {
      oneToManyCreate({
        node,
        key: 'fields',
        elementName: getName(props.name),
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    updateField(fieldName, props) {
      oneToManyUpdate({
        node,
        key: 'fields',
        elementName: fieldName,
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    upsertField(props) {
      oneToManyUpsert({
        node,
        key: 'fields',
        elementName: getName(props.name),
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    removeField(fieldName) {
      oneToManyRemove({ node, key: 'fields', elementName: fieldName, parentName: node.name.value })

      return this as any
    },

    getFieldType(fieldName) {
      return this.getField(fieldName).getType()
    },

    getFieldArguments(fieldname) {
      return this.getField(fieldname).getArguments()
    },

    getFieldDirectives(fieldName) {
      return this.getField(fieldName).getDirectives()
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

// For some reason FieldDefinition & DirectiveDefinition InputValues are branded as arguments
// Getting repetitive and verboose here to keep this convention

export type InputValuesAsArgumentsApiMixinCompatibleNode =
  | FieldDefinitionNode
  | DirectiveDefinitionNode

export interface InputValuesAsArgumentsApiMixin<This> {
  getArgumentNames(): string[]
  getArguments(): InputValueApi[]

  hasArgument(argumentName: string): boolean
  getArgument(argumentName: string): InputValueApi

  createArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  upsertArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  updateArgument(
    argumentName: string,
    props: InputValueDefinitionNode | InputValueDefinitionNodeProps,
  ): This
  removeArgument(argumentName: string): This
}

export function inputValuesAsArgumentsApiMixin<This>(
  node: InputValuesAsArgumentsApiMixinCompatibleNode,
): InputValuesAsArgumentsApiMixin<This> {
  return {
    getArgumentNames() {
      return (node.arguments || []).map(getName)
    },

    getArguments() {
      return (node.arguments || []).map(inputValueApi)
    },

    hasArgument(argumentName) {
      return (node.arguments || []).some(arg => arg.name.value === argumentName)
    },

    getArgument(argumentName) {
      const arg = oneToManyGet<InputValueDefinitionNode>({
        node,
        key: 'arguments',
        elementName: argumentName,
        parentName: node.name.value,
      })

      return inputValueApi(arg)
    },

    createArgument(props) {
      oneToManyCreate({
        node,
        key: 'arguments',
        elementName: getName(props),
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    upsertArgument(props) {
      oneToManyUpsert({
        node,
        key: 'arguments',
        elementName: getName(props),
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    updateArgument(argumentName, props) {
      oneToManyUpdate({
        node,
        key: 'arguments',
        elementName: argumentName,
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    removeArgument(argumentName) {
      oneToManyRemove({
        node,
        key: 'arguments',
        elementName: argumentName,
        parentName: node.name.value,
      })

      return this as any
    },
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type InputValuesAsFieldsApiMixinCompatibleNode =
  | InputObjectTypeDefinitionNode
  | InputObjectTypeExtensionNode

export interface InputValuesAsFieldsApiMixin<This> {
  getFieldNames(): string[]
  getFields(): InputValueApi[]

  hasField(fieldName: string): boolean
  getField(fieldName: string): InputValueApi

  createField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  upsertField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  updateField(
    fieldName: string,
    props: InputValueDefinitionNode | InputValueDefinitionNodeProps,
  ): This
  removeField(fieldName: string): This
}

export function inputValuesAsFieldsApiMixin<This>(
  node: InputValuesAsFieldsApiMixinCompatibleNode,
): InputValuesAsFieldsApiMixin<This> {
  return {
    getFieldNames() {
      return (node.fields || []).map(getName)
    },

    getFields() {
      return (node.fields || []).map(inputValueApi)
    },

    hasField(fieldName) {
      return (node.fields || []).some(field => field.name.value === fieldName)
    },

    getField(fieldName) {
      const arg = oneToManyGet<InputValueDefinitionNode>({
        node,
        key: 'fields',
        elementName: fieldName,
        parentName: node.name.value,
      })

      return inputValueApi(arg)
    },

    createField(props) {
      oneToManyCreate({
        node,
        key: 'fields',
        elementName: getName(props),
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    upsertField(props) {
      oneToManyUpsert({
        node,
        key: 'fields',
        elementName: getName(props),
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    updateField(fieldName, props) {
      oneToManyUpdate({
        node,
        key: 'fields',
        elementName: fieldName,
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    removeField(fieldName) {
      oneToManyRemove({
        node,
        key: 'fields',
        elementName: fieldName,
        parentName: node.name.value,
      })

      return this as any
    },
  }
}
