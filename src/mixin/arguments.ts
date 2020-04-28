import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import { Argname } from '../types'
import { Crud } from '../utils'

/**
 * @category API Mixins
 */
export type ArgumentsMixinNode =
  | GQL.DirectiveNode
  | GQL.FieldNode

/**
 * @category API Mixins
 */
export class ArgumentsMixin {
  constructor(protected node: ArgumentsMixinNode) {}

  readonly _arguments = new Crud({
    parent: this.node,
    key: 'arguments',
    api: Api.argumentApi,
    factory: Ast.argumentNode,
    matcher: (node): Argname => node.name.value,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  getArgumentNames(): Argname[] {
    return this._arguments.findManyNames()
  }

  hasArgument(argname: Argname): boolean {
    return this._arguments.has(argname)
  }

  getArguments(): Api.ArgumentApi[] {
    return this._arguments.findMany()
  }

  getArgument(argname: Argname): Api.ArgumentApi {
    return this._arguments.findOneOrFail(argname)
  }

  createArgument(props: Ast.ArgumentNodeProps| GQL.ArgumentNode): this {
    this._arguments.create(props)

    return this
  }

  updateArgument(argname: Argname, props: Partial<Ast.ArgumentNodeProps | GQL.ArgumentNode>): this {
    this._arguments.update(argname, props)

    return this
  }

  upsertArgument(props: Ast.ArgumentNodeProps | GQL.ArgumentNode): this {
    this._arguments.upsert(props)

    return this
  }

  removeArgument(argname: Argname): this {
    this._arguments.remove(argname)

    return this
  }
}

/**
 * @category API Mixins
 */
export function argumentsMixin(node: ArgumentsMixinNode): ArgumentsMixin {
  return new ArgumentsMixin(node)
}
