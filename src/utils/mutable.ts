/**
 * mark each object property as mutable
 * @category Internal
 */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/**
 * recursively mark each object property as mutable
 * @category Internal
 */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

/**
 * assert input as `Mutable<T>
 * @category Internal
 */
export const mutable = <T>(node: T): Mutable<T> => node

/**
 * assert input as `DeepMutable<T>
 * @category Internal
 */
export const deepMutable = <T>(node: T): DeepMutable<T> => node

/**
 * helper to concat readonly array - they are frozen or smth in graphql
 *
 * @category Internal
 */
export const concat = <T>(arr: readonly T[], el: T): readonly T[] => {
  // eslint-disable-next-line no-param-reassign
  (arr as any)[arr.length] = el

  return arr
}
