import type {
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  FieldDefinitionNode,
  TypeNode,
} from 'graphql'

import { FieldDefinitionNodeProps, fieldDefinitionNode, TypeNodeProps } from '../../node'
import { getName } from '../../utils'
import type { DirectiveApi } from '../apis/directive'
import { FieldDefinitionApi, fieldDefinitionApi } from '../apis/input-value-and-field-definition'
import type { InputValueApi } from '../apis/input-value-and-field-definition'
import { TypeApi } from '../apis/type'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemove,
} from '../crud'
import type { Fieldname, Typename } from '../types'

/**
 * @category API Mixins
 */
export type FieldDefinitionsApiMixinNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

/**
 * @category API Mixins
 */
export class FieldDefinitionsApiMixin {
  constructor(readonly node: FieldDefinitionsApiMixinNode) {}

  getFieldnames(): Fieldname[] {
    return this.node.fields?.map((field) => field.name.value) ?? []
  }

  getFields(): FieldDefinitionApi[] {
    return this.node.fields?.map(fieldDefinitionApi) ?? []
  }

  getFieldsByTypename(typename: Typename): FieldDefinitionApi[] {
    return this.getFields().filter((field) => field.getTypename() === typename)
  }

  hasField(fieldname: Fieldname): boolean {
    if (!this.node.fields) {
      return false
    }

    return this.node.fields.some((field) => field.name.value === fieldname)
  }

  getField(fieldname: Fieldname): FieldDefinitionApi {
    const field = oneToManyGet<FieldDefinitionNode>({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
    })

    return fieldDefinitionApi(field)
  }

  createField(props: FieldDefinitionNode | FieldDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'fields',
      elementName: getName(props.name),
      parentName: this.node.name.value,
      nodeCreateFn: fieldDefinitionNode,
      props,
    })

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<FieldDefinitionNode | FieldDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'fields',
      elementName: fieldname,
      parentName: this.node.name.value,
      nodeCreateFn: fieldDefinitionNode,
      props,
    })

    return this
  }

  upsertField(props: FieldDefinitionNode | FieldDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'fields',
      elementName: getName(props.name),
      parentName: this.node.name.value,
      nodeCreateFn: fieldDefinitionNode,
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

  getFieldTypename(fieldname: Fieldname): Typename {
    return this.getField(fieldname).getTypename()
  }

  setFieldTypename(fieldname: Fieldname, value: Typename): this {
    this.getField(fieldname).setTypename(value)

    return this
  }

  getFieldType(fieldname: Fieldname): TypeApi {
    return this.getField(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: TypeNode | TypeNodeProps): this {
    this.getField(fieldname).setType(props)

    return this
  }

  getFieldArguments(fieldname: Fieldname): InputValueApi[] {
    return this.getField(fieldname).getArguments()
  }

  getFieldDirectives(fieldname: Fieldname): DirectiveApi[] {
    return this.getField(fieldname).getDirectives()
  }
}

/**
 * @category API Mixins
 */
export function fieldDefinitionsApiMixin(node: FieldDefinitionsApiMixinNode) {
  return new FieldDefinitionsApiMixin(node)
}
