import type { ASTNode } from 'graphql';
/**
 * @category Internal
 */
export declare function isAstNode<Node = ASTNode>(input: any): input is Node;
/**
 * @category Internal
 */
export declare type Primitive = string | number | boolean | null;
/**
 * @category Internal
 */
export declare function isPrimitive(value: any): value is Primitive;
/**
 * just nullable
 *
 * @category Internal
 */
export declare function applyNullable<P, N>(fn: (props: P) => N, props?: P): N | undefined;
/**
 * just implicitly nullable
 *
 * @category Internal
 */
export declare function applyNullableImplicit<P, N>(fn: (props: P) => N, props: P): N;
/**
 * implicitly nullable + props or node
 *
 * @category Internal
 */
export declare function applyProps<P, N>(fn: (props: P) => N, props: P | N): N;
/**
 * implicitly nullable + on array + props or node
 *
 * @category Internal
 */
export declare function applyPropsArr<P, N>(fn: (props: P) => N, props: ReadonlyArray<P | N>): readonly N[];
/**
 * nullable + props or node
 *
 * @category Internal
 */
export declare function applyPropsNullable<P, N>(fn: (props: P) => N, props?: P | N): N | undefined;
/**
 * nullable + on array + props or node
 *
 * @category Internal
 */
export declare function applyPropsNullableArr<P, N>(fn: (props: P) => N, props?: ReadonlyArray<P | N>): readonly N[] | undefined;
/**
 * implicitly nullable + cloned input
 *
 * @category Internal
 */
export declare function applyPropsCloned<P, N>(fn: (props: P) => N, props: N | P): N;
/**
 * implicitly nullable + partial
 *
 * @category Internal
 */
export declare function applyPropsPartial<P, N>(fn: (props: P) => N, props: P | Partial<P | N>): Partial<N>;
/**
 * implicitly nullable + cloned input + partial
 *
 * @category Internal
 */
export declare function applyPropsClonedPartial<P, N>(fn: (props: P) => N, props: P | Partial<N | P>): Partial<N>;
