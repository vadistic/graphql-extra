import type * as GQL from 'graphql';
import { WithKind, KindToAstMapping } from './types';
/**
 * `NameNode` create input subtype
 *
 * @category AST Node
 */
export declare type NameNodeObjProps = {
    name: string;
};
/**
 * `NameNode` create input
 *
 * @category AST Node
 */
export declare type NameNodeProps = NameNodeObjProps | string;
/**
 * create `NameNode`
 *
 * @category AST Node
 */
export declare function nameNode(props: NameNodeProps): GQL.NameNode;
/**
 * `DocumentNode` create input
 *
 * @category AST Node
 */
export declare type DocumentNodeProps = {
    definitions: ReadonlyArray<DefinitionNodeProps | GQL.DefinitionNode>;
};
/**
 * create `DocumentNode`
 *
 * @category AST Node
 */
export declare function documentNode({ definitions }: DocumentNodeProps): GQL.DocumentNode;
/**
 * `OperationDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type OperationDefinitionNodeProps = {
    name?: NameNodeProps | GQL.NameNode;
    operation: GQL.OperationTypeNode;
    variableDefinitions?: ReadonlyArray<VariableDefinitionNodeProps | GQL.VariableDefinitionNode>;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    selections: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>;
};
/**
 * create `OperationDefinitionNode`
 *
 * @category AST Node
 */
export declare function operationDefinitionNode(props: OperationDefinitionNodeProps): GQL.OperationDefinitionNode;
/**
 * `VariableDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type VariableDefinitionNodeProps = {
    variable: VariableNodeProps | GQL.VariableNode;
    type: TypeNodeProps | GQL.TypeNode;
    defaultValue?: GQL.ValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * create `VariableDefinitionNode`
 *
 * @category AST Node
 */
export declare function variableDefinitionNode(props: VariableDefinitionNodeProps): GQL.VariableDefinitionNode;
/**
 * `VariableNode` create input subtype
 *
 * @category AST Node
 */
export declare type VariableNodeObjProps = {
    name: string;
};
/**
 * `VariableNode` create input
 *
 * @category AST Node
 */
export declare type VariableNodeProps = string | VariableNodeObjProps;
/**
 * create `VariableNode`
 *
 * @category AST Node
 */
export declare function variableNode(props: VariableNodeProps): GQL.VariableNode;
/**
 * `SelectionSetNode` create input
 *
 * @category AST Node
 */
export declare type SelectionSetNodeProps = {
    selections: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>;
};
/**
 * create `SelectionSetNode`
 *
 * @category AST Node
 */
export declare function selectionSetNode(props: SelectionSetNodeProps): GQL.SelectionSetNode;
/**
 * `FieldNode` create input subtype
 *
 * @category AST Node
 */
export declare type FieldNodeObjProps = {
    name: GQL.NameNode | NameNodeProps;
    alias?: GQL.NameNode | NameNodeProps;
    arguments?: ReadonlyArray<ArgumentNodeProps | GQL.ArgumentNode>;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    selections?: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>;
};
/**
 * `FieldNode` create input
 *
 * @category AST Node
 */
export declare type FieldNodeProps = FieldNodeObjProps | string;
/**
 * create `FieldNode`
 *
 * @category AST Node
 */
export declare function fieldNode(props: FieldNodeProps): GQL.FieldNode;
/**
 * `ArgumentNode` create input
 *
 * @category AST Node
 */
export declare type ArgumentNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    value: GQL.ValueNode;
};
/**
 * create `ArgumentNode`
 *
 * @category AST Node
 */
export declare function argumentNode(props: ArgumentNodeProps): GQL.ArgumentNode;
/**
 * `FragmentSpreadNode` create input subtype
 *
 * @category AST Node
 */
export declare type FragmentSpreadNodeObjProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * `FragmentSpreadNode` create input
 *
 * @category AST Node
 */
export declare type FragmentSpreadNodeProps = string | FragmentSpreadNodeObjProps;
/**
 * create `FragmentSpreadNode`
 *
 * @category AST Node
 */
export declare function fragmentSpreadNode(props: FragmentSpreadNodeProps): GQL.FragmentSpreadNode;
/**
 * `InlineFragmentNode` create input
 *
 * @category AST Node
 */
export declare type InlineFragmentNodeProps = {
    typeCondition?: NamedTypeNodeProps | GQL.NamedTypeNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    selections: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>;
};
/**
 * create `InlineFragmentNode`
 *
 * @category AST Node
 */
export declare function inlineFragmentNode(props: InlineFragmentNodeProps): GQL.InlineFragmentNode;
/**
 * `FragmentDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type FragmentDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    variableDefinitions?: ReadonlyArray<VariableDefinitionNodeProps | GQL.VariableDefinitionNode>;
    typeCondition: NamedTypeNodeProps | GQL.NamedTypeNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    selections: ReadonlyArray<SelectionNodeProps | GQL.SelectionNode>;
};
/**
 * create `FragmentDefinitionNode`
 *
 * @category AST Node
 */
export declare function fragmentDefinitionNode(props: FragmentDefinitionNodeProps): GQL.FragmentDefinitionNode;
/**
 * `IntValueNode` create input subtype
 *
 * @category AST Node
 */
export declare type IntValueNodeObjProps = {
    value: string | number;
};
/**
 * `IntValueNode` create input
 *
 * @category AST Node
 */
export declare type IntValueNodeProps = IntValueNodeObjProps | string | number;
/**
 * create `IntValueNode`
 *
 * @category AST Node
 */
export declare function intValueNode(props: IntValueNodeProps): GQL.IntValueNode;
/**
 * `IntValueNode` create input subtype
 *
 * @category AST Node
 */
export declare type FloatValueNodeObjProps = {
    value: string | number;
};
/**
 * `FloatValueNode` create input
 *
 * @category AST Node
 */
export declare type FloatValueNodeProps = FloatValueNodeObjProps | string | number;
/**
 * create `FloatValueNode`
 *
 * @category AST Node
 */
export declare function floatValueNode(props: FloatValueNodeProps): GQL.FloatValueNode;
/**
 * `StringValueNode` create input subtype
 *
 * @category AST Node
 */
export declare type StringValueNodeObjProps = {
    value: string;
};
/**
 * `StringValueNode` create input
 *
 * @category AST Node
 */
export declare type StringValueNodeProps = StringValueNodeObjProps | string;
/**
 * create `StringValueNode`
 *
 * @category AST Node
 */
export declare function stringValueNode(props: StringValueNodeProps): GQL.StringValueNode;
/**
 * `BooleanValueNode` create input subtype
 *
 * @category AST Node
 */
export declare type BooleanValueNodeObjProps = {
    value: boolean | string | number;
};
/**
 * `BooleanValueNode` create input
 *
 * @category AST Node
 */
export declare type BooleanValueNodeProps = BooleanValueNodeObjProps | boolean | string | number;
/**
 * create `BooleanValueNode`
 *
 * @category AST Node
 */
export declare function booleanValueNode(props: BooleanValueNodeProps): GQL.BooleanValueNode;
/**
 * create `NullValueNode`
 *
 * @category AST Node
 */
export declare function nullValueNode(props?: never): GQL.NullValueNode;
/**
 * `EnumValueNode` create input subtype
 *
 * @category AST Node
 */
export declare type EnumValueNodeObjProps = {
    value: string;
};
/**
 * `EnumValueNode` create input
 *
 * @category AST Node
 */
export declare type EnumValueNodeProps = EnumValueNodeObjProps | string;
/**
 * create `EnumValueNode`
 *
 * @category AST Node
 */
export declare function enumValueNode(props: EnumValueNodeProps): GQL.EnumValueNode;
/**
 * `ListValueNode` create input
 *
 * @category AST Node
 */
export declare type ListValueNodeProps = {
    values: ReadonlyArray<GQL.ValueNode>;
};
/**
 * `ListValueNode`
 *
 * @category AST Node
 */
export declare function listValueNode(props: ListValueNodeProps): GQL.ListValueNode;
/**
 * `ObjectValueNode` create input
 *
 * @category AST Node
 */
export declare type ObjectValueNodeProps = {
    fields: ReadonlyArray<GQL.ObjectFieldNode>;
};
/**
 * create `ObjectValueNode`
 *
 * @category AST Node
 */
export declare function objectValueNode(props: ObjectValueNodeProps): GQL.ObjectValueNode;
/**
 * `ObjectFieldNode` create input
 *
 * @category AST Node
 */
export declare type ObjectFieldNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    value: GQL.ValueNode;
};
/**
 * create `ObjectFieldNode`
 *
 * @category AST Node
 */
export declare function objectFieldNode(props: ObjectFieldNodeProps): GQL.ObjectFieldNode;
/**
 * `DirectiveNode` create input subtype
 *
 * @category AST Node
 */
export declare type DirectiveNodeObjProps = {
    name: NameNodeProps | GQL.NameNode;
    arguments?: ReadonlyArray<GQL.ArgumentNode | ArgumentNodeProps>;
};
/**
 * `DirectiveNode` create input
 *
 * @category AST Node
 */
export declare type DirectiveNodeProps = DirectiveNodeObjProps | string;
/**
 * create `DirectiveNode`
 *
 * @category AST Node
 */
export declare function directiveNode(directive: DirectiveNodeProps): GQL.DirectiveNode;
/**
 * `NamedTypeNode` create input
 *
 * @category AST Node
 */
export declare type NamedTypeNodeProps = string | NameNodeProps | GQL.NameNode;
/**
 * create `NamedTypeNode`
 *
 * @category AST Node
 */
export declare function namedTypeNode(props: NamedTypeNodeProps): GQL.NamedTypeNode;
/**
 * `ListTypeNode` create input
 *
 * @category AST Node
 */
export declare type ListTypeNodeProps = string | TypeNodeProps | GQL.TypeNode;
/**
 * create `ListTypeNode`
 *
 * @category AST Node
 */
export declare function listTypeNode(props: ListTypeNodeProps): GQL.ListTypeNode;
/**
 * `NonNullTypeNode` create input
 *
 * @category AST Node
 */
export declare type NonNullTypeNodeProps = string | TypeNodeProps | GQL.TypeNode;
/**
 * create `NonNullTypeNode`
 *
 * @category AST Node
 */
export declare function nonNullTypeNode(props: NonNullTypeNodeProps): GQL.NonNullTypeNode;
/**
 * `TypeNode` create input subtype
 *
 * @category AST Node
 */
export declare type TypeNodeObjProps = {
    named: NamedTypeNodeProps | GQL.NamedTypeNode;
    list?: boolean;
    nonNull?: boolean;
};
/**
 * `TypeNode` create input
 *
 * @category AST Node
 */
export declare type TypeNodeProps = TypeNodeObjProps | string;
/**
 * create `TypeNode`
 *
 * @category AST Node
 */
export declare function typeNode(type: TypeNodeProps): GQL.TypeNode;
/**
 * `SchemaDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type SchemaDefinitionNodeProps = {
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    operationTypes: ReadonlyArray<OperationTypeDefinitionNodeProps | GQL.OperationTypeDefinitionNode>;
};
/**
 * create `SchemaDefinitionNode`
 *
 * @category AST Node
 */
export declare function schemaDefinitionNode(props: SchemaDefinitionNodeProps): GQL.SchemaDefinitionNode;
/**
 * `OperationTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type OperationTypeDefinitionNodeProps = {
    operation: GQL.OperationTypeNode;
    type: NamedTypeNodeProps | GQL.NamedTypeNode;
};
/**
 * create `OperationTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function operationTypeDefinitionNode(props: OperationTypeDefinitionNodeProps): GQL.OperationTypeDefinitionNode;
/**
 * `ScalarTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type ScalarTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * create `ScalarTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function scalarTypeDefinitionNode(props: ScalarTypeDefinitionNodeProps): GQL.ScalarTypeDefinitionNode;
/**
 * `ObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type ObjectTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    interfaces?: ReadonlyArray<NamedTypeNodeProps | GQL.NamedTypeNode>;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<FieldDefinitionNodeProps | GQL.FieldDefinitionNode>;
};
/**
 * create `ObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function objectTypeDefinitionNode(props: ObjectTypeDefinitionNodeProps): GQL.ObjectTypeDefinitionNode;
/**
 * `FieldDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type FieldDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    arguments?: ReadonlyArray<InputValueDefinitionNodeProps | GQL.InputValueDefinitionNode>;
    type: TypeNodeProps | GQL.TypeNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * create `FieldDefinitionNode`
 *
 * @category AST Node
 */
export declare function fieldDefinitionNode(props: FieldDefinitionNodeProps): GQL.FieldDefinitionNode;
/**
 * `InputValueDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type InputValueDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    type: TypeNodeProps | GQL.TypeNode;
    defaultValue?: GQL.ValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * create `InputValueDefinitionNode`
 *
 * @category AST Node
 */
export declare function inputValueDefinitionNode(props: InputValueDefinitionNodeProps): GQL.InputValueDefinitionNode;
/**
 * `InterfaceTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type InterfaceTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<FieldDefinitionNodeProps | GQL.FieldDefinitionNode>;
};
/**
 * create `InterfaceTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function interfaceTypeDefinitionNode(props: InterfaceTypeDefinitionNodeProps): GQL.InterfaceTypeDefinitionNode;
/**
 * `UnionTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type UnionTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    types?: ReadonlyArray<NamedTypeNodeProps | GQL.NamedTypeNode>;
};
/**
 * create `UnionTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function unionTypeDefinitionNode(props: UnionTypeDefinitionNodeProps): GQL.UnionTypeDefinitionNode;
/**
 * `EnumTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type EnumTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    values?: ReadonlyArray<EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode>;
};
/**
 * create `EnumTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function enumTypeDefinitionNode(props: EnumTypeDefinitionNodeProps): GQL.EnumTypeDefinitionNode;
/**
 * `EnumValueDefinitionNode` create input subtype
 *
 * @category AST Node
 */
export declare type EnumValueDefinitionNodeObjProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * `EnumValueDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type EnumValueDefinitionNodeProps = EnumValueDefinitionNodeObjProps | string;
/**
 * create `EnumValueDefinitionNode`
 *
 * @category AST Node
 */
export declare function enumValueDefinitionNode(props: EnumValueDefinitionNodeProps): GQL.EnumValueDefinitionNode;
/**
 * `InputObjectTypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type InputObjectTypeDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<InputValueDefinitionNodeProps | GQL.InputValueDefinitionNode>;
};
/**
 * create `InputObjectTypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function inputObjectTypeDefinitionNode(props: InputObjectTypeDefinitionNodeProps): GQL.InputObjectTypeDefinitionNode;
/**
 * `DirectiveDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type DirectiveDefinitionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    description?: StringValueNodeProps | GQL.StringValueNode;
    arguments?: ReadonlyArray<InputValueDefinitionNodeProps | GQL.InputValueDefinitionNode>;
    repeatable?: boolean;
    locations: ReadonlyArray<GQL.DirectiveLocationEnum | GQL.NameNode>;
};
/**
 * create `DirectiveDefinitionNode`
 *
 * @category AST Node
 */
export declare function directiveDefinitionNode(props: DirectiveDefinitionNodeProps): GQL.DirectiveDefinitionNode;
/**
 * `SchemaExtensionNode` create input
 *
 * @category AST Node
 */
export declare type SchemaExtensionNodeProps = {
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    operationTypes: ReadonlyArray<OperationTypeDefinitionNodeProps | GQL.OperationTypeDefinitionNode>;
};
/**
 * create `SchemaExtensionNode`
 *
 * @category AST Node
 */
export declare function schemaExtensionNode(props: SchemaExtensionNodeProps): GQL.SchemaExtensionNode;
/**
 * `ScalarTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type ScalarTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
};
/**
 * create `ScalarTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function scalarTypeExtensionNode(props: ScalarTypeExtensionNodeProps): GQL.ScalarTypeExtensionNode;
/**
 * `ObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type ObjectTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    interfaces?: ReadonlyArray<NamedTypeNodeProps | GQL.NamedTypeNode>;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<FieldDefinitionNodeProps | GQL.FieldDefinitionNode>;
};
/**
 * create `ObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function objectTypeExtensionNode(props: ObjectTypeExtensionNodeProps): GQL.ObjectTypeExtensionNode;
/**
 * `InterfaceTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type InterfaceTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<FieldDefinitionNodeProps | GQL.FieldDefinitionNode>;
};
/**
 * create `InterfaceTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function interfaceTypeExtensionNode(props: InterfaceTypeExtensionNodeProps): GQL.InterfaceTypeExtensionNode;
/**
 * `UnionTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type UnionTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    types?: ReadonlyArray<NamedTypeNodeProps | GQL.NamedTypeNode>;
};
/**
 * create `UnionTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function unionTypeExtensionNode(props: UnionTypeExtensionNodeProps): GQL.UnionTypeExtensionNode;
/**
 * `EnumTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type EnumTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    values?: ReadonlyArray<EnumValueDefinitionNodeProps | GQL.EnumValueDefinitionNode>;
};
/**
 * create `EnumTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function enumTypeExtensionNode(props: EnumTypeExtensionNodeProps): GQL.EnumTypeExtensionNode;
/**
 * `InputObjectTypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type InputObjectTypeExtensionNodeProps = {
    name: NameNodeProps | GQL.NameNode;
    directives?: ReadonlyArray<DirectiveNodeProps | GQL.DirectiveNode>;
    fields?: ReadonlyArray<InputValueDefinitionNodeProps | GQL.InputValueDefinitionNode>;
};
/**
 * create `InputObjectTypeExtensionNode`
 *
 * @category AST Node
 */
export declare function inputObjectTypeExtensionNode(props: InputObjectTypeExtensionNodeProps): GQL.InputObjectTypeExtensionNode;
/**
 * `TypeDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type TypeDefinitionNodeProps = WithKind<ObjectTypeDefinitionNodeProps, 'ObjectTypeDefinition'> | WithKind<InterfaceTypeDefinitionNodeProps, 'InterfaceTypeDefinition'> | WithKind<ScalarTypeDefinitionNodeProps, 'ScalarTypeDefinition'> | WithKind<UnionTypeDefinitionNodeProps, 'UnionTypeDefinition'> | WithKind<EnumTypeDefinitionNodeProps, 'EnumTypeDefinition'> | WithKind<InputObjectTypeDefinitionNodeProps, 'InputObjectTypeDefinition'>;
/**
 * map `TypeDefinitionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToTypeDefinitionNode: KindToAstMapping<GQL.TypeDefinitionNode>;
/**
 * create `TypeDefinitionNode`
 *
 * @category AST Node
 */
export declare function typeDefinitionNode({ kind, ...props }: TypeDefinitionNodeProps): GQL.TypeDefinitionNode;
/**
 * `TypeExtensionNode` create input
 *
 * @category AST Node
 */
export declare type TypeExtensionNodeProps = WithKind<ObjectTypeExtensionNodeProps, 'ObjectTypeExtension'> | WithKind<InterfaceTypeExtensionNodeProps, 'InterfaceTypeExtension'> | WithKind<ScalarTypeExtensionNodeProps, 'ScalarTypeExtension'> | WithKind<UnionTypeExtensionNodeProps, 'UnionTypeExtension'> | WithKind<EnumTypeExtensionNodeProps, 'EnumTypeExtension'> | WithKind<InputObjectTypeExtensionNodeProps, 'InputObjectTypeExtension'>;
/**
 * map `TypeExtensionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToTypeExtensionNode: KindToAstMapping<GQL.TypeExtensionNode>;
/**
 * create `TypeExtensionNode`
 *
 * @category AST Node
 */
export declare function typeExtensionNode({ kind, ...props }: TypeExtensionNodeProps): GQL.TypeExtensionNode;
/**
 * `TypeSystemDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type TypeSystemDefinitionNodeProps = WithKind<SchemaDefinitionNodeProps, 'SchemaDefinition'> | WithKind<DirectiveDefinitionNodeProps, 'DirectiveDefinition'> | TypeDefinitionNodeProps;
/**
 * map `TypeSystemDefinitionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToTypeSystemDefinitionNode: KindToAstMapping<GQL.TypeSystemDefinitionNode>;
/**
 * create `TypeSystemDefinitionNode`
 *
 * @category AST Node
 */
export declare function typeSystemDefinitionNode({ kind, ...props }: TypeSystemDefinitionNodeProps): GQL.TypeSystemDefinitionNode;
/**
 * `TypeSystemExtensionNode` create input
 *
 * @category AST Node
 */
export declare type TypeSystemExtensionNodeProps = WithKind<SchemaExtensionNodeProps, 'SchemaExtension'> | TypeExtensionNodeProps;
/**
 * map `TypeSystemExtensionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToTypeSystemExtensionNode: KindToAstMapping<GQL.TypeSystemExtensionNode>;
/**
 * create `TypeSystemExtensionNode`
 *
 * @category AST Node
 */
export declare function typeSystemExtensionNode({ kind, ...props }: TypeSystemExtensionNodeProps): GQL.TypeSystemExtensionNode;
/**
 * `ExecutableDefinitionNode` create input
 *
 * @category AST Node
 */
export declare type ExecutableDefinitionNodeProps = WithKind<OperationDefinitionNodeProps, 'OperationDefinition'> | WithKind<FragmentDefinitionNodeProps, 'FragmentDefinition'>;
/**
 * map `ExecutableDefinitionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToTypeExecutableDefinitionNode: KindToAstMapping<GQL.ExecutableDefinitionNode>;
/**
 * create `ExecutableDefinitionNode`
 *
 * @category AST Node
 */
export declare function executableDefinitionNode({ kind, ...props }: ExecutableDefinitionNodeProps): GQL.ExecutableDefinitionNode;
/**
 * `DefinitionNode` create input
 *
 * @category AST Node
 */
export declare type DefinitionNodeProps = TypeSystemDefinitionNodeProps | TypeSystemExtensionNodeProps | ExecutableDefinitionNodeProps;
/**
 * map `DefinitionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToDefinitionNode: KindToAstMapping<GQL.DefinitionNode>;
/**
 * create `DefinitionNode`
 *
 * @category AST Node
 */
export declare function definitionNode({ kind, ...props }: DefinitionNodeProps): GQL.DefinitionNode;
/**
 * `SelectionNode` create input
 *
 * @category AST Node
 */
export declare type SelectionNodeProps = FieldNodeProps | WithKind<FieldNodeObjProps, 'Field'> | WithKind<FragmentSpreadNodeObjProps, 'FragmentSpread'> | WithKind<InlineFragmentNodeProps, 'InlineFragment'>;
/**
 * map `SelectionNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToSelectionNode: KindToAstMapping<GQL.SelectionNode>;
/**
 * create `SelectionNode`
 *
 * @category AST Node
 */
export declare function selectionNode(props: SelectionNodeProps): GQL.SelectionNode;
/**
 * `ValueNode` create input
 *
 * @category AST Node
 */
export declare type ValueNodeProps = WithKind<IntValueNodeObjProps, 'IntValue'> | WithKind<BooleanValueNodeObjProps, 'BooleanValue'> | WithKind<FloatValueNodeObjProps, 'FloatValue'> | WithKind<StringValueNodeObjProps, 'StringValue'> | WithKind<{}, 'NullValue'> | WithKind<VariableNodeObjProps, 'Variable'> | WithKind<EnumValueNodeObjProps, 'EnumValue'> | WithKind<ListValueNodeProps, 'ListValue'> | WithKind<ObjectValueNodeProps, 'ObjectValue'>;
/**
 * map `ValueNode` kind to ast factory
 *
 * @category AST Node
 */
export declare const kindToValueNode: KindToAstMapping<GQL.ValueNode>;
/**
 * create `ValueNode`
 *
 * @category AST Node
 */
export declare function valueNode(props: ValueNodeProps): GQL.ValueNode;
