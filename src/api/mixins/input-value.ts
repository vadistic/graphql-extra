import {
  FieldDefinitionNode,
  DirectiveDefinitionNode,
  InputValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  TypeNode,
  ValueNode,
} from 'graphql'
import { InputValueApi, inputValueApi, TypeApi } from '../apis'
import { InputValueDefinitionNodeProps, inputValueDefinitionNode, TypeNodeProps } from '../../node'
import { getName } from '../../utils'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemove,
} from '../crud'

/**
 * For some reason FieldDefinition & DirectiveDefinition InputValues are branded as arguments
 * Getting repetitive and verboose here to keep this convention
 */

/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsApiMixinCompatibleNode =
  | FieldDefinitionNode
  | DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export interface InputValuesAsArgumentsApiMixin<This> {
  getargnames(): string[]
  getArguments(): InputValueApi[]

  getArgumentsByTypename(typename: string): InputValueApi[]
  // TODO: getFieldsByType iwth type compare fn

  hasArgument(argname: string): boolean
  getArgument(argname: string): InputValueApi

  createArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  upsertArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  updateArgument(
    argname: string,
    props: InputValueDefinitionNode | InputValueDefinitionNodeProps,
  ): This
  removeArgument(argname: string): This

  getArgumentType(argname: string): TypeApi
  setArgumentType(argname: string, props: TypeNode | TypeNodeProps): TypeApi

  getArgumentDefaultValue(argname: string): ValueNode | undefined
  setArgumentDefualtValue(argname: string, props: ValueNode): This
}

/**
 * @category API Mixins
 */
export function inputValuesAsArgumentsApiMixin<This>(
  node: InputValuesAsArgumentsApiMixinCompatibleNode,
): InputValuesAsArgumentsApiMixin<This> {
  return {
    getargnames() {
      return (node.arguments || []).map(getName)
    },

    getArguments() {
      return (node.arguments || []).map(inputValueApi)
    },

    getArgumentsByTypename(typename) {
      return this.getArguments().filter(arg => arg.getTypename() === typename)
    },

    hasArgument(argname) {
      return (node.arguments || []).some(arg => arg.name.value === argname)
    },

    getArgument(argname) {
      const arg = oneToManyGet<InputValueDefinitionNode>({
        node,
        key: 'arguments',
        elementName: argname,
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

    updateArgument(argname, props) {
      oneToManyUpdate({
        node,
        key: 'arguments',
        elementName: argname,
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    removeArgument(argname) {
      oneToManyRemove({
        node,
        key: 'arguments',
        elementName: argname,
        parentName: node.name.value,
      })

      return this as any
    },

    getArgumentType(argname) {
      return this.getArgument(argname).getType()
    },

    setArgumentType(argname, props: TypeNode | TypeNodeProps) {
      this.getArgument(argname).setType(props)

      return this as any
    },

    getArgumentDefaultValue(argname) {
      return this.getArgument(argname).getDefaultValue()
    },

    setArgumentDefualtValue(argname: string, props: ValueNode) {
      this.getArgument(argname).setDefaultValue(props)

      return this as any
    },
  }
}

/**
 * @category API Mixins
 */
export type InputValuesAsFieldsApiMixinCompatibleNode =
  | InputObjectTypeDefinitionNode
  | InputObjectTypeExtensionNode

/**
 * @category API Mixins
 */
export interface InputValuesAsFieldsApiMixin<This> {
  getfieldnames(): string[]
  getFields(): InputValueApi[]

  getFieldsByTypename(typename: string): InputValueApi[]
  // TODO: getFieldsByType iwth type compare fn

  hasField(fieldname: string): boolean
  getField(fieldname: string): InputValueApi

  createField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  upsertField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): This
  updateField(
    fieldname: string,
    props: InputValueDefinitionNode | InputValueDefinitionNodeProps,
  ): This
  removeField(fieldname: string): This

  getFieldType(fieldname: string): TypeApi
  setFieldType(fieldname: string, props: TypeNode | TypeNodeProps): TypeApi

  getFieldDefaultValue(fieldname: string): ValueNode | undefined
  setFieldDefualtValue(fieldname: string, props: ValueNode): This
}

/**
 * @category API Mixins
 */
export function inputValuesAsFieldsApiMixin<This>(
  node: InputValuesAsFieldsApiMixinCompatibleNode,
): InputValuesAsFieldsApiMixin<This> {
  return {
    getfieldnames() {
      return (node.fields || []).map(getName)
    },

    getFields() {
      return (node.fields || []).map(inputValueApi)
    },

    getFieldsByTypename(typename) {
      return this.getFields().filter(field => field.getType().getTypename() === typename)
    },

    hasField(fieldname) {
      return (node.fields || []).some(field => field.name.value === fieldname)
    },

    getField(fieldname) {
      const arg = oneToManyGet<InputValueDefinitionNode>({
        node,
        key: 'fields',
        elementName: fieldname,
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

    updateField(fieldname, props) {
      oneToManyUpdate({
        node,
        key: 'fields',
        elementName: fieldname,
        parentName: node.name.value,
        nodeCreateFn: inputValueDefinitionNode,
        props,
      })

      return this as any
    },

    removeField(fieldname) {
      oneToManyRemove({
        node,
        key: 'fields',
        elementName: fieldname,
        parentName: node.name.value,
      })

      return this as any
    },

    getFieldType(fieldname) {
      return this.getField(fieldname).getType()
    },

    setFieldType(fieldname, props: TypeNode | TypeNodeProps) {
      this.getField(fieldname).setType(props)

      return this as any
    },

    getFieldDefaultValue(fieldname) {
      return this.getField(fieldname).getDefaultValue()
    },

    setFieldDefualtValue(fieldname: string, props: ValueNode) {
      this.getField(fieldname).setDefaultValue(props)

      return this as any
    },
  }
}
