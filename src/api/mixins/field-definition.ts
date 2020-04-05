import {
  ObjectTypeDefinitionNode,
  InterfaceTypeDefinitionNode,
  ObjectTypeExtensionNode,
  InterfaceTypeExtensionNode,
  FieldDefinitionNode,
  TypeNode,
} from 'graphql'
import {
  FieldDefinitionApi,
  TypeApi,
  InputValueApi,
  DirectiveApi,
  fieldDefinitionApi,
} from '../apis'
import { FieldDefinitionNodeProps, fieldDefinitionNode, TypeNodeProps } from '../../node'
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

/**
 * @category API Mixins
 */
export type FieldDefinitionsApiMixinCompatibleNode =
  | ObjectTypeDefinitionNode
  | InterfaceTypeDefinitionNode
  | ObjectTypeExtensionNode
  | InterfaceTypeExtensionNode

/**
 * @category API Mixins
 */
export interface FieldDefinitionsApiMixin<This> {
  getfieldnames(): string[]
  getFields(): FieldDefinitionApi[]

  getFieldsByTypename(typename: string): FieldDefinitionApi[]
  // TODO: getFieldsByType iwth type compare fn

  hasField(fieldname: string): boolean
  getField(fieldname: string): FieldDefinitionApi

  createField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  updateField(
    fieldname: string,
    props: Partial<FieldDefinitionNode | FieldDefinitionNodeProps>,
  ): This
  upsertField(props: FieldDefinitionNode | FieldDefinitionNodeProps): This
  removeField(fieldname: string): This

  getFieldTypename(fieldname: string): string
  setFieldTypename(fieldname: string, value: string): This

  getFieldType(fieldname: string): TypeApi
  setFieldType(fieldname: string, props: TypeNode | TypeNodeProps): This

  getFieldArguments(fieldname: string): InputValueApi[]
  getFieldDirectives(fieldname: string): DirectiveApi[]
}

/**
 * @category API Mixins
 */
export function fieldDefinitionsApiMixin<This>(
  node: FieldDefinitionsApiMixinCompatibleNode,
): FieldDefinitionsApiMixin<This> {
  return {
    getfieldnames() {
      return (node.fields ?? []).map((field) => field.name.value)
    },

    getFields() {
      return (node.fields ?? []).map(fieldDefinitionApi)
    },

    getFieldsByTypename(typename) {
      return this.getFields().filter((field) => field.getTypename() === typename)
    },

    hasField(fieldname) {
      return !!node.fields && node.fields.some((field) => field.name.value === fieldname)
    },

    getField(fieldname) {
      const field = oneToManyGet<FieldDefinitionNode>({
        node,
        key: 'fields',
        elementName: fieldname,
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

    removeField(fieldname) {
      oneToManyRemove({ node, key: 'fields', elementName: fieldname, parentName: node.name.value })

      return this as any
    },

    getFieldTypename(fieldname) {
      return this.getField(fieldname).getTypename()
    },

    setFieldTypename(fieldname, value) {
      this.getField(fieldname).setTypename(value)

      return this as any
    },

    getFieldType(fieldname) {
      return this.getField(fieldname).getType()
    },

    setFieldType(fieldname, props) {
      this.getField(fieldname).setType(props)

      return this as any
    },

    getFieldArguments(fieldname) {
      return this.getField(fieldname).getArguments()
    },

    getFieldDirectives(fieldname) {
      return this.getField(fieldname).getDirectives()
    },
  }
}
