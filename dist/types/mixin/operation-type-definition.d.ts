import * as GQL from 'graphql';
import { Api, Ast } from '../internal';
import { Typename } from '../types';
import { Crud } from '../utils';
/**
 * @category API Mixins
 */
export declare type OperationTypeDefinitionMixinNode = GQL.SchemaDefinitionNode | GQL.SchemaExtensionNode;
/**
 * @category API Mixins
 */
export declare class OperationTypeDefinitionMixin {
    readonly node: OperationTypeDefinitionMixinNode;
    constructor(node: OperationTypeDefinitionMixinNode);
    readonly _operationTypes: Crud<GQL.OperationTypeDefinitionNode, Api.OperationTypeDefinitionApi, Ast.OperationTypeDefinitionNodeProps, GQL.OperationTypeNode>;
    getOperationType(operation: GQL.OperationTypeNode): Api.OperationTypeDefinitionApi | undefined;
    getOperationTypename(operation: GQL.OperationTypeNode): string | undefined;
    hasOperationType(operation: GQL.OperationTypeNode): boolean;
    getOperationTypes(): Api.OperationTypeDefinitionApi[];
    getOperationTypenames(): Typename[];
    createOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this;
    updateOperationType(operation: GQL.OperationTypeNode, props: Partial<GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps>): this;
    upsertOperationType(props: GQL.OperationTypeDefinitionNode | Ast.OperationTypeDefinitionNodeProps): this;
    removeOperationType(operation: GQL.OperationTypeNode): this;
    getQuery(): Api.OperationTypeDefinitionApi | undefined;
    getMutation(): Api.OperationTypeDefinitionApi | undefined;
    getSubscription(): Api.OperationTypeDefinitionApi | undefined;
    getQueryTypename(): Typename | undefined;
    getMutationTypename(): Typename | undefined;
    getSubscriptionTypename(): Typename | undefined;
}
/**
 * @category API Mixins
 */
export declare function operationTypeDefinitionMixin(node: OperationTypeDefinitionMixinNode): OperationTypeDefinitionMixin;
