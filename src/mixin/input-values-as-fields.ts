import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Typename } from '../types'
import { Crud } from '../utils'

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

  readonly _fields = new Crud({
    parent: this.node,
    key: 'fields',
    api: Api.inputValueDefinitionApi,
    factory: Ast.inputValueDefinitionNode,
    matcher: (node): Fieldname => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getFieldnames(): Fieldname[] {
    return this._fields.findManyNames()
  }

  getFields(): Api.InputValueDefinitionApi[] {
    return this._fields.findMany()
  }

  // TODO: add getFieldsByType with deep compare fn
  getFieldsByTypename(typename: Typename): Api.InputValueDefinitionApi[] {
    return this.getFields().filter((field) => field.getType().getTypename() === typename)
  }

  hasField(fieldname: Fieldname): boolean {
    return this._fields.has(fieldname)
  }

  getField(fieldname: Fieldname): Api.InputValueDefinitionApi {
    return this._fields.findOneOrFail(fieldname)
  }

  createField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    this._fields.create(props)

    return this
  }

  upsertField(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    this._fields.upsert(props)

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>,
  ): this {
    this._fields.update(fieldname, props)

    return this
  }

  removeField(fieldname: Fieldname): this {
    this._fields.remove(fieldname)

    return this
  }

  getFieldType(fieldname: Fieldname): Api.TypeApi {
    return this.getField(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: GQL.TypeNode | Ast.TypeNodeProps): this {
    this.getField(fieldname).setType(props)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // TODO: dafault value api

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
