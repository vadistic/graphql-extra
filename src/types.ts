import type * as GQL from 'graphql'

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
export type Variablename = string

// ────────────────────────────────────────────────────────────────────────────────

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

/**
 * @category Helper
 */
export type WithKind<T, K extends GQL.KindEnum> = T & {kind: K}

/**
 * @category Internal
 */
export type KindToAstMapping<N extends GQL.ASTNode> = {[K in N['kind']]: (props: any) => GQL.ASTKindToNode[K]}
