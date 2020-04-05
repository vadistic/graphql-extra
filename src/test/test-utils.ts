import { KindEnum, Kind, ASTKindToNode, parse, ASTNode } from 'graphql'

export function normaliseGql(input: any) {
  if (typeof input === 'string') {
    return normaliseString(input)
  } else {
    stripEmptyKeysAndLoc(input)
  }
}

export function normaliseString(input: string) {
  return input.replace(/\s/, '')
}

function stripEmptyKeysAndLoc(input: any): any {
  if (input === null) {
    return
  }

  if (input instanceof Array) {
    return input.map(stripEmptyKeysAndLoc)
  }

  if (typeof input === 'object') {
    const res: any = {}

    for (const [key, val] of Object.entries(input)) {
      if (typeof val !== undefined && key !== 'loc') {
        res[key] = stripEmptyKeysAndLoc(val)
      }
    }

    return res
  }

  return input
}

// ────────────────────────────────────────────────────────────────────────────────

const getFirstNodeOfKind = <K extends KindEnum>(kind: K) => (
  input: ASTNode,
): ASTKindToNode[K] | undefined => {
  if (input !== null && typeof input === 'object') {
    if ('kind' in input && input.kind === kind) {
      return input as any
    }

    for (const val of Object.values(input)) {
      const maybe = getFirstNodeOfKind(kind)(val)

      if (maybe) {
        return maybe
      }
    }
  }

  return
}

const defined = <A, R>(fn: (arg: A) => R | undefined) => (arg: A) => {
  const res = fn(arg)

  if (!res) {
    throw Error(`Undefined return from function ${fn.name}`)
  }

  return res
}

const parsed = <A, R>(fn: (arg: A) => R | undefined) => (arg: A | string) => {
  if (typeof arg === 'string') {
    return fn((parse(arg, { noLocation: true }) as unknown) as A)
  }

  return fn(arg)
}

const getDefinedParsedFirstNode = <K extends KindEnum>(kind: K) =>
  defined(parsed(getFirstNodeOfKind(kind)))

export const getFirstObjectType = getDefinedParsedFirstNode(Kind.OBJECT_TYPE_DEFINITION)
export const getFirstInputType = getDefinedParsedFirstNode(Kind.INPUT_OBJECT_TYPE_DEFINITION)
export const getFirstEnumType = getDefinedParsedFirstNode(Kind.ENUM_TYPE_DEFINITION)
export const getFirstInputObjectType = getDefinedParsedFirstNode(Kind.INPUT_OBJECT_TYPE_DEFINITION)
export const getFirstUnionType = getDefinedParsedFirstNode(Kind.UNION_TYPE_DEFINITION)
export const getFirstScalarType = getDefinedParsedFirstNode(Kind.SCALAR_TYPE_DEFINITION)
