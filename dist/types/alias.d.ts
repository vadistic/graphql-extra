import type * as GQL from 'graphql';
import * as AST from './ast';
/**
 * @category AST Alias
 */
export declare type RootTypeDefinitionProps = Omit<AST.ObjectTypeDefinitionNodeProps, 'name'> & {
    name?: GQL.NameNode | AST.NameNodeProps;
};
/**
 * @category AST Alias
 */
export declare const queryType: (props: RootTypeDefinitionProps) => GQL.ObjectTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const mutationType: (props: RootTypeDefinitionProps) => GQL.ObjectTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const subscriptionType: (props: RootTypeDefinitionProps) => GQL.ObjectTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const name: typeof AST.nameNode;
/**
 * @category AST Alias
 */
export declare const document: typeof AST.documentNode;
/**
 * @category AST Alias
 */
export declare const operation: typeof AST.operationDefinitionNode;
/**
 * @category AST Alias
 */
export declare const variable: typeof AST.variableDefinitionNode;
/**
 * @category AST Alias
 */
export declare const selections: typeof AST.selectionSetNode;
/**
 * @category AST Alias
 */
export declare const field: typeof AST.fieldNode;
/**
 * @category AST Alias
 */
export declare const arg: typeof AST.argumentNode;
/**
 * @category AST Alias
 */
export declare const fragmentSpread: typeof AST.fragmentSpreadNode;
/**
 * @category AST Alias
 */
export declare const inlineFragment: typeof AST.inlineFragmentNode;
/**
 * @category AST Alias
 */
export declare const fragmentDef: typeof AST.fragmentDefinitionNode;
/**
 * @category AST Alias
 */
export declare const value: {
    variable: typeof AST.variableNode;
    int: typeof AST.intValueNode;
    float: typeof AST.floatValueNode;
    bool: typeof AST.booleanValueNode;
    object: typeof AST.objectValueNode;
    null: typeof AST.nullValueNode;
    string: typeof AST.stringValueNode;
    enum: typeof AST.enumValueNode;
    list: typeof AST.listValueNode;
    objectField: typeof AST.objectFieldNode;
};
/**
 * @category AST Alias
 */
export declare const directive: typeof AST.directiveNode;
/**
 * @category AST Alias
 */
export declare const type: {
    named: typeof AST.namedTypeNode;
    list: typeof AST.listTypeNode;
    nonNull: typeof AST.nonNullTypeNode;
    id: () => GQL.NamedTypeNode;
    int: () => GQL.NamedTypeNode;
    float: () => GQL.NamedTypeNode;
    bool: () => GQL.NamedTypeNode;
    string: () => GQL.NamedTypeNode;
    json: () => GQL.NamedTypeNode;
    date: () => GQL.NamedTypeNode;
    dateTime: () => GQL.NamedTypeNode;
};
/**
 * @category AST Alias
 */
export declare const schemaDef: typeof AST.schemaDefinitionNode;
/**
 * @category AST Alias
 */
export declare const operationType: typeof AST.operationTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const scalarType: typeof AST.scalarTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const objectType: typeof AST.objectTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const interfaceType: typeof AST.interfaceTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const unionType: typeof AST.unionTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const enumType: typeof AST.enumTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const inputType: typeof AST.inputObjectTypeDefinitionNode;
/**
 * @category AST Alias
 */
export declare const fieldDef: typeof AST.fieldDefinitionNode;
/**
 * @category AST Alias
 */
export declare const inputVal: typeof AST.inputValueDefinitionNode;
/**
 * @category AST Alias
 */
export declare const enumVal: typeof AST.enumValueDefinitionNode;
/**
 * @category AST Alias
 */
export declare const directiveDef: typeof AST.directiveDefinitionNode;
/**
 * @category AST Alias
 */
export declare const schemaExt: typeof AST.schemaExtensionNode;
/**
 * @category AST Alias
 */
export declare const objectExt: typeof AST.objectTypeExtensionNode;
/**
 * @category AST Alias
 */
export declare const interfaceExt: typeof AST.interfaceTypeExtensionNode;
/**
 * @category AST Alias
 */
export declare const unionExt: typeof AST.unionTypeExtensionNode;
/**
 * @category AST Alias
 */
export declare const scalarExt: typeof AST.scalarTypeExtensionNode;
/**
 * @category AST Alias
 */
export declare const enumExt: typeof AST.enumTypeExtensionNode;
/**
 * @category AST Alias
 */
export declare const inputObjectExt: typeof AST.inputObjectTypeExtensionNode;
