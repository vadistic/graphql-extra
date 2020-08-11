import * as AST from './ast';
export const queryType = (props) => AST.objectTypeDefinitionNode({ name: 'Query', ...props });
export const mutationType = (props) => AST.objectTypeDefinitionNode({ name: 'Mutation', ...props });
export const subscriptionType = (props) => AST.objectTypeDefinitionNode({ name: 'Subscription', ...props });
export const name = AST.nameNode;
export const document = AST.documentNode;
export const operation = AST.operationDefinitionNode;
export const variable = AST.variableDefinitionNode;
export const selections = AST.selectionSetNode;
export const field = AST.fieldNode;
export const arg = AST.argumentNode;
export const fragmentSpread = AST.fragmentSpreadNode;
export const inlineFragment = AST.inlineFragmentNode;
export const fragmentDef = AST.fragmentDefinitionNode;
export const value = {
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
export const directive = AST.directiveNode;
export const type = {
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
export const schemaDef = AST.schemaDefinitionNode;
export const operationType = AST.operationTypeDefinitionNode;
export const scalarType = AST.scalarTypeDefinitionNode;
export const objectType = AST.objectTypeDefinitionNode;
export const interfaceType = AST.interfaceTypeDefinitionNode;
export const unionType = AST.unionTypeDefinitionNode;
export const enumType = AST.enumTypeDefinitionNode;
export const inputType = AST.inputObjectTypeDefinitionNode;
export const fieldDef = AST.fieldDefinitionNode;
export const inputVal = AST.inputValueDefinitionNode;
export const enumVal = AST.enumValueDefinitionNode;
export const directiveDef = AST.directiveDefinitionNode;
export const schemaExt = AST.schemaExtensionNode;
export const objectExt = AST.objectTypeExtensionNode;
export const interfaceExt = AST.interfaceTypeExtensionNode;
export const unionExt = AST.unionTypeExtensionNode;
export const scalarExt = AST.scalarTypeExtensionNode;
export const enumExt = AST.enumTypeExtensionNode;
export const inputObjectExt = AST.inputObjectTypeExtensionNode;
