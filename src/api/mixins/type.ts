import type {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  VariableDefinitionNode,
  NamedTypeNode,
  TypeNode,
} from 'graphql'

import type { TypeNodeProps } from '../../node'
import { TypeApi, typeApi } from '../apis/type'

/**
 * @category API Mixins
 */
export type TypeApiMixinNode =
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | VariableDefinitionNode

/**
 * @category API Mixins
 */
export class TypeApiMixin {
  constructor(protected node: TypeApiMixinNode) {}

  getType(): TypeApi {
    return typeApi(this.node.type)
  }

  getTypename(): string {
    return this.getType().getTypename()
  }

  getNamedType(): NamedTypeNode {
    return this.getType().getNamedType()
  }

  setTypename(value: string): this {
    this.getType().setTypename(value)

    return this
  }

  setType(props: TypeNode | TypeNodeProps): this {
    this.getType().setType(props)

    return this
  }

  isNonNullType(deep?: boolean): boolean {
    return this.getType().isNonNull(deep)
  }

  isListType(deep?: boolean): boolean {
    return this.getType().isList(deep)
  }

  setNonNullType(value = true): this {
    this.getType().setNonNull(value)

    return this
  }

  setListType(value = true): this {
    this.getType().setList(value)

    return this
  }
}

/**
 * @category API Mixins
 */
export function typeApiMixin(node: TypeApiMixinNode): TypeApiMixin {
  return new TypeApiMixin(node)
}
