import {
  KindEnum, Kind, ASTKindToNode, parse, ASTNode, DefinitionNode, DocumentNode,
} from 'graphql'

export function normaliseString(input: string): string {
  return input.replace(/\s/, '')
}

function stripEmptyKeysAndLoc(input: any): any {
  if (input === null || input === undefined) {
    return input
  }

  if (Array.isArray(input)) {
    return input.map(stripEmptyKeysAndLoc)
  }

  if (typeof input === 'object') {
    const res: any = {}

    for (const [key, val] of Object.entries(input)) {
      if (val !== undefined && key !== 'loc') {
        res[key] = stripEmptyKeysAndLoc(val)
      }
    }

    return res
  }

  return input
}
export function normaliseGql(input: string): string
export function normaliseGql(input: ASTNode): ASTNode
export function normaliseGql(input: string | ASTNode): string | ASTNode {
  if (typeof input === 'string') {
    return normaliseString(input)
  }

  return stripEmptyKeysAndLoc(input)
}

// ────────────────────────────────────────────────────────────────────────────────


const _getFirstNodeOfKind = <K extends KindEnum>(kind: K) => (
  input: ASTNode,
): ASTKindToNode[K] | undefined => {
  if (input !== null && typeof input === 'object') {
    if ('kind' in input && input.kind === kind) {
      return input as any
    }

    for (const val of Object.values(input)) {
      const maybe = _getFirstNodeOfKind(kind)(val)

      if (maybe) {
        return maybe
      }
    }
  }

  return undefined
}

const _getFirstDocDefinition = (doc: DocumentNode): DefinitionNode | undefined => {
  if (doc.kind === Kind.DOCUMENT) {
    return doc.definitions[0]
  }

  return undefined
}

const defined = <A, R>(fn: (arg: A) => R | undefined) => (arg: A): R => {
  const res = fn(arg)

  if (!res) {
    throw Error(`Undefined return from function ${fn.name}`)
  }

  return res
}

const parsed = <A, R>(fn: (arg: A) => R | undefined) => (arg: A | string): R | undefined => {
  if (typeof arg === 'string') {
    return fn((parse(arg, { noLocation: true }) as unknown) as A)
  }

  return fn(arg)
}

export const getFirstDefinition = defined(parsed(_getFirstDocDefinition))

export const getFirstNodeOfKind = <K extends KindEnum>(
  kind: K): (node: ASTNode | string) => ASTKindToNode[K] =>
    defined(parsed(_getFirstNodeOfKind(kind)))

export const getFirstObjectType = getFirstNodeOfKind(Kind.OBJECT_TYPE_DEFINITION)
export const getFirstInputType = getFirstNodeOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION)
export const getFirstEnumType = getFirstNodeOfKind(Kind.ENUM_TYPE_DEFINITION)
export const getFirstInputObjectType = getFirstNodeOfKind(Kind.INPUT_OBJECT_TYPE_DEFINITION)
export const getFirstUnionType = getFirstNodeOfKind(Kind.UNION_TYPE_DEFINITION)
export const getFirstScalarType = getFirstNodeOfKind(Kind.SCALAR_TYPE_DEFINITION)
