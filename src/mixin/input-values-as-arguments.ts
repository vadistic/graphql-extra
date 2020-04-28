import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname, Typename } from '../types'
import { Crud } from '../utils'


/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsMixinNode =
  | GQL.FieldDefinitionNode
  | GQL.DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export class InputValuesAsArgumentsMixin {
  constructor(readonly node: InputValuesAsArgumentsMixinNode) {}

  readonly _arguments = new Crud({
    parent: this.node,
    key: 'arguments',
    api: Api.inputValueDefinitionApi,
    factory: Ast.inputValueDefinitionNode,
    matcher: (node): Argname => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getArgnames(): Argname[] {
    return this._arguments.findManyNames()
  }

  getArguments(): Api.InputValueDefinitionApi[] {
    return this._arguments.findMany()
  }

  getArgumentsByTypename(typename: Typename): Api.InputValueDefinitionApi[] {
    return this._arguments.findMany().filter((arg) => arg.getTypename() === typename)
  }

  hasArgument(argname: Argname): boolean {
    return this._arguments.has(argname)
  }

  getArgument(argname: Argname): Api.InputValueDefinitionApi {
    return this._arguments.findOneOrFail(argname)
  }

  createArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    this._arguments.create(props)

    return this
  }

  upsertArgument(props: GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps): this {
    this._arguments.upsert(props)

    return this
  }

  updateArgument(
    argname: Argname,
    props: Partial<GQL.InputValueDefinitionNode | Ast.InputValueDefinitionNodeProps>,
  ): this {
    this._arguments.update(argname, props)

    return this
  }

  removeArgument(argname: Argname): this {
    this._arguments.remove(argname)

    return this
  }

  getArgumentType(argname: Argname): Api.TypeApi {
    return this._arguments.findOneOrFail(argname).getType()
  }

  setArgumentType(argname: Argname, props: GQL.TypeNode | Ast.TypeNodeProps): this {
    this._arguments.findOneOrFail(argname).setType(props)

    return this
  }

  getArgumentDefaultValue(argname: Argname): GQL.ValueNode | undefined {
    return this._arguments.findOneOrFail(argname).getDefaultValue()
  }

  setArgumentDefualtValue(argname: Argname, props: GQL.ValueNode): this {
    this._arguments.findOneOrFail(argname).setDefaultValue(props)

    return this
  }
}
