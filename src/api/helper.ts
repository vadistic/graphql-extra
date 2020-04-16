import type { ParseOptions, DocumentNode, DefinitionNode } from 'graphql'
import { Kind, parse } from 'graphql'

/**
 * @category Helper
 */
export const DEFAULT_PARSE_OPTIONS: ParseOptions = {
  experimentalFragmentVariables: true,
  noLocation: true,
}

/**
 * @category Helper
 */
export type SDLInput = string | DocumentNode | (string | DocumentNode)[]

/**
 * @category Helper
 */
export function normaliseSDLInput(
  sdl: SDLInput,
  options = DEFAULT_PARSE_OPTIONS,
): DefinitionNode[] {
  if (typeof sdl === 'string') {
    return [...parse(sdl, DEFAULT_PARSE_OPTIONS).definitions]
  }

  if (Array.isArray(sdl)) {
    return sdl.flatMap((el) => normaliseSDLInput(el, options))
  }

  if (sdl.kind === Kind.DOCUMENT) {
    return [...sdl.definitions]
  }

  throw Error(`invalid sdl \n ${JSON.stringify(sdl, null, 2)}`)
}

// ────────────────────────────────────────────────────────────────────────────────


/**
 * gets name from node or props
 *
 * @category Helper
 */
export function getName(input: any): string {
  if (typeof input === 'string') {
    return input
  }

  if ('kind' in input && input.kind === Kind.NAME) {
    return input.value
  }

  if ('name' in input && !!input.name) {
    return getName(input.name)
  }

  if ('kind' in input && !!input.kind) {
    return input.kind
  }

  return 'unknown'
}
