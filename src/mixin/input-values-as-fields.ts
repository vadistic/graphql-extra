import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Typename } from '../types'
import {
  oneToManyCreate,
  oneToManyUpsert,
  oneToManyUpdate,
  oneToManyRemoveOrFail,
  oneToManyFindOneOrFail,
  getName,
} from '../utils'

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

  getFields(): Api.InputValueDefinitionApi[] {
    return this.node.fields?.map(Api.inputValueDefinitionApi) ?? []
  }

  getFieldsByTypename(typename: Typename): Api.InputValueDefinitionApi[] {
    return this.getFields().filter((field) => field.getType().getTypename() === typename)
  }

  // TODO: add getFieldsByType with deep compare fn

  hasField(fieldname: Fieldname): boolean {
    if (!this.node.fields) return false

    return this.node.fields.some((field) => field.name.value === fieldname)
  }

  getField(fieldname: Fieldname): Api.InputValueDefinitionApi {
    const field = oneToManyFindOneOrFail({
      node: this.node,
      key: 'fields',
      target: fieldname,
      getter: (el) => el.name.value,
    })

    return Api.inputValueDefinitionApi(field)
  }

  createField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    oneToManyCreate({
      node: this.node,
      key: 'fields',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
    })

    return this
  }

  upsertField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    oneToManyUpsert({
      node: this.node,
      key: 'fields',
      target: getName(props.name),
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
      props,
    })

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>,
  ): this {
    oneToManyUpdate({
      node: this.node,
      key: 'fields',
      target: fieldname,
      getter: (el) => el.name.value,
      factory: Ast.inputValueDefinitionNode,
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

  getFieldType(fieldname: Fieldname): Api.TypeApi {
    return this.getField(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: GQL.TypeNode | Ast.TypeNodeProps): this {
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
