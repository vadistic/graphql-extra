import { NameNode, Kind, StringValueNode } from 'graphql'
import { AST } from '../ast'

export interface TypenameConfig {
  typename: string
}

export class TypenameMixin {
  typename: string

  constructor(ast: AST, config: TypenameConfig) {
    this.typename = config.typename
  }

  static toAst(instance: TypenameMixin): NameNode {
    return {
      kind: Kind.NAME,
      value: instance.typename,
    }
  }
}

export interface DescriptionConfig {
  description?: string
}

export class DescriptionMixin {
  description?: string

  constructor(ast: AST, config: DescriptionConfig) {
    this.description = config.description
  }

  static toAst(instance: DescriptionMixin): StringValueNode | undefined {
    if (!instance.description) {
      return
    }

    return {
      kind: Kind.STRING,
      value: instance.description,
    }
  }
}
