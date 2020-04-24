import type { ASTNode, KindEnum, ASTKindToNode } from 'graphql'

export class InvalidNodeKindError extends Error {
  constructor(expectedKind: KindEnum | KindEnum[], actual: ASTNode) {
    super(`provided node ${actual.kind} `
    + `${('name' in actual && actual.name) ? ('"' + actual.name.value + '"') : ''}`
    + `does not meet contraint ${expectedKind}`)
  }
}

export const validateNodeKind = <K extends KindEnum>(expectedKind: K, actual: ASTKindToNode[K]): void => {
  if (actual.kind !== expectedKind) {
    throw new InvalidNodeKindError(expectedKind, actual)
  }
}

export const validateNodeKindArr = <K extends KindEnum>(expectedKind: K[], actual: ASTKindToNode[K]): void => {
  if (!expectedKind.includes(actual.kind as any)) {
    throw new InvalidNodeKindError(expectedKind, actual)
  }
}
