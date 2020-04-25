import {
  KindEnum, ASTKindToNode, GraphQLError, ASTNode,
} from 'graphql'

import { getName } from './get-name'


export function validationError <K extends KindEnum>(kinds: K | K[], node: ASTNode): GraphQLError {
  const message = `${node.kind} node "${getName(node)}" does not meet constraint `
    + Array.isArray(kinds) ? (kinds as string[]).join(' | ') : kinds + ''

  return new GraphQLError(message, node)
}

export function assertionError <K extends KindEnum>(kind: K, node: ASTNode): GraphQLError {
  const message = `${node.kind} node "${getName(node)}" cannot be asserted as ${kind}`

  return new GraphQLError(message, node)
}

export function validateNodeKind <K extends KindEnum>(kind: K, node: ASTKindToNode[K]): void {
  if (node.kind !== kind) {
    throw validationError(kind, node)
  }
}

export function validateNodeKindsArr <K extends KindEnum>(kinds: K[], node: ASTKindToNode[K]): void {
  if (!kinds.includes(node.kind as any)) {
    throw validationError(kinds, node)
  }
}
