import type * as GQL from 'graphql'
import {
  print,
  Kind,
  buildASTSchema,
  execute,
  getIntrospectionQuery,
  parse,
} from 'graphql'

import {
  Ast,
  Api,
} from '../internal'
import { Typename, Directivename, Fragmentname } from '../types'
import {
  SDLInput, parseSDL, Crud, DEFAULT_PARSE_OPTIONS, concat,
} from '../utils'
import { definitionApi, typeDefinitionApi, typeExtensionApi } from './definition'


/**
 * @category API Public
 */
export class DocumentBaseApi {
  constructor(readonly node = Ast.documentNode({ definitions: [] })) {
  }

  readonly _definitions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: definitionApi,
    factory: Ast.definitionNode,
    matcher: (n): string | undefined => ('name' in n ? n.name?.value : undefined),
  })

  readonly _typeDefinitions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: typeDefinitionApi,
    factory: Ast.typeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: 'TypeDefinition',
  })

  readonly _typeExtensions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: typeExtensionApi,
    factory: Ast.typeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: 'TypeExtension',
  })

  readonly _directiveDefinitions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.directiveDefinitionApi,
    factory: Ast.directiveDefinitionNode,
    matcher: (n): Directivename => n.name.value,
    kind: Kind.DIRECTIVE_DEFINITION,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  readonly _fragmentDefinitions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.fragmentDefinitionApi,
    factory: Ast.fragmentDefinitionNode,
    matcher: (n): Fragmentname => n.name.value,
    kind: Kind.FRAGMENT_DEFINITION,
  })

  readonly _operationDefinitions = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.operationDefinitionApi,
    factory: Ast.operationDefinitionNode,
    matcher: (n): string | undefined => n.name?.value,
    kind: Kind.OPERATION_DEFINITION,
  })

  // ────────────────────────────────────────────────────────────────────────────────

  readonly _objectTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.objectTypeApi,
    factory: Ast.objectTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.OBJECT_TYPE_DEFINITION,
  })

  readonly _objectExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.objectExtApi,
    factory: Ast.objectTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.OBJECT_TYPE_EXTENSION,
  })

  readonly _interfaceTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.interfaceTypeApi,
    factory: Ast.interfaceTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.INTERFACE_TYPE_DEFINITION,
  })

  readonly _interfaceExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.interfaceExtApi,
    factory: Ast.interfaceTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.INTERFACE_TYPE_EXTENSION,
  })

  readonly _scalarTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.scalarTypeApi,
    factory: Ast.scalarTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.SCALAR_TYPE_DEFINITION,
  })

  readonly _scalarExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.scalarExtApi,
    factory: Ast.scalarTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.SCALAR_TYPE_EXTENSION,
  })

  readonly _unionTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.unionTypeApi,
    factory: Ast.unionTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.UNION_TYPE_DEFINITION,
  })

  readonly _unionExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.unionExtApi,
    factory: Ast.unionTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.UNION_TYPE_EXTENSION,
  })

  readonly _enumTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.enumTypeApi,
    factory: Ast.enumTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.ENUM_TYPE_DEFINITION,
  })

  readonly _enumExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.enumExtApi,
    factory: Ast.enumTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.ENUM_TYPE_EXTENSION,
  })

  readonly _inputTypes = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.inputTypeApi,
    factory: Ast.inputObjectTypeDefinitionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
  })

  readonly _inputExts = new Crud({
    parent: this.node,
    key: 'definitions',
    api: Api.inputExtApi,
    factory: Ast.inputObjectTypeExtensionNode,
    matcher: (n): Typename => n.name.value,
    kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
  })

  // ────────────────────────────────────────────────────────────────────────────────
  // deserialisation

  /** add more typedefs */
  addSDL(sdl: SDLInput, options = DEFAULT_PARSE_OPTIONS): this {
    const definitions = parseSDL(sdl, options)

    concat(this.node.definitions, ...definitions)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // serialisation

  /** serialise to `DocumentNode` */
  toDocument(): GQL.DocumentNode {
    return this.node
  }

  /** serialise to `string` */
  toString(): string {
    return print(this.node)
  }

  /** serialise to `GraphQLSchema` */
  toSchema(options?: GQL.BuildSchemaOptions): GQL.GraphQLSchema {
    return buildASTSchema(this.toDocument(), options)
  }

  /** serialise to graphql introspection query result */
  toJson(options?: GQL.BuildSchemaOptions): GQL.ExecutionResult {
    // ! not validating if schema is valid!
    const result = execute({
      schema: this.toSchema(options),
      document: parse(getIntrospectionQuery()),
    })

    // it will be sync value, because schema has no (async) resolvers
    return result as GQL.ExecutionResult
  }
}

/**
 * `DocumentSchemaApi` constructor fn
 *
 * @category API Public
 */
export function documentBaseApi(node?: GQL.DocumentNode): DocumentBaseApi {
  return new DocumentBaseApi(node)
}
