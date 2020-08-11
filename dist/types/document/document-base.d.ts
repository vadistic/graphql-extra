import type * as GQL from 'graphql';
import { Ast, Api } from '../internal';
import { Typename } from '../types';
import { SDLInput, Crud } from '../utils';
/**
 * @category API Public
 */
export declare class DocumentBaseApi {
    readonly node: GQL.DocumentNode;
    constructor(node?: GQL.DocumentNode);
    readonly _definitions: Crud<GQL.DefinitionNode, import("./definition").DefinitionApi, Ast.DefinitionNodeProps, string | undefined>;
    readonly _typeDefinitions: Crud<GQL.TypeDefinitionNode, Api.TypeDefinitonApi, Ast.TypeDefinitionNodeProps, string>;
    readonly _typeExtensions: Crud<GQL.TypeExtensionNode, Api.TypeExtensionApi, Ast.TypeExtensionNodeProps, string>;
    readonly _directiveDefinitions: Crud<GQL.DirectiveDefinitionNode, Api.DirectiveDefinitionApi, Ast.DirectiveDefinitionNodeProps, string>;
    readonly _fragmentDefinitions: Crud<GQL.FragmentDefinitionNode, Api.FragmentDefinitionApi, Ast.FragmentDefinitionNodeProps, string>;
    readonly _operationDefinitions: Crud<GQL.OperationDefinitionNode, Api.OperationDefinitionApi, Ast.OperationDefinitionNodeProps, string | undefined>;
    readonly _objectTypes: Crud<GQL.ObjectTypeDefinitionNode, Api.ObjectTypeApi, Ast.ObjectTypeDefinitionNodeProps, string>;
    readonly _objectExts: Crud<GQL.ObjectTypeExtensionNode, Api.ObjectExtApi, Ast.ObjectTypeExtensionNodeProps, string>;
    readonly _interfaceTypes: Crud<GQL.InterfaceTypeDefinitionNode, Api.InterfaceTypeApi, Ast.InterfaceTypeDefinitionNodeProps, string>;
    readonly _interfaceExts: Crud<GQL.InterfaceTypeExtensionNode, Api.InterfaceExtApi, Ast.InterfaceTypeExtensionNodeProps, string>;
    readonly _scalarTypes: Crud<GQL.ScalarTypeDefinitionNode, Api.ScalarTypeApi, Ast.ScalarTypeDefinitionNodeProps, string>;
    readonly _scalarExts: Crud<GQL.ScalarTypeExtensionNode, Api.ScalarExtApi, Ast.ScalarTypeExtensionNodeProps, string>;
    readonly _unionTypes: Crud<GQL.UnionTypeDefinitionNode, Api.UnionTypeApi, Ast.UnionTypeDefinitionNodeProps, string>;
    readonly _unionExts: Crud<GQL.UnionTypeExtensionNode, Api.UnionExtApi, Ast.UnionTypeExtensionNodeProps, string>;
    readonly _enumTypes: Crud<GQL.EnumTypeDefinitionNode, Api.EnumTypeApi, Ast.EnumTypeDefinitionNodeProps, string>;
    readonly _enumExts: Crud<GQL.EnumTypeExtensionNode, Api.EnumExtApi, Ast.EnumTypeExtensionNodeProps, string>;
    readonly _inputTypes: Crud<GQL.InputObjectTypeDefinitionNode, Api.InputTypeApi, Ast.InputObjectTypeDefinitionNodeProps, string>;
    readonly _inputExts: Crud<GQL.InputObjectTypeExtensionNode, Api.InputExtApi, Ast.InputObjectTypeExtensionNodeProps, string>;
    /** add more typedefs */
    addSDL(sdl: SDLInput, options?: GQL.ParseOptions): this;
    get typeMap(): Map<Typename, GQL.TypeDefinitionNode>;
    /** serialise to `DocumentNode` */
    toDocument(): GQL.DocumentNode;
    /** serialise to `string` */
    toString(): string;
    /** serialise to `GraphQLSchema` */
    toSchema(options?: GQL.BuildSchemaOptions): GQL.GraphQLSchema;
    /** serialise to graphql introspection query result */
    toJson(options?: GQL.BuildSchemaOptions): GQL.ExecutionResult;
}
/**
 * `DocumentSchemaApi` constructor fn
 *
 * @category API Public
 */
export declare function documentBaseApi(node?: GQL.DocumentNode): DocumentBaseApi;
