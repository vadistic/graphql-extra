/**
 * mark each object property as mutable
 * @category Internal
 */
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
};
/**
 * recursively mark each object property as mutable
 * @category Internal
 */
export declare type DeepMutable<T> = {
    -readonly [P in keyof T]: DeepMutable<T[P]>;
};
/**
 * assert input as `Mutable<T>
 * @category Internal
 */
export declare const mutable: <T>(node: T) => Mutable<T>;
/**
 * assert input as `DeepMutable<T>
 * @category Internal
 */
export declare const deepMutable: <T>(node: T) => DeepMutable<T>;
/**
 * helper to concat readonly array - they are frozen or smth in graphql
 *
 * @category Internal
 */
export declare const concat: <T>(arr: readonly T[], ...els: T[]) => readonly T[];
