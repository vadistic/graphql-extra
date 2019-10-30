import {
  FieldDefinitionNode,
  DirectiveDefinitionNode,
  InputValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
} from 'graphql'
import { InputValueApi, inputValueApi } from '../apis'
import { InputValueDefinitionNodeProps, inputValueDefinitionNode } from '../../node'
import { getName } from '../../utils'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemove,
} from '../crud'

//
// ─── INPUT VALUES AS ARGUMENTS API MIXIN ────────────────────────────────────────
//

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

//
// ─── INPUT VALUES AS FIELDS API MIXIN ───────────────────────────────────────────
//

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
