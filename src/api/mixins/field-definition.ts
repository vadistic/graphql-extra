import {
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  FieldDefinitionNode,
} from 'graphql'
import {
  FieldDefinitionApi,
  TypeApi,
  InputValueApi,
  DirectiveApi,
  fieldDefinitionApi,
} from '../apis'
import { FieldDefinitionNodeProps, fieldDefinitionNode } from '../../node'
import {
  oneToManyGet,
  oneToManyCreate,
  oneToManyUpdate,
  oneToManyUpsert,
  oneToManyRemove,
} from '../crud'
import { getName } from '../../utils'

//
// ─── FIELD DEFINITIONS API MIXIN ────────────────────────────────────────────────
//

export type FieldDefinitionsApiMixinCompatibleNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

export interface FieldDefinitionsApiMixin<This> {
  getFieldNames(): string[]
  getFields(): FieldDefinitionApi[]

  hasField(fieldName: string): boolean
  getField(fieldName: string): FieldDefinitionApi

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
      return (node.fields || []).map(fieldDefinitionApi)
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

      return fieldDefinitionApi(field)
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
