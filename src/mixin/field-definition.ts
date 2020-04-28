import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname, Typename } from '../types'
import { Crud } from '../utils'

/**
 * @category API Mixins
 */
export type FieldDefinitionsMixinNode =
  | GQL.InterfaceTypeDefinitionNode
  | GQL.InterfaceTypeExtensionNode
  | GQL.ObjectTypeDefinitionNode
  | GQL.ObjectTypeExtensionNode

/**
 * @category API Mixins
 */
export class FieldDefinitionsMixin {
  constructor(readonly node: FieldDefinitionsMixinNode) {}

  readonly _fields = new Crud({
    parent: this.node,
    key: 'fields',
    api: Api.fieldDefinitionApi,
    factory: Ast.fieldDefinitionNode,
    matcher: (node): Fieldname => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getFieldnames(): Fieldname[] {
    return this._fields.findManyNames()
  }

  getFields(): Api.FieldDefinitionApi[] {
    return this._fields.findMany()
  }

  getFieldsByTypename(typename: Typename): Api.FieldDefinitionApi[] {
    return this._fields.findMany().filter((field) => field.getTypename() === typename)
  }

  hasField(fieldname: Fieldname): boolean {
    return this._fields.has(fieldname)
  }

  getField(fieldname: Fieldname): Api.FieldDefinitionApi {
    return this._fields.findOneOrFail(fieldname)
  }

  createField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this {
    this._fields.create(props)

    return this
  }

  updateField(
    fieldname: Fieldname,
    props: Partial<Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode >,
  ): this {
    this._fields.update(fieldname, props)

    return this
  }

  upsertField(props: Ast.FieldDefinitionNodeProps | GQL.FieldDefinitionNode): this {
    this._fields.upsert(props)

    return this
  }

  removeField(fieldname: Fieldname): this {
    this._fields.remove(fieldname)

    return this
  }

  getFieldTypename(fieldname: Fieldname): Typename {
    return this._fields.findOneOrFail(fieldname).getTypename()
  }

  setFieldTypename(fieldname: Fieldname, value: Typename): this {
    this._fields.findOneOrFail(fieldname).setTypename(value)

    return this
  }

  getFieldType(fieldname: Fieldname): Api.TypeApi {
    return this._fields.findOneOrFail(fieldname).getType()
  }

  setFieldType(fieldname: Fieldname, props: Ast.TypeNodeProps | GQL.TypeNode): this {
    this._fields.findOneOrFail(fieldname).setType(props)

    return this
  }

  getFieldArguments(fieldname: Fieldname): Api.InputValueDefinitionApi[] {
    return this._fields.findOneOrFail(fieldname).getArguments()
  }

  getFieldDirectives(fieldname: Fieldname): Api.DirectiveApi[] {
    return this._fields.findOneOrFail(fieldname).getDirectives()
  }
}

/**
 * @category API Mixins
 */
export function fieldDefinitionsMixin(
  node: FieldDefinitionsMixinNode,
): FieldDefinitionsMixin {
  return new FieldDefinitionsMixin(node)
}
