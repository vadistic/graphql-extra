import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Fieldname } from '../types'
import { Crud } from '../utils'

/**
 * @category API Mixins
 */
export type EnumValueDefinitionMixinNode =
  | GQL.EnumTypeDefinitionNode
  | GQL.EnumTypeExtensionNode

/**
 * @category API Mixins
 */
export class EnumValueDefinitionMixin {
  constructor(readonly node: EnumValueDefinitionMixinNode) {}

  readonly _values = new Crud({
    parent: this.node,
    key: 'values',
    api: Api.enumValueDefinitionApi,
    factory: Ast.enumValueDefinitionNode,
    matcher: (node): Fieldname => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  hasValue(fieldname: Fieldname): boolean {
    return this._values.has(fieldname)
  }

  getValue(fieldname: Fieldname): Api.EnumValueDefinitionApi {
    return this._values.findOneOrFail(fieldname)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  getValues(): Api.EnumValueDefinitionApi[] {
    return this._values.findMany()
  }

  getValueNames(): Fieldname[] {
    return this._values.findManyNames()
  }

  // ────────────────────────────────────────────────────────────────────────────────

  createValue(props: Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode): this {
    this._values.create(props)

    return this
  }

  updateValue(
    fieldname: Fieldname,
    props: Fieldname | Partial<Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode>,
  ): this {
    this._values.update(fieldname, props)

    return this
  }

  upsertValue(props: Ast.EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode): this {
    this._values.upsert(props)

    return this
  }

  removeValue(fieldname: Fieldname): this {
    this._values.remove(fieldname)

    return this
  }
}


/**
 * @category API Mixins
 */
export function enumValueDefinitionMixin(
  node: EnumValueDefinitionMixinNode,
): EnumValueDefinitionMixin {
  return new EnumValueDefinitionMixin(node)
}
