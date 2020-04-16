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
import { Fieldname, Typename, Argname } from '../types'

/*
 * For some reason FieldDefinition & DirectiveDefinition InputValues are branded as arguments
 * Getting repetitive and verboose here to keep this convention
 */

/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsApiMixinNode = FieldDefinitionNode | DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export class InputValuesAsArgumentsApiMixin {
  constructor(readonly node: InputValuesAsArgumentsApiMixinNode) {}

  getArgnames(): Argname[] {
    return this.node.arguments?.map(getName) ?? []
  }

  getArguments(): InputValueApi[] {
    return this.node.arguments?.map(inputValueApi) ?? []
  }

  getArgumentsByTypename(typename: Typename): InputValueApi[] {
    return this.getArguments().filter((arg) => arg.getTypename() === typename)
  }

  hasArgument(argname: Argname) {
    return (this.node.arguments ?? []).some((arg) => arg.name.value === argname)
  }

  getArgument(argname: Argname) {
    const arg = oneToManyGet<InputValueDefinitionNode>({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
    })

    return inputValueApi(arg)
  }

  createArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'arguments',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertArgument(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'arguments',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateArgument(
    argname: Argname,
    props: Partial<InputValueDefinitionNode | InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  removeArgument(argname: Argname) {
    oneToManyRemove({
      node: this.node,
      key: 'arguments',
      elementName: argname,
      parentName: this.node.name.value,
    })

    return this
  }

  getArgumentType(argname: Argname): TypeApi {
    return this.getArgument(argname).getType()
  }

  setArgumentType(argname: Argname, props: TypeNode | TypeNodeProps) {
    this.getArgument(argname).setType(props)

    return this
  }

  getArgumentDefaultValue(argname: Argname): ValueNode | undefined {
    return this.getArgument(argname).getDefaultValue()
  }

  setArgumentDefualtValue(argname: Argname, props: ValueNode) {
    this.getArgument(argname).setDefaultValue(props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function inputValuesAsArgumentsApiMixin(node: InputValuesAsArgumentsApiMixinNode) {
  return new InputValuesAsArgumentsApiMixin(node)
}

/**
 * @category API Mixins
 */
export type InputValuesAsFieldsApiMixinNode =
  | InputObjectTypeDefinitionNode
  | InputObjectTypeExtensionNode

/**
 * @category API Mixins
 */
export class InputValuesAsFieldsApiMixin {
  constructor(protected node: InputValuesAsFieldsApiMixinNode) {}

  getFieldnames(): Fieldname[] {
    return this.node.fields?.map(getName) ?? []
  }

  getFields(): InputValueApi[] {
    return this.node.fields?.map(inputValueApi) ?? []
  }

  getFieldsByTypename(typename: Typename): InputValueApi[] {
    return this.getFields().filter((field) => field.getType().getTypename() === typename)
  }

  // TODO: add getFieldsByType with deep compare fn

  hasField(fieldname: Fieldname): boolean {
    return (this.node.fields ?? []).some((field) => field.name.value === fieldname)
  }

  getField(fieldname: Fieldname): InputValueApi {
    const arg = oneToManyGet<InputValueDefinitionNode>({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
    })

    return inputValueApi(arg)
  }

  createField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'fields',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertField(props: InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'fields',
      elementName: getName(props),
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<InputValueDefinitionNode | InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
      nodeCreateFn: inputValueDefinitionNode,
      props,
    })

    return this
  }

  removeField(fieldname: Fieldname): this {
    oneToManyRemove({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
    })

    return this
  }

  getFieldType(fieldname: Fieldname): TypeApi {
    return this.getField(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: TypeNode | TypeNodeProps): this {
    this.getField(fieldname).setType(props)

    return this
  }

  getFieldDefaultValue(fieldname: Fieldname): ValueNode | undefined {
    return this.getField(fieldname).getDefaultValue()
  }

  setFieldDefualtValue(fieldname: Fieldname, props: ValueNode): this {
    this.getField(fieldname).setDefaultValue(props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function inputValuesAsFieldsApiMixin(node: InputValuesAsFieldsApiMixinNode) {
  return new InputValuesAsFieldsApiMixin(node)
}
