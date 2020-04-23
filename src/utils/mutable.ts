/** mark each object property as mutable */
export type Mutable<T> = {
  -readonly [P in keyof T]: T[P]
}

/** recursively mark each object property as mutable */
export type DeepMutable<T> = {
  -readonly [P in keyof T]: DeepMutable<T[P]>
}

/** assert input as `Mutable<T>` */
export const mutable = <T>(node: T): Mutable<T> => node

/** assert input as `DeepMutable<T>` */
export const deepMutable = <T>(node: T): DeepMutable<T> => node
