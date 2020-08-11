"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const AST = __importStar(require("./ast"));
exports.kindToNodeMap = {
    Name: AST.nameNode,
    Document: AST.documentNode,
    OperationDefinition: AST.operationDefinitionNode,
    VariableDefinition: AST.variableDefinitionNode,
    SelectionSet: AST.selectionSetNode,
    Field: AST.fieldNode,
    Argument: AST.argumentNode,
    FragmentSpread: AST.fragmentSpreadNode,
    InlineFragment: AST.inlineFragmentNode,
    FragmentDefinition: AST.fragmentDefinitionNode,
    Variable: AST.variableNode,
    IntValue: AST.intValueNode,
    FloatValue: AST.floatValueNode,
    StringValue: AST.stringValueNode,
    BooleanValue: AST.booleanValueNode,
    NullValue: AST.nullValueNode,
    EnumValue: AST.enumValueNode,
    ListValue: AST.listValueNode,
    ObjectValue: AST.objectValueNode,
    ObjectField: AST.objectFieldNode,
    Directive: AST.directiveNode,
    NamedType: AST.namedTypeNode,
    ListType: AST.listTypeNode,
    NonNullType: AST.nonNullTypeNode,
    SchemaDefinition: AST.schemaDefinitionNode,
    OperationTypeDefinition: AST.operationTypeDefinitionNode,
    ScalarTypeDefinition: AST.scalarTypeDefinitionNode,
    ObjectTypeDefinition: AST.objectTypeDefinitionNode,
    InterfaceTypeDefinition: AST.interfaceTypeDefinitionNode,
    UnionTypeDefinition: AST.unionTypeDefinitionNode,
    EnumValueDefinition: AST.enumValueDefinitionNode,
    InputObjectTypeDefinition: AST.inputObjectTypeDefinitionNode,
    FieldDefinition: AST.fieldDefinitionNode,
    InputValueDefinition: AST.inputValueDefinitionNode,
    EnumTypeDefinition: AST.enumTypeDefinitionNode,
    DirectiveDefinition: AST.directiveDefinitionNode,
    SchemaExtension: AST.schemaExtensionNode,
    ScalarTypeExtension: AST.scalarTypeExtensionNode,
    ObjectTypeExtension: AST.objectTypeExtensionNode,
    InterfaceTypeExtension: AST.interfaceTypeExtensionNode,
    UnionTypeExtension: AST.unionTypeExtensionNode,
    EnumTypeExtension: AST.enumTypeExtensionNode,
    InputObjectTypeExtension: AST.inputObjectTypeExtensionNode,
    ValueNode: AST.valueNode,
    SelectionNode: AST.selectionNode,
    DefinitionNode: AST.definitionNode,
    ExecutableDefinition: AST.executableDefinitionNode,
    TypeSystemDefinition: AST.typeSystemDefinitionNode,
    TypeSystemExtension: AST.typeSystemExtensionNode,
    TypeExtension: AST.typeExtensionNode,
    TypeDefinition: AST.typeDefinitionNode,
};
function kindToNode(kind) {
    const nodeFn = exports.kindToNodeMap[kind];
    if (!nodeFn) {
        throw Error(kindToNode.name + ` - invalid kind ${kind}`);
    }
    return nodeFn;
}
exports.kindToNode = kindToNode;
