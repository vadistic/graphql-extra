import type * as GQL from 'graphql'
import { Kind, parse, GraphQLError } from 'graphql'

/**
 * @category Helper
 */
export const DEFAULT_PARSE_OPTIONS: GQL.ParseOptions = {
  experimentalFragmentVariables: true,
  noLocation: true,
}

/**
 * @category Helper
 */
export type SDLInput = string | GQL.DocumentNode | (string | GQL.DocumentNode)[]

/**
 * @category Helper
 */
export function parseSDL(
  sdl: SDLInput,
  options = DEFAULT_PARSE_OPTIONS,
): GQL.DefinitionNode[] {
  if (typeof sdl === 'string') {
    return [...parse(sdl, DEFAULT_PARSE_OPTIONS).definitions]
  }

  if (Array.isArray(sdl)) {
    return sdl.flatMap((el) => parseSDL(el, options))
  }

  if (sdl.kind === Kind.DOCUMENT) {
    return [...sdl.definitions]
  }

  throw new GraphQLError('cannot parse sdl', sdl)
}
