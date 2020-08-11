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
exports.queryType = (props) => AST.objectTypeDefinitionNode({ name: 'Query', ...props });
exports.mutationType = (props) => AST.objectTypeDefinitionNode({ name: 'Mutation', ...props });
exports.subscriptionType = (props) => AST.objectTypeDefinitionNode({ name: 'Subscription', ...props });
exports.name = AST.nameNode;
exports.document = AST.documentNode;
exports.operation = AST.operationDefinitionNode;
exports.variable = AST.variableDefinitionNode;
exports.selections = AST.selectionSetNode;
exports.field = AST.fieldNode;
exports.arg = AST.argumentNode;
exports.fragmentSpread = AST.fragmentSpreadNode;
exports.inlineFragment = AST.inlineFragmentNode;
exports.fragmentDef = AST.fragmentDefinitionNode;
exports.value = {
    variable: AST.variableNode,
    int: AST.intValueNode,
    float: AST.floatValueNode,
    bool: AST.booleanValueNode,
    object: AST.objectValueNode,
    null: AST.nullValueNode,
    string: AST.stringValueNode,
    enum: AST.enumValueNode,
    list: AST.listValueNode,
    objectField: AST.objectFieldNode,
};
exports.directive = AST.directiveNode;
exports.type = {
    named: AST.namedTypeNode,
    list: AST.listTypeNode,
    nonNull: AST.nonNullTypeNode,
    id: () => AST.namedTypeNode('ID'),
    int: () => AST.namedTypeNode('Int'),
    float: () => AST.namedTypeNode('Float'),
    bool: () => AST.namedTypeNode('Boolean'),
    string: () => AST.namedTypeNode('String'),
    json: () => AST.namedTypeNode('JSON'),
    date: () => AST.namedTypeNode('Date'),
    dateTime: () => AST.namedTypeNode('DateTime'),
};
exports.schemaDef = AST.schemaDefinitionNode;
exports.operationType = AST.operationTypeDefinitionNode;
exports.scalarType = AST.scalarTypeDefinitionNode;
exports.objectType = AST.objectTypeDefinitionNode;
exports.interfaceType = AST.interfaceTypeDefinitionNode;
exports.unionType = AST.unionTypeDefinitionNode;
exports.enumType = AST.enumTypeDefinitionNode;
exports.inputType = AST.inputObjectTypeDefinitionNode;
exports.fieldDef = AST.fieldDefinitionNode;
exports.inputVal = AST.inputValueDefinitionNode;
exports.enumVal = AST.enumValueDefinitionNode;
exports.directiveDef = AST.directiveDefinitionNode;
exports.schemaExt = AST.schemaExtensionNode;
exports.objectExt = AST.objectTypeExtensionNode;
exports.interfaceExt = AST.interfaceTypeExtensionNode;
exports.unionExt = AST.unionTypeExtensionNode;
exports.scalarExt = AST.scalarTypeExtensionNode;
exports.enumExt = AST.enumTypeExtensionNode;
exports.inputObjectExt = AST.inputObjectTypeExtensionNode;
