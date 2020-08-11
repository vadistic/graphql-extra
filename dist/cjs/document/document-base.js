"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const internal_1 = require("../internal");
const utils_1 = require("../utils");
const definition_1 = require("./definition");
class DocumentBaseApi {
    constructor(node = internal_1.Ast.documentNode({ definitions: [] })) {
        this.node = node;
        this._definitions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: definition_1.definitionApi,
            factory: internal_1.Ast.definitionNode,
            matcher: (n) => { var _a; return ('name' in n ? (_a = n.name) === null || _a === void 0 ? void 0 : _a.value : undefined); },
        });
        this._typeDefinitions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: definition_1.typeDefinitionApi,
            factory: internal_1.Ast.typeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [
                graphql_1.Kind.OBJECT_TYPE_DEFINITION,
                graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION,
                graphql_1.Kind.SCALAR_TYPE_DEFINITION,
                graphql_1.Kind.ENUM_TYPE_DEFINITION,
                graphql_1.Kind.UNION_TYPE_DEFINITION,
                graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION,
            ],
        });
        this._typeExtensions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: definition_1.typeExtensionApi,
            factory: internal_1.Ast.typeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [
                graphql_1.Kind.OBJECT_TYPE_EXTENSION,
                graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION,
                graphql_1.Kind.SCALAR_TYPE_EXTENSION,
                graphql_1.Kind.ENUM_TYPE_EXTENSION,
                graphql_1.Kind.UNION_TYPE_EXTENSION,
                graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION,
            ],
        });
        this._directiveDefinitions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.directiveDefinitionApi,
            factory: internal_1.Ast.directiveDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.DIRECTIVE_DEFINITION],
        });
        this._fragmentDefinitions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.fragmentDefinitionApi,
            factory: internal_1.Ast.fragmentDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.FRAGMENT_DEFINITION],
        });
        this._operationDefinitions = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.operationDefinitionApi,
            factory: internal_1.Ast.operationDefinitionNode,
            matcher: (n) => { var _a; return (_a = n.name) === null || _a === void 0 ? void 0 : _a.value; },
            kindFilter: [graphql_1.Kind.OPERATION_DEFINITION],
        });
        this._objectTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.objectTypeApi,
            factory: internal_1.Ast.objectTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.OBJECT_TYPE_DEFINITION],
        });
        this._objectExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.objectExtApi,
            factory: internal_1.Ast.objectTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.OBJECT_TYPE_EXTENSION],
        });
        this._interfaceTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.interfaceTypeApi,
            factory: internal_1.Ast.interfaceTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.INTERFACE_TYPE_DEFINITION],
        });
        this._interfaceExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.interfaceExtApi,
            factory: internal_1.Ast.interfaceTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.INTERFACE_TYPE_EXTENSION],
        });
        this._scalarTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.scalarTypeApi,
            factory: internal_1.Ast.scalarTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.SCALAR_TYPE_DEFINITION],
        });
        this._scalarExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.scalarExtApi,
            factory: internal_1.Ast.scalarTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.SCALAR_TYPE_EXTENSION],
        });
        this._unionTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.unionTypeApi,
            factory: internal_1.Ast.unionTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.UNION_TYPE_DEFINITION],
        });
        this._unionExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.unionExtApi,
            factory: internal_1.Ast.unionTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.UNION_TYPE_EXTENSION],
        });
        this._enumTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.enumTypeApi,
            factory: internal_1.Ast.enumTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.ENUM_TYPE_DEFINITION],
        });
        this._enumExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.enumExtApi,
            factory: internal_1.Ast.enumTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.ENUM_TYPE_EXTENSION],
        });
        this._inputTypes = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.inputTypeApi,
            factory: internal_1.Ast.inputObjectTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION],
        });
        this._inputExts = new utils_1.Crud({
            parent: this.node,
            key: 'definitions',
            api: internal_1.Api.inputExtApi,
            factory: internal_1.Ast.inputObjectTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION],
        });
    }
    addSDL(sdl, options = utils_1.DEFAULT_PARSE_OPTIONS) {
        const definitions = utils_1.parseSDL(sdl, options);
        utils_1.concat(this.node.definitions, ...definitions);
        return this;
    }
    get typeMap() {
        return new Map(this._typeDefinitions
            .findManyNodes()
            .map((n) => ([n.name.value, n])));
    }
    toDocument() {
        return this.node;
    }
    toString() {
        return graphql_1.print(this.node);
    }
    toSchema(options) {
        return graphql_1.buildASTSchema(this.toDocument(), options);
    }
    toJson(options) {
        const result = graphql_1.execute({
            schema: this.toSchema(options),
            document: graphql_1.parse(graphql_1.getIntrospectionQuery()),
        });
        return result;
    }
}
exports.DocumentBaseApi = DocumentBaseApi;
function documentBaseApi(node) {
    return new DocumentBaseApi(node);
}
exports.documentBaseApi = documentBaseApi;
