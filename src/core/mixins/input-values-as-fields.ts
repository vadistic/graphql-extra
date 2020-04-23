import type * as GQL from 'graphql'

import { InputValueDefinitionNodeProps, inputValueDefinitionNode, TypeNodeProps } from '../../node'
import { InputValueApi, inputValueApi } from '../api/input-value-and-field-definition'
import type { TypeApi } from '../api/type'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemove,
} from '../crud'
import { getName } from '../helper'
import type { Fieldname, Typename } from '../types'

/**
 * @category API Mixins
 */
export type InputValuesAsFieldsApiMixinNode =
  | GQL.InputObjectTypeDefinitionNode
  | GQL.InputObjectTypeExtensionNode

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
    const arg = oneToManyGet<GQL.InputValueDefinitionNode>({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
    })

    return inputValueApi(arg)
  }

  createField(props: GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
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

  upsertField(props: GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps): this {
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
    props: Partial<GQL.InputValueDefinitionNode | InputValueDefinitionNodeProps>,
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

  setFieldType(fieldname: Fieldname, props: GQL.TypeNode | TypeNodeProps): this {
    this.getField(fieldname).setType(props)

    return this
  }

  getFieldDefaultValue(fieldname: Fieldname): GQL.ValueNode | undefined {
    return this.getField(fieldname).getDefaultValue()
  }

  setFieldDefualtValue(fieldname: Fieldname, props: GQL.ValueNode): this {
    this.getField(fieldname).setDefaultValue(props)

    return this
  }
}

/**
 * @category API Mixins
 */
export function inputValuesAsFieldsApiMixin(
  node: InputValuesAsFieldsApiMixinNode,
): InputValuesAsFieldsApiMixin {
  return new InputValuesAsFieldsApiMixin(node)
}
