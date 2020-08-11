"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const utils_1 = require("./utils");
function nameNode(props) {
    return {
        kind: graphql_1.Kind.NAME,
        value: typeof props === 'string' ? props : props.name,
    };
}
exports.nameNode = nameNode;
function documentNode({ definitions }) {
    return {
        kind: graphql_1.Kind.DOCUMENT,
        definitions: utils_1.applyPropsArr(definitionNode, definitions),
    };
}
exports.documentNode = documentNode;
function operationDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.OPERATION_DEFINITION,
        operation: props.operation,
        name: utils_1.applyPropsNullable(nameNode, props.name),
        variableDefinitions: utils_1.applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: utils_1.applyProps(selectionSetNode, utils_1.applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
exports.operationDefinitionNode = operationDefinitionNode;
function variableDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.VARIABLE_DEFINITION,
        variable: utils_1.applyProps(variableNode, props.variable),
        type: utils_1.applyProps(typeNode, props.type),
        defaultValue: props.defaultValue,
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.variableDefinitionNode = variableDefinitionNode;
function variableNode(props) {
    const leaf = props && typeof props === 'object' ? props.name : props;
    return {
        kind: graphql_1.Kind.VARIABLE,
        name: utils_1.applyNullableImplicit(nameNode, leaf),
    };
}
exports.variableNode = variableNode;
function selectionSetNode(props) {
    return {
        kind: graphql_1.Kind.SELECTION_SET,
        selections: utils_1.applyPropsArr(selectionNode, (props || {}).selections),
    };
}
exports.selectionSetNode = selectionSetNode;
function fieldNode(props) {
    if (typeof props === 'string') {
        return {
            kind: graphql_1.Kind.FIELD,
            name: nameNode(props),
        };
    }
    return {
        kind: graphql_1.Kind.FIELD,
        name: utils_1.applyProps(nameNode, props.name),
        alias: utils_1.applyPropsNullable(nameNode, props.alias),
        arguments: utils_1.applyPropsNullableArr(argumentNode, props.arguments),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: utils_1.applyPropsNullable((selections) => selectionSetNode({ selections }), props.selections),
    };
}
exports.fieldNode = fieldNode;
function argumentNode(props) {
    return {
        kind: graphql_1.Kind.ARGUMENT,
        name: utils_1.applyProps(nameNode, props.name),
        value: props.value,
    };
}
exports.argumentNode = argumentNode;
function fragmentSpreadNode(props) {
    if (typeof props === 'string') {
        return {
            kind: graphql_1.Kind.FRAGMENT_SPREAD,
            name: utils_1.applyProps(nameNode, props),
            directives: [],
        };
    }
    return {
        kind: graphql_1.Kind.FRAGMENT_SPREAD,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.fragmentSpreadNode = fragmentSpreadNode;
function inlineFragmentNode(props) {
    return {
        kind: graphql_1.Kind.INLINE_FRAGMENT,
        typeCondition: utils_1.applyPropsNullable(namedTypeNode, props.typeCondition),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: utils_1.applyProps(selectionSetNode, utils_1.applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
exports.inlineFragmentNode = inlineFragmentNode;
function fragmentDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.FRAGMENT_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        variableDefinitions: utils_1.applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
        typeCondition: utils_1.applyProps(namedTypeNode, props.typeCondition),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: utils_1.applyProps(selectionSetNode, utils_1.applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
exports.fragmentDefinitionNode = fragmentDefinitionNode;
function intValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => '' + parseInt('' + value, 10);
    return {
        kind: graphql_1.Kind.INT,
        value: utils_1.applyNullableImplicit(parse, leaf),
    };
}
exports.intValueNode = intValueNode;
function floatValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => '' + parseFloat('' + value);
    return {
        kind: graphql_1.Kind.FLOAT,
        value: utils_1.applyNullableImplicit(parse, leaf),
    };
}
exports.floatValueNode = floatValueNode;
function stringValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    return {
        kind: graphql_1.Kind.STRING,
        value: leaf,
    };
}
exports.stringValueNode = stringValueNode;
function booleanValueNode(props) {
    const toBool = {
        true: true,
        false: false,
    };
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => { var _a; return (_a = toBool['' + value]) !== null && _a !== void 0 ? _a : !!value; };
    return {
        kind: graphql_1.Kind.BOOLEAN,
        value: utils_1.applyNullableImplicit(parse, leaf),
    };
}
exports.booleanValueNode = booleanValueNode;
function nullValueNode(props) {
    return {
        kind: graphql_1.Kind.NULL,
    };
}
exports.nullValueNode = nullValueNode;
function enumValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    return {
        kind: graphql_1.Kind.ENUM,
        value: leaf,
    };
}
exports.enumValueNode = enumValueNode;
function listValueNode(props) {
    return {
        kind: graphql_1.Kind.LIST,
        values: (props || {}).values,
    };
}
exports.listValueNode = listValueNode;
function objectValueNode(props) {
    return {
        kind: graphql_1.Kind.OBJECT,
        fields: (props || {}).fields,
    };
}
exports.objectValueNode = objectValueNode;
function objectFieldNode(props) {
    return {
        kind: graphql_1.Kind.OBJECT_FIELD,
        name: utils_1.applyProps(nameNode, props.name),
        value: props.value,
    };
}
exports.objectFieldNode = objectFieldNode;
function directiveNode(directive) {
    if (typeof directive === 'string') {
        return {
            kind: graphql_1.Kind.DIRECTIVE,
            name: nameNode(directive),
        };
    }
    return {
        kind: graphql_1.Kind.DIRECTIVE,
        name: utils_1.applyProps(nameNode, directive.name),
        arguments: utils_1.applyPropsNullableArr(argumentNode, directive.arguments),
    };
}
exports.directiveNode = directiveNode;
function namedTypeNode(props) {
    var _a;
    const leaf = props && typeof props === 'object' ? (_a = props.value) !== null && _a !== void 0 ? _a : props.name : props;
    return {
        kind: graphql_1.Kind.NAMED_TYPE,
        name: utils_1.applyProps(nameNode, leaf),
    };
}
exports.namedTypeNode = namedTypeNode;
function listTypeNode(props) {
    const type = utils_1.applyProps(typeNode, props);
    return {
        kind: graphql_1.Kind.LIST_TYPE,
        type,
    };
}
exports.listTypeNode = listTypeNode;
function nonNullTypeNode(props) {
    const type = utils_1.applyProps(typeNode, props);
    if (type && type.kind === graphql_1.Kind.NON_NULL_TYPE) {
        return type;
    }
    return {
        kind: graphql_1.Kind.NON_NULL_TYPE,
        type,
    };
}
exports.nonNullTypeNode = nonNullTypeNode;
function typeNode(type) {
    if (typeof type === 'string') {
        return graphql_1.parseType(type);
    }
    const namedType = utils_1.applyProps(namedTypeNode, type.named);
    if (!type.list && !type.nonNull) {
        return namedType;
    }
    if (type.list && !type.nonNull) {
        return listTypeNode(namedType);
    }
    if (!type.list && type.nonNull) {
        return nonNullTypeNode(namedType);
    }
    return nonNullTypeNode(listTypeNode(nonNullTypeNode(namedType)));
}
exports.typeNode = typeNode;
function schemaDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.SCHEMA_DEFINITION,
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        operationTypes: utils_1.applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
    };
}
exports.schemaDefinitionNode = schemaDefinitionNode;
function operationTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.OPERATION_TYPE_DEFINITION,
        operation: props.operation,
        type: utils_1.applyProps(namedTypeNode, props.type),
    };
}
exports.operationTypeDefinitionNode = operationTypeDefinitionNode;
function scalarTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.SCALAR_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.scalarTypeDefinitionNode = scalarTypeDefinitionNode;
function objectTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.OBJECT_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        interfaces: utils_1.applyPropsNullableArr(namedTypeNode, props.interfaces),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
exports.objectTypeDefinitionNode = objectTypeDefinitionNode;
function fieldDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.FIELD_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        arguments: utils_1.applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
        type: utils_1.applyProps(typeNode, props.type),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.fieldDefinitionNode = fieldDefinitionNode;
function inputValueDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.INPUT_VALUE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        type: utils_1.applyProps(typeNode, props.type),
        defaultValue: props.defaultValue,
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.inputValueDefinitionNode = inputValueDefinitionNode;
function interfaceTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.INTERFACE_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
exports.interfaceTypeDefinitionNode = interfaceTypeDefinitionNode;
function unionTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.UNION_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        types: utils_1.applyPropsNullableArr(namedTypeNode, props.types),
    };
}
exports.unionTypeDefinitionNode = unionTypeDefinitionNode;
function enumTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.ENUM_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        values: utils_1.applyPropsNullableArr(enumValueDefinitionNode, props.values),
    };
}
exports.enumTypeDefinitionNode = enumTypeDefinitionNode;
function enumValueDefinitionNode(props) {
    if (typeof props === 'string') {
        return {
            kind: graphql_1.Kind.ENUM_VALUE_DEFINITION,
            name: nameNode(props),
        };
    }
    return {
        kind: graphql_1.Kind.ENUM_VALUE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.enumValueDefinitionNode = enumValueDefinitionNode;
function inputObjectTypeDefinitionNode(props) {
    return {
        kind: graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(inputValueDefinitionNode, props.fields),
    };
}
exports.inputObjectTypeDefinitionNode = inputObjectTypeDefinitionNode;
function directiveDefinitionNode(props) {
    var _a;
    return {
        kind: graphql_1.Kind.DIRECTIVE_DEFINITION,
        name: utils_1.applyProps(nameNode, props.name),
        description: utils_1.applyPropsNullable(stringValueNode, props.description),
        arguments: utils_1.applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
        repeatable: (_a = props.repeatable) !== null && _a !== void 0 ? _a : false,
        locations: utils_1.applyPropsArr(nameNode, props.locations),
    };
}
exports.directiveDefinitionNode = directiveDefinitionNode;
function schemaExtensionNode(props) {
    return {
        kind: graphql_1.Kind.SCHEMA_EXTENSION,
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        operationTypes: utils_1.applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
    };
}
exports.schemaExtensionNode = schemaExtensionNode;
function scalarTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.SCALAR_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
    };
}
exports.scalarTypeExtensionNode = scalarTypeExtensionNode;
function objectTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.OBJECT_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        interfaces: utils_1.applyPropsNullableArr(namedTypeNode, props.interfaces),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
exports.objectTypeExtensionNode = objectTypeExtensionNode;
function interfaceTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.INTERFACE_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
exports.interfaceTypeExtensionNode = interfaceTypeExtensionNode;
function unionTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.UNION_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        types: utils_1.applyPropsNullableArr(namedTypeNode, props.types),
    };
}
exports.unionTypeExtensionNode = unionTypeExtensionNode;
function enumTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.ENUM_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        values: utils_1.applyPropsNullableArr(enumValueDefinitionNode, props.values),
    };
}
exports.enumTypeExtensionNode = enumTypeExtensionNode;
function inputObjectTypeExtensionNode(props) {
    return {
        kind: graphql_1.Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name: utils_1.applyProps(nameNode, props.name),
        directives: utils_1.applyPropsNullableArr(directiveNode, props.directives),
        fields: utils_1.applyPropsNullableArr(inputValueDefinitionNode, props.fields),
    };
}
exports.inputObjectTypeExtensionNode = inputObjectTypeExtensionNode;
exports.kindToTypeDefinitionNode = {
    ObjectTypeDefinition: objectTypeDefinitionNode,
    InterfaceTypeDefinition: interfaceTypeDefinitionNode,
    ScalarTypeDefinition: scalarTypeDefinitionNode,
    UnionTypeDefinition: unionTypeDefinitionNode,
    EnumTypeDefinition: enumTypeDefinitionNode,
    InputObjectTypeDefinition: inputObjectTypeDefinitionNode,
};
function typeDefinitionNode({ kind, ...props }) {
    return exports.kindToTypeDefinitionNode[kind](props);
}
exports.typeDefinitionNode = typeDefinitionNode;
exports.kindToTypeExtensionNode = {
    ObjectTypeExtension: objectTypeExtensionNode,
    InterfaceTypeExtension: interfaceTypeExtensionNode,
    ScalarTypeExtension: scalarTypeExtensionNode,
    UnionTypeExtension: unionTypeExtensionNode,
    EnumTypeExtension: enumTypeExtensionNode,
    InputObjectTypeExtension: inputObjectTypeExtensionNode,
};
function typeExtensionNode({ kind, ...props }) {
    return exports.kindToTypeExtensionNode[kind](props);
}
exports.typeExtensionNode = typeExtensionNode;
exports.kindToTypeSystemDefinitionNode = {
    ...exports.kindToTypeDefinitionNode,
    SchemaDefinition: schemaDefinitionNode,
    DirectiveDefinition: directiveDefinitionNode,
};
function typeSystemDefinitionNode({ kind, ...props }) {
    return exports.kindToTypeSystemDefinitionNode[kind](props);
}
exports.typeSystemDefinitionNode = typeSystemDefinitionNode;
exports.kindToTypeSystemExtensionNode = {
    ...exports.kindToTypeExtensionNode,
    SchemaExtension: schemaExtensionNode,
};
function typeSystemExtensionNode({ kind, ...props }) {
    return exports.kindToTypeSystemExtensionNode[kind](props);
}
exports.typeSystemExtensionNode = typeSystemExtensionNode;
exports.kindToTypeExecutableDefinitionNode = {
    OperationDefinition: operationDefinitionNode,
    FragmentDefinition: fragmentDefinitionNode,
};
function executableDefinitionNode({ kind, ...props }) {
    return exports.kindToTypeExecutableDefinitionNode[kind](props);
}
exports.executableDefinitionNode = executableDefinitionNode;
exports.kindToDefinitionNode = {
    ...exports.kindToTypeSystemDefinitionNode,
    ...exports.kindToTypeSystemExtensionNode,
    ...exports.kindToTypeExecutableDefinitionNode,
};
function definitionNode({ kind, ...props }) {
    return exports.kindToDefinitionNode[kind](props);
}
exports.definitionNode = definitionNode;
exports.kindToSelectionNode = {
    Field: fieldNode,
    FragmentSpread: fragmentSpreadNode,
    InlineFragment: inlineFragmentNode,
};
function selectionNode(props) {
    if (typeof props === 'string') {
        return fieldNode(props);
    }
    const { kind = 'Field', ...rest } = props;
    return exports.kindToSelectionNode[kind](rest);
}
exports.selectionNode = selectionNode;
exports.kindToValueNode = {
    IntValue: intValueNode,
    BooleanValue: booleanValueNode,
    Variable: variableNode,
    FloatValue: floatValueNode,
    StringValue: stringValueNode,
    NullValue: nullValueNode,
    EnumValue: enumValueNode,
    ListValue: listValueNode,
    ObjectValue: objectValueNode,
};
function valueNode(props) {
    const { kind, ...rest } = props;
    return exports.kindToValueNode[kind](rest);
}
exports.valueNode = valueNode;
