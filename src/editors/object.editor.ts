import { ObjectTypeDefinitionNode, Kind } from 'graphql'
import { applyMixins } from '../apply-mixins'
import {
  TypenameConfig,
  DescriptionConfig,
  TypenameMixin,
  DescriptionMixin,
} from '../mixins/base.mixins'
import { AST } from '../ast'

interface ObjectEditor extends TypenameMixin, DescriptionMixin {}

@applyMixins([TypenameMixin, DescriptionMixin])
class ObjectEditor {
  kind = Kind.OBJECT_TYPE_DEFINITION
  constructor(public ast: AST) {}

  toAst(): ObjectTypeDefinitionNode {
    return {
      kind: Kind.OBJECT_TYPE_DEFINITION,
      name: TypenameMixin.toAst(this),
      description: DescriptionMixin.toAst(this),
    }
  }
}

export { ObjectEditor }
