import type * as GQL from 'graphql';
import type { KindToApiType } from '../kind-to-api';
/**
 * @category API Mixins
 */
export declare class KindAssertionMixin {
    readonly node: GQL.ASTNode;
    constructor(node: GQL.ASTNode);
    isKind<K extends GQL.KindEnum>(kind: K): this is KindToApiType<K>;
    assertKind<K extends GQL.KindEnum>(kind: K): KindToApiType<K>;
}
/**
 * @category API Mixins
 */
export declare function kindAssertionMixin(node: GQL.ASTNode): KindAssertionMixin;
