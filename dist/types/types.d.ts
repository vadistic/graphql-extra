import type * as GQL from 'graphql';
/**
 * @category Helper
 */
export declare type Typename = string;
/**
 * @category Helper
 */
export declare type Fieldname = string;
/**
 * @category Helper
 */
export declare type Argname = string;
/**
 * @category Helper
 */
export declare type Directivename = string;
/**
 * @category Helper
 */
export declare type Fragmentname = string;
/**
 * @category Helper
 */
export declare type Variablename = string;
/**
 * @category Helper
 */
export declare type GuardType<T> = T extends (o: any) => o is infer U ? U : never;
/**
 * @category Helper
 */
export declare type ContstructorType<T> = T extends new (...args: any) => infer U ? U : never;
/**
 * @category Helper
 */
export declare type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never;
/**
 * @category Helper
 */
export declare type WithKind<T, K extends GQL.KindEnum> = T & {
    kind: K;
};
/**
 * @category Internal
 */
export declare type KindToAstMapping<N extends GQL.ASTNode> = {
    [K in N['kind']]: (props: any) => GQL.ASTKindToNode[K];
};
