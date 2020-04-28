import type * as GQL from 'graphql'

import type { KindToApiType } from '../kind-to-api'
import { assertionError } from '../utils'

/**
 * @category API Mixins
 */
export class KindAssertionMixin {
  constructor(readonly node: GQL.ASTNode) {}

  isKind<K extends GQL.KindEnum>(kind: K): this is KindToApiType<K> {
    return this.node.kind === kind
  }

  assertKind<K extends GQL.KindEnum>(kind: K): KindToApiType<K> {
    if (this.isKind(kind)) return this
    throw assertionError(kind, this.node)
  }
}


/**
 * @category API Mixins
 */
export function kindAssertionMixin(
  node: GQL.ASTNode,
): KindAssertionMixin {
  return new KindAssertionMixin(node)
}
