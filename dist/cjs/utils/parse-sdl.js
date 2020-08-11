"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
exports.DEFAULT_PARSE_OPTIONS = {
    experimentalFragmentVariables: true,
    noLocation: true,
};
function parseSDL(sdl, options = exports.DEFAULT_PARSE_OPTIONS) {
    if (typeof sdl === 'string') {
        return [...graphql_1.parse(sdl, exports.DEFAULT_PARSE_OPTIONS).definitions];
    }
    if (Array.isArray(sdl)) {
        return sdl.flatMap((el) => parseSDL(el, options));
    }
    if (sdl.kind === graphql_1.Kind.DOCUMENT) {
        return [...sdl.definitions];
    }
    throw new graphql_1.GraphQLError('cannot parse sdl', sdl);
}
exports.parseSDL = parseSDL;
