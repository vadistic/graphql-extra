import type {
  InputValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  InputObjectTypeExtensionNode,
  TypeNode,
  ValueNode,
} from 'graphql'

import { InputValueDefinitionNodeProps, inputValueDefinitionNode, TypeNodeProps } from '../../node'
import { getName } from '../../utils'
import { InputValueApi, inputValueApi } from '../apis/input-value-and-field-definition'
import type { TypeApi } from '../apis/type'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemove,
} from '../crud'
import type { Fieldname, Typename } from '../types'

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
    if (!this.node.fields) return false

    return this.node.fields.some((field) => field.name.value === fieldname)
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
