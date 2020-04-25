import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Typename } from '../types'
import {
  getName,
  oneToManyCreate,
  oneToManyFindOneOrFail,
  oneToManyRemoveOrFail,
  oneToManyUpdate,
  oneToManyUpsert,
} from '../utils'

/**
 * @category API Mixins
 */
export type FieldDefinitionsApiMixinNode =
  | GQL.InterfaceTypeDefinitionNode
  | GQL.InterfaceTypeExtensionNode
  | GQL.ObjectTypeDefinitionNode
  | GQL.ObjectTypeExtensionNode

/**
 * @category API Mixins
 */
export class FieldDefinitionsApiMixin {
  constructor(readonly node: FieldDefinitionsApiMixinNode) {}

  getFieldnames(): Fieldname[] {
    return this.node.fields?.map((field) => field.name.value) ?? []
  }

  getFields(): Api.FieldDefinitionApi[] {
    return this.node.fields?.map(Api.fieldDefinitionApi) ?? []
  }

  getFieldsByTypename(typename: Typename): Api.FieldDefinitionApi[] {
    return this.getFields().filter((field) => field.getTypename() === typename)
  }

  hasField(fieldname: Fieldname): boolean {
    if (!this.node.fields) {
      return false
    }

    return this.node.fields.some((field) => field.name.value === fieldname)
  }

  getField(fieldname: Fieldname): Api.FieldDefinitionApi {
    const field = oneToManyFindOneOrFail({
      node: this.node,
      key: 'fields',
      target: fieldname,
      getter: (el) => el.name.value,
    })

    return Api.fieldDefinitionApi(field)
  }

  createField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this {
    oneToManyCreate({
      node: this.node,
      key: 'fields',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.fieldDefinitionNode,
      props,
    })

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode >,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'fields',
      target: fieldname,
      getter: (el) => el.name.value,
      factory: Ast.fieldDefinitionNode,
      props,
    })

    return this
  }

  upsertField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this {
    oneToManyUpsert({
      node: this.node,
      key: 'fields',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.fieldDefinitionNode,
      props,
    })

    return this
  }

  removeField(fieldname: Fieldname): this {
    oneToManyRemoveOrFail({
      node: this.node,
      key: 'fields',
      target: fieldname,
      getter: (el) => el.name.value,
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

  getFieldType(fieldname: Fieldname): Api.TypeApi {
    return this.getField(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: Ast.TypeNodeProps | GQL.TypeNode): this {
    this.getField(fieldname).setType(props)

    return this
  }

  getFieldArguments(fieldname: Fieldname): Api.InputValueApi[] {
    return this.getField(fieldname).getArguments()
  }

  getFieldDirectives(fieldname: Fieldname): Api.DirectiveApi[] {
    return this.getField(fieldname).getDirectives()
  }
}

/**
 * @category API Mixins
 */
export function fieldDefinitionsApiMixin(
  node: FieldDefinitionsApiMixinNode,
): FieldDefinitionsApiMixin {
  return new FieldDefinitionsApiMixin(node)
}
