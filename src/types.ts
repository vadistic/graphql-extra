/**
 * @category Helper
 */
export type Typename = string

/**
 * @category Helper
 */
export type Fieldname = string

/**
 * @category Helper
 */
export type Argname = string

/**
 * @category Helper
 */
export type Directivename = string

/**
 * @category Helper
 */
export type Fragmentname = string

/**
 * @category Helper
 */
export type GuardType<T> = T extends (o: any) => o is infer U ? U : never

/**
 * @category Helper
 */
export type ContstructorType<T> = T extends new (...args: any) => infer U ? U : never

/**
 * @category Helper
 */
export type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never
