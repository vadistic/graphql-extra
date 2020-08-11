import { print, Kind, buildASTSchema, execute, getIntrospectionQuery, parse, } from 'graphql';
import { Ast, Api, } from '../internal';
import { parseSDL, Crud, DEFAULT_PARSE_OPTIONS, concat, } from '../utils';
import { definitionApi, typeDefinitionApi, typeExtensionApi } from './definition';
export class DocumentBaseApi {
    constructor(node = Ast.documentNode({ definitions: [] })) {
        this.node = node;
        this._definitions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: definitionApi,
            factory: Ast.definitionNode,
            matcher: (n) => { var _a; return ('name' in n ? (_a = n.name) === null || _a === void 0 ? void 0 : _a.value : undefined); },
        });
        this._typeDefinitions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: typeDefinitionApi,
            factory: Ast.typeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [
                Kind.OBJECT_TYPE_DEFINITION,
                Kind.INPUT_OBJECT_TYPE_DEFINITION,
                Kind.SCALAR_TYPE_DEFINITION,
                Kind.ENUM_TYPE_DEFINITION,
                Kind.UNION_TYPE_DEFINITION,
                Kind.INPUT_OBJECT_TYPE_DEFINITION,
            ],
        });
        this._typeExtensions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: typeExtensionApi,
            factory: Ast.typeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [
                Kind.OBJECT_TYPE_EXTENSION,
                Kind.INPUT_OBJECT_TYPE_EXTENSION,
                Kind.SCALAR_TYPE_EXTENSION,
                Kind.ENUM_TYPE_EXTENSION,
                Kind.UNION_TYPE_EXTENSION,
                Kind.INPUT_OBJECT_TYPE_EXTENSION,
            ],
        });
        this._directiveDefinitions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.directiveDefinitionApi,
            factory: Ast.directiveDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.DIRECTIVE_DEFINITION],
        });
        this._fragmentDefinitions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.fragmentDefinitionApi,
            factory: Ast.fragmentDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.FRAGMENT_DEFINITION],
        });
        this._operationDefinitions = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.operationDefinitionApi,
            factory: Ast.operationDefinitionNode,
            matcher: (n) => { var _a; return (_a = n.name) === null || _a === void 0 ? void 0 : _a.value; },
            kindFilter: [Kind.OPERATION_DEFINITION],
        });
        this._objectTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.objectTypeApi,
            factory: Ast.objectTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.OBJECT_TYPE_DEFINITION],
        });
        this._objectExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.objectExtApi,
            factory: Ast.objectTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.OBJECT_TYPE_EXTENSION],
        });
        this._interfaceTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.interfaceTypeApi,
            factory: Ast.interfaceTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.INTERFACE_TYPE_DEFINITION],
        });
        this._interfaceExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.interfaceExtApi,
            factory: Ast.interfaceTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.INTERFACE_TYPE_EXTENSION],
        });
        this._scalarTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.scalarTypeApi,
            factory: Ast.scalarTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.SCALAR_TYPE_DEFINITION],
        });
        this._scalarExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.scalarExtApi,
            factory: Ast.scalarTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.SCALAR_TYPE_EXTENSION],
        });
        this._unionTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.unionTypeApi,
            factory: Ast.unionTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.UNION_TYPE_DEFINITION],
        });
        this._unionExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.unionExtApi,
            factory: Ast.unionTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.UNION_TYPE_EXTENSION],
        });
        this._enumTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.enumTypeApi,
            factory: Ast.enumTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.ENUM_TYPE_DEFINITION],
        });
        this._enumExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.enumExtApi,
            factory: Ast.enumTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.ENUM_TYPE_EXTENSION],
        });
        this._inputTypes = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.inputTypeApi,
            factory: Ast.inputObjectTypeDefinitionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.INPUT_OBJECT_TYPE_DEFINITION],
        });
        this._inputExts = new Crud({
            parent: this.node,
            key: 'definitions',
            api: Api.inputExtApi,
            factory: Ast.inputObjectTypeExtensionNode,
            matcher: (n) => n.name.value,
            kindFilter: [Kind.INPUT_OBJECT_TYPE_EXTENSION],
        });
    }
    addSDL(sdl, options = DEFAULT_PARSE_OPTIONS) {
        const definitions = parseSDL(sdl, options);
        concat(this.node.definitions, ...definitions);
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
        return print(this.node);
    }
    toSchema(options) {
        return buildASTSchema(this.toDocument(), options);
    }
    toJson(options) {
        const result = execute({
            schema: this.toSchema(options),
            document: parse(getIntrospectionQuery()),
        });
        return result;
    }
}
export function documentBaseApi(node) {
    return new DocumentBaseApi(node);
}
