import type * as GQL from 'graphql'
import { Kind } from 'graphql'
import { Mixin as Mix } from 'ts-mixer'

// eslint-disable-next-line import/no-cycle
import { Api, Mixin, Ast } from '../internal'
import { mutable, validateNodeKind, Crud } from '../utils'

/**
 * @category API Public
 */
export class DirectiveDefinitionApi extends Mix(
  Mixin.NameMixin,
  Mixin.DescriptionMixin,
  Mixin.InputValuesAsArgumentsMixin,
  Mixin.KindAssertionMixin,
) {
  constructor(readonly node: GQL.DirectiveDefinitionNode) {
    super(node)

    validateNodeKind(Kind.DIRECTIVE_DEFINITION, node)
  }

  readonly _locations = new Crud({
    api: (node): GQL.DirectiveLocationEnum => node.value as GQL.DirectiveLocationEnum,
    factory: Ast.nameNode,
    key: 'locations',
    matcher: (node): GQL.DirectiveLocationEnum => node.value as GQL.DirectiveLocationEnum,
    parent: this.node,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  isRepeatable(): boolean {
    return this.node.repeatable
  }

  setRepeatable(value = true): this {
    mutable(this.node).repeatable = value

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  hasLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): boolean {
    return this._locations.test(location)
  }

  getLocations(): GQL.DirectiveLocationEnum[] {
    return this._locations.findMany()
  }

  setLocations(locations: (GQL.NameNode | GQL.DirectiveLocationEnum)[]): this {
    this._locations.set(locations)

    return this
  }

  createLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    this._locations.create(location)

    return this
  }

  removeLocation(location: GQL.NameNode | GQL.DirectiveLocationEnum): this {
    this._locations.remove(location)

    return this
  }
}

/**
 * @category API Public
 */
export function directiveDefinitionApi(node: GQL.DirectiveDefinitionNode): Api.DirectiveDefinitionApi {
  return new Api.DirectiveDefinitionApi(node)
}
