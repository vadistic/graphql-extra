import {
  TypeDefinitionNode,
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  FieldDefinitionNode,
  DirectiveDefinitionNode,
  TypeExtensionNode,
  InputValueDefinitionNode,
  EnumValueDefinitionNode,
  TypeSystemExtensionNode,
  SchemaDefinitionNode,
  DirectiveNode,
  ArgumentNode,
  NamedTypeNode,
  TypeNode,
  VariableDefinitionNode,
  FieldNode,
} from 'graphql'
import {
  stringValueNode,
  FieldDefinitionNodeProps,
  fieldDefinitionNode,
  nameNode,
  DirectiveNodeProps,
  directiveNode,
  TypeNodeProps,
  ArgumentNodeProps,
  argumentNode,
} from './node'
import { DeepMutable, getName } from './utils'
import {
  FieldApi,
  fieldApi,
  TypeApi,
  DirectiveApi,
  directiveApi,
  typeApi,
  ArgumentApi,
  argumentApi,
} from './api-nested'
import { oneToManyRemove, oneToManyUpsert, oneToManyUpdate, oneToManyCreate } from './api-crud'

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
  getDescription(): string | undefined
  hasDescription(): boolean
  setDescription(value?: string): This
}

export function descriptionApiMixin<This>(
  node: DescriptionApiMixinCompatibleNode,
): DescriptionApiMixin<This> {
  const _node = node as DeepMutable<TypeDefinitionNode>

  return {
    getDescription() {
      return node.description ? node.description.value : undefined
    },

    hasDescription() {
      return !!node.description
    },

    setDescription(value) {
      if (!value) {
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
  getTypename(): string
  getNamedType(): NamedTypeNode

  setTypename(value: string): This
  setType(props: TypeNode | TypeNodeProps): This
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
  }
}

// ────────────────────────────────────────────────────────────────────────────────

export type ArgumentsMixinCompatibleNode = DirectiveNode | FieldNode

export interface ArgumentsApiMixin<This> {
  getArgumentNames(): string[]
  getArguments(): ArgumentApi[]

  getArgument(argumentName: string): ArgumentApi
  hasArgument(argumentName: string): boolean

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

    getArguments() {
      return (node.arguments || []).map(argumentApi)
    },

    getArgument(argName) {
      const arg = node.arguments && node.arguments.find(arg => arg.name.value === argName)

      if (!arg) {
        throw Error(
          this.getArgument.name + `: argument '${argName} on ${node.name.value} does not exist`,
        )
      }

      return argumentApi(arg)
    },

    hasArgument(argName) {
      return !!node.arguments && node.arguments.some(arg => arg.name.value === argName)
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
  // getters multi
  getDirectiveNames(): string[]
  getDirectives(): DirectiveApi[]

  // getters single
  getDirective(directiveName: string): DirectiveApi
  hasDirective(directiveName: string): boolean

  // crud
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

    getDirectives() {
      return (node.directives || []).map(directiveApi)
    },

    getDirective(directiveName) {
      const directive =
        node.directives && node.directives.find(dir => dir.name.value === directiveName)

      if (!directive) {
        throw Error(
          this.getDirective.name + `: '${directiveName}' on '${getName(node)}' does not exist`,
        )
      }

      return directiveApi(directive)
    },

    hasDirective(directiveName) {
      return !!node.directives && node.directives.some(dir => dir.name.value === directiveName)
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

export type FieldsApiMixinCompatibleNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

export interface FieldsApiMixin<This> {
  getFieldNames(): string[]
  getFields(): FieldApi[]

  getField(fieldname: string): FieldApi
  hasField(fieldname: string): boolean

  createField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  updateField(
    fieldname: string,
    props: Partial<FieldDefinitionNode | FieldDefinitionNodeProps>,
  ): This
  upsertField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  removeField(fieldname: string): This

  getFieldType(fieldname: string): TypeApi
  // getFieldArguments(fieldname: string): InputValueApi[]
  getFieldDirectives(fieldname: string): DirectiveApi[]
}

export function fieldsApiMixin<This>(node: FieldsApiMixinCompatibleNode): FieldsApiMixin<This> {
  return {
    getFieldNames() {
      return node.fields ? node.fields.map(field => field.name.value) : []
    },

    getFields() {
      return node.fields ? node.fields.map(fieldApi) : []
    },

    getField(fieldname) {
      const field = node.fields && node.fields.find(field => field.name.value === fieldname)

      if (!field) {
        throw Error(
          this.getField.name + `: field '${fieldname}' on '${node.name.value}' does not exist`,
        )
      }

      return fieldApi(field)
    },

    hasField(fieldname) {
      return !!node.fields && node.fields.some(field => field.name.value === fieldname)
    },

    createField(props) {
      const fieldname = typeof props.name === 'string' ? props.name : props.name.value

      oneToManyCreate({
        node,
        key: 'fields',
        elementName: fieldname,
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    updateField(fieldname, props) {
      oneToManyUpdate({
        node,
        key: 'fields',
        elementName: fieldname,
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    upsertField(props) {
      const fieldname = typeof props.name === 'string' ? props.name : props.name.value

      oneToManyUpsert({
        node,
        key: 'fields',
        elementName: fieldname,
        parentName: node.name.value,
        nodeCreateFn: fieldDefinitionNode,
        props,
      })

      return this as any
    },

    removeField(fieldname) {
      oneToManyRemove({ node, key: 'fields', elementName: fieldname, parentName: node.name.value })

      return this as any
    },

    getFieldType(fieldname) {
      return this.getField(fieldname).getType()
    },

    // getFieldArguments(fieldname) {
    //   return this.getField(fieldname).getArguments()
    // },

    getFieldDirectives(fieldname) {
      return this.getField(fieldname).getDirectives()
    },
  }
}
