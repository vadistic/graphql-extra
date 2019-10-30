import {
  FieldDefinitionNode,
  InputValueDefinitionNode,
  VariableDefinitionNode,
  NamedTypeNode,
  TypeNode,
} from 'graphql'
import { TypeNodeProps } from '../../node'
import { TypeApi, typeApi } from '..'

//
// ─── TYPE API MIXIN ─────────────────────────────────────────────────────────────
//

export type TypeApiMixinCompatibleNode =
  | FieldDefinitionNode
  | InputValueDefinitionNode
  | VariableDefinitionNode

export interface TypeApiMixin<This> {
  getType(): TypeApi

  getNamedType(): NamedTypeNode
  getTypename(): string

  setTypename(value: string): This
  setType(props: TypeNode | TypeNodeProps): This

  isNonNullType(deep?: boolean): boolean
  isListType(deep?: boolean): boolean

  setNonNullType(value?: boolean): This
  setListType(value?: boolean): This
}

export function typeApiMixin<This>(node: TypeApiMixinCompatibleNode): TypeApiMixin<This> {
  return {
    getType() {
      return typeApi(node.type)
    },

    getTypename() {
      return this.getType().getTypename()
    },

    getNamedType() {
      return this.getType().getNamedType()
    },

    setTypename(value) {
      this.getType().setTypename(value)

      return this as any
    },

    setType(props) {
      this.getType().setType(props)

      return this as any
    },

    isNonNullType(deep) {
      return this.getType().isNonNull(deep)
    },

    isListType(deep) {
      return this.getType().isList(deep)
    },

    setNonNullType(value) {
      this.getType().setNonNull(value)

      return this as any
    },

    setListType(value) {
      this.getType().setList(value)

      return this as any
    },
  }
}
