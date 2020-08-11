import { Kind, parse, GraphQLError } from 'graphql';
export const DEFAULT_PARSE_OPTIONS = {
    experimentalFragmentVariables: true,
    noLocation: true,
};
export function parseSDL(sdl, options = DEFAULT_PARSE_OPTIONS) {
    if (typeof sdl === 'string') {
        return [...parse(sdl, DEFAULT_PARSE_OPTIONS).definitions];
    }
    if (Array.isArray(sdl)) {
        return sdl.flatMap((el) => parseSDL(el, options));
    }
    if (sdl.kind === Kind.DOCUMENT) {
        return [...sdl.definitions];
    }
    throw new GraphQLError('cannot parse sdl', sdl);
}
