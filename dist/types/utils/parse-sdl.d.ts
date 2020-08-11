import type * as GQL from 'graphql';
/**
 * @category Helper
 */
export declare const DEFAULT_PARSE_OPTIONS: GQL.ParseOptions;
/**
 * @category Helper
 */
export declare type SDLInput = string | GQL.DocumentNode | (string | GQL.DocumentNode)[];
/**
 * @category Helper
 */
export declare function parseSDL(sdl: SDLInput, options?: GQL.ParseOptions): GQL.DefinitionNode[];
