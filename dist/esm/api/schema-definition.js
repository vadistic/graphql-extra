import { Kind } from 'graphql';
import { Mixin as Mix } from 'ts-mixer';
import { Mixin } from '../internal';
import { validateNodeKind } from '../utils';
export class SchemaDefinitionApi extends Mix(Mixin.DescriptionMixin, Mixin.DirectivesMixin, Mixin.OperationTypeDefinitionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.SCHEMA_DEFINITION, node);
    }
}
export function schemaDefinitionApi(node) {
    return new SchemaDefinitionApi(node);
}
export class SchemaExtensionApi extends Mix(Mixin.DirectivesMixin, Mixin.OperationTypeDefinitionMixin, Mixin.KindAssertionMixin) {
    constructor(node) {
        super(node);
        this.node = node;
        validateNodeKind(Kind.SCHEMA_EXTENSION, node);
    }
}
export function schemaExtensionApi(node) {
    return new SchemaExtensionApi(node);
}
