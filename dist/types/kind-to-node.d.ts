import * as AST from './ast';
/**
 * @category Helper
 */
export declare const kindToNodeMap: {
    Name: typeof AST.nameNode;
    Document: typeof AST.documentNode;
    OperationDefinition: typeof AST.operationDefinitionNode;
    VariableDefinition: typeof AST.variableDefinitionNode;
    SelectionSet: typeof AST.selectionSetNode;
    Field: typeof AST.fieldNode;
    Argument: typeof AST.argumentNode;
    FragmentSpread: typeof AST.fragmentSpreadNode;
    InlineFragment: typeof AST.inlineFragmentNode;
    FragmentDefinition: typeof AST.fragmentDefinitionNode;
    Variable: typeof AST.variableNode;
    IntValue: typeof AST.intValueNode;
    FloatValue: typeof AST.floatValueNode;
    StringValue: typeof AST.stringValueNode;
    BooleanValue: typeof AST.booleanValueNode;
    NullValue: typeof AST.nullValueNode;
    EnumValue: typeof AST.enumValueNode;
    ListValue: typeof AST.listValueNode;
    ObjectValue: typeof AST.objectValueNode;
    ObjectField: typeof AST.objectFieldNode;
    Directive: typeof AST.directiveNode;
    NamedType: typeof AST.namedTypeNode;
    ListType: typeof AST.listTypeNode;
    NonNullType: typeof AST.nonNullTypeNode;
    SchemaDefinition: typeof AST.schemaDefinitionNode;
    OperationTypeDefinition: typeof AST.operationTypeDefinitionNode;
    ScalarTypeDefinition: typeof AST.scalarTypeDefinitionNode;
    ObjectTypeDefinition: typeof AST.objectTypeDefinitionNode;
    InterfaceTypeDefinition: typeof AST.interfaceTypeDefinitionNode;
    UnionTypeDefinition: typeof AST.unionTypeDefinitionNode;
    EnumValueDefinition: typeof AST.enumValueDefinitionNode;
    InputObjectTypeDefinition: typeof AST.inputObjectTypeDefinitionNode;
    FieldDefinition: typeof AST.fieldDefinitionNode;
    InputValueDefinition: typeof AST.inputValueDefinitionNode;
    EnumTypeDefinition: typeof AST.enumTypeDefinitionNode;
    DirectiveDefinition: typeof AST.directiveDefinitionNode;
    SchemaExtension: typeof AST.schemaExtensionNode;
    ScalarTypeExtension: typeof AST.scalarTypeExtensionNode;
    ObjectTypeExtension: typeof AST.objectTypeExtensionNode;
    InterfaceTypeExtension: typeof AST.interfaceTypeExtensionNode;
    UnionTypeExtension: typeof AST.unionTypeExtensionNode;
    EnumTypeExtension: typeof AST.enumTypeExtensionNode;
    InputObjectTypeExtension: typeof AST.inputObjectTypeExtensionNode;
    ValueNode: typeof AST.valueNode;
    SelectionNode: typeof AST.selectionNode;
    DefinitionNode: typeof AST.definitionNode;
    ExecutableDefinition: typeof AST.executableDefinitionNode;
    TypeSystemDefinition: typeof AST.typeSystemDefinitionNode;
    TypeSystemExtension: typeof AST.typeSystemExtensionNode;
    TypeExtension: typeof AST.typeExtensionNode;
    TypeDefinition: typeof AST.typeDefinitionNode;
};
/**
 * @category Helper
 */
export declare type KindToNodeMap = typeof kindToNodeMap;
/**
 * @category Helper
 */
export declare type KindToNodeProps<K> = K extends keyof KindToNodeMap ? Parameters<KindToNodeMap[K]>[0] : never;
/**
 * @category Helper
 */
export declare type KindToNode<K> = K extends keyof KindToNodeMap ? (props: Parameters<KindToNodeMap[K]>[0]) => ReturnType<KindToNodeMap[K]> : never;
/**
 * @category Helper
 */
export declare function kindToNode<K extends keyof KindToNodeMap>(kind: K): (props: Parameters<KindToNodeMap[K]>[0]) => ReturnType<KindToNodeMap[K]>;
