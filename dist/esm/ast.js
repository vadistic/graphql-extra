import { Kind, parseType } from 'graphql';
import { applyPropsNullableArr, applyProps, applyPropsNullable, applyPropsArr, applyNullableImplicit, } from './utils';
export function nameNode(props) {
    return {
        kind: Kind.NAME,
        value: typeof props === 'string' ? props : props.name,
    };
}
export function documentNode({ definitions }) {
    return {
        kind: Kind.DOCUMENT,
        definitions: applyPropsArr(definitionNode, definitions),
    };
}
export function operationDefinitionNode(props) {
    return {
        kind: Kind.OPERATION_DEFINITION,
        operation: props.operation,
        name: applyPropsNullable(nameNode, props.name),
        variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: applyProps(selectionSetNode, applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
export function variableDefinitionNode(props) {
    return {
        kind: Kind.VARIABLE_DEFINITION,
        variable: applyProps(variableNode, props.variable),
        type: applyProps(typeNode, props.type),
        defaultValue: props.defaultValue,
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function variableNode(props) {
    const leaf = props && typeof props === 'object' ? props.name : props;
    return {
        kind: Kind.VARIABLE,
        name: applyNullableImplicit(nameNode, leaf),
    };
}
export function selectionSetNode(props) {
    return {
        kind: Kind.SELECTION_SET,
        selections: applyPropsArr(selectionNode, (props || {}).selections),
    };
}
export function fieldNode(props) {
    if (typeof props === 'string') {
        return {
            kind: Kind.FIELD,
            name: nameNode(props),
        };
    }
    return {
        kind: Kind.FIELD,
        name: applyProps(nameNode, props.name),
        alias: applyPropsNullable(nameNode, props.alias),
        arguments: applyPropsNullableArr(argumentNode, props.arguments),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: applyPropsNullable((selections) => selectionSetNode({ selections }), props.selections),
    };
}
export function argumentNode(props) {
    return {
        kind: Kind.ARGUMENT,
        name: applyProps(nameNode, props.name),
        value: props.value,
    };
}
export function fragmentSpreadNode(props) {
    if (typeof props === 'string') {
        return {
            kind: Kind.FRAGMENT_SPREAD,
            name: applyProps(nameNode, props),
            directives: [],
        };
    }
    return {
        kind: Kind.FRAGMENT_SPREAD,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function inlineFragmentNode(props) {
    return {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition: applyPropsNullable(namedTypeNode, props.typeCondition),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: applyProps(selectionSetNode, applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
export function fragmentDefinitionNode(props) {
    return {
        kind: Kind.FRAGMENT_DEFINITION,
        name: applyProps(nameNode, props.name),
        variableDefinitions: applyPropsNullableArr(variableDefinitionNode, props.variableDefinitions),
        typeCondition: applyProps(namedTypeNode, props.typeCondition),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        selectionSet: applyProps(selectionSetNode, applyNullableImplicit((selections) => ({ selections }), props.selections)),
    };
}
export function intValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => '' + parseInt('' + value, 10);
    return {
        kind: Kind.INT,
        value: applyNullableImplicit(parse, leaf),
    };
}
export function floatValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => '' + parseFloat('' + value);
    return {
        kind: Kind.FLOAT,
        value: applyNullableImplicit(parse, leaf),
    };
}
export function stringValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    return {
        kind: Kind.STRING,
        value: leaf,
    };
}
export function booleanValueNode(props) {
    const toBool = {
        true: true,
        false: false,
    };
    const leaf = props && typeof props === 'object' ? props.value : props;
    const parse = (value) => { var _a; return (_a = toBool['' + value]) !== null && _a !== void 0 ? _a : !!value; };
    return {
        kind: Kind.BOOLEAN,
        value: applyNullableImplicit(parse, leaf),
    };
}
export function nullValueNode(props) {
    return {
        kind: Kind.NULL,
    };
}
export function enumValueNode(props) {
    const leaf = props && typeof props === 'object' ? props.value : props;
    return {
        kind: Kind.ENUM,
        value: leaf,
    };
}
export function listValueNode(props) {
    return {
        kind: Kind.LIST,
        values: (props || {}).values,
    };
}
export function objectValueNode(props) {
    return {
        kind: Kind.OBJECT,
        fields: (props || {}).fields,
    };
}
export function objectFieldNode(props) {
    return {
        kind: Kind.OBJECT_FIELD,
        name: applyProps(nameNode, props.name),
        value: props.value,
    };
}
export function directiveNode(directive) {
    if (typeof directive === 'string') {
        return {
            kind: Kind.DIRECTIVE,
            name: nameNode(directive),
        };
    }
    return {
        kind: Kind.DIRECTIVE,
        name: applyProps(nameNode, directive.name),
        arguments: applyPropsNullableArr(argumentNode, directive.arguments),
    };
}
export function namedTypeNode(props) {
    var _a;
    const leaf = props && typeof props === 'object' ? (_a = props.value) !== null && _a !== void 0 ? _a : props.name : props;
    return {
        kind: Kind.NAMED_TYPE,
        name: applyProps(nameNode, leaf),
    };
}
export function listTypeNode(props) {
    const type = applyProps(typeNode, props);
    return {
        kind: Kind.LIST_TYPE,
        type,
    };
}
export function nonNullTypeNode(props) {
    const type = applyProps(typeNode, props);
    if (type && type.kind === Kind.NON_NULL_TYPE) {
        return type;
    }
    return {
        kind: Kind.NON_NULL_TYPE,
        type,
    };
}
export function typeNode(type) {
    if (typeof type === 'string') {
        return parseType(type);
    }
    const namedType = applyProps(namedTypeNode, type.named);
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
export function schemaDefinitionNode(props) {
    return {
        kind: Kind.SCHEMA_DEFINITION,
        directives: applyPropsNullableArr(directiveNode, props.directives),
        operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
    };
}
export function operationTypeDefinitionNode(props) {
    return {
        kind: Kind.OPERATION_TYPE_DEFINITION,
        operation: props.operation,
        type: applyProps(namedTypeNode, props.type),
    };
}
export function scalarTypeDefinitionNode(props) {
    return {
        kind: Kind.SCALAR_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function objectTypeDefinitionNode(props) {
    return {
        kind: Kind.OBJECT_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
export function fieldDefinitionNode(props) {
    return {
        kind: Kind.FIELD_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
        type: applyProps(typeNode, props.type),
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function inputValueDefinitionNode(props) {
    return {
        kind: Kind.INPUT_VALUE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        type: applyProps(typeNode, props.type),
        defaultValue: props.defaultValue,
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function interfaceTypeDefinitionNode(props) {
    return {
        kind: Kind.INTERFACE_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
export function unionTypeDefinitionNode(props) {
    return {
        kind: Kind.UNION_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        types: applyPropsNullableArr(namedTypeNode, props.types),
    };
}
export function enumTypeDefinitionNode(props) {
    return {
        kind: Kind.ENUM_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
    };
}
export function enumValueDefinitionNode(props) {
    if (typeof props === 'string') {
        return {
            kind: Kind.ENUM_VALUE_DEFINITION,
            name: nameNode(props),
        };
    }
    return {
        kind: Kind.ENUM_VALUE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function inputObjectTypeDefinitionNode(props) {
    return {
        kind: Kind.INPUT_OBJECT_TYPE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
    };
}
export function directiveDefinitionNode(props) {
    var _a;
    return {
        kind: Kind.DIRECTIVE_DEFINITION,
        name: applyProps(nameNode, props.name),
        description: applyPropsNullable(stringValueNode, props.description),
        arguments: applyPropsNullableArr(inputValueDefinitionNode, props.arguments),
        repeatable: (_a = props.repeatable) !== null && _a !== void 0 ? _a : false,
        locations: applyPropsArr(nameNode, props.locations),
    };
}
export function schemaExtensionNode(props) {
    return {
        kind: Kind.SCHEMA_EXTENSION,
        directives: applyPropsNullableArr(directiveNode, props.directives),
        operationTypes: applyPropsArr(operationTypeDefinitionNode, props.operationTypes),
    };
}
export function scalarTypeExtensionNode(props) {
    return {
        kind: Kind.SCALAR_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
    };
}
export function objectTypeExtensionNode(props) {
    return {
        kind: Kind.OBJECT_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        interfaces: applyPropsNullableArr(namedTypeNode, props.interfaces),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
export function interfaceTypeExtensionNode(props) {
    return {
        kind: Kind.INTERFACE_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(fieldDefinitionNode, props.fields),
    };
}
export function unionTypeExtensionNode(props) {
    return {
        kind: Kind.UNION_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        types: applyPropsNullableArr(namedTypeNode, props.types),
    };
}
export function enumTypeExtensionNode(props) {
    return {
        kind: Kind.ENUM_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        values: applyPropsNullableArr(enumValueDefinitionNode, props.values),
    };
}
export function inputObjectTypeExtensionNode(props) {
    return {
        kind: Kind.INPUT_OBJECT_TYPE_EXTENSION,
        name: applyProps(nameNode, props.name),
        directives: applyPropsNullableArr(directiveNode, props.directives),
        fields: applyPropsNullableArr(inputValueDefinitionNode, props.fields),
    };
}
export const kindToTypeDefinitionNode = {
    ObjectTypeDefinition: objectTypeDefinitionNode,
    InterfaceTypeDefinition: interfaceTypeDefinitionNode,
    ScalarTypeDefinition: scalarTypeDefinitionNode,
    UnionTypeDefinition: unionTypeDefinitionNode,
    EnumTypeDefinition: enumTypeDefinitionNode,
    InputObjectTypeDefinition: inputObjectTypeDefinitionNode,
};
export function typeDefinitionNode({ kind, ...props }) {
    return kindToTypeDefinitionNode[kind](props);
}
export const kindToTypeExtensionNode = {
    ObjectTypeExtension: objectTypeExtensionNode,
    InterfaceTypeExtension: interfaceTypeExtensionNode,
    ScalarTypeExtension: scalarTypeExtensionNode,
    UnionTypeExtension: unionTypeExtensionNode,
    EnumTypeExtension: enumTypeExtensionNode,
    InputObjectTypeExtension: inputObjectTypeExtensionNode,
};
export function typeExtensionNode({ kind, ...props }) {
    return kindToTypeExtensionNode[kind](props);
}
export const kindToTypeSystemDefinitionNode = {
    ...kindToTypeDefinitionNode,
    SchemaDefinition: schemaDefinitionNode,
    DirectiveDefinition: directiveDefinitionNode,
};
export function typeSystemDefinitionNode({ kind, ...props }) {
    return kindToTypeSystemDefinitionNode[kind](props);
}
export const kindToTypeSystemExtensionNode = {
    ...kindToTypeExtensionNode,
    SchemaExtension: schemaExtensionNode,
};
export function typeSystemExtensionNode({ kind, ...props }) {
    return kindToTypeSystemExtensionNode[kind](props);
}
export const kindToTypeExecutableDefinitionNode = {
    OperationDefinition: operationDefinitionNode,
    FragmentDefinition: fragmentDefinitionNode,
};
export function executableDefinitionNode({ kind, ...props }) {
    return kindToTypeExecutableDefinitionNode[kind](props);
}
export const kindToDefinitionNode = {
    ...kindToTypeSystemDefinitionNode,
    ...kindToTypeSystemExtensionNode,
    ...kindToTypeExecutableDefinitionNode,
};
export function definitionNode({ kind, ...props }) {
    return kindToDefinitionNode[kind](props);
}
export const kindToSelectionNode = {
    Field: fieldNode,
    FragmentSpread: fragmentSpreadNode,
    InlineFragment: inlineFragmentNode,
};
export function selectionNode(props) {
    if (typeof props === 'string') {
        return fieldNode(props);
    }
    const { kind = 'Field', ...rest } = props;
    return kindToSelectionNode[kind](rest);
}
export const kindToValueNode = {
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
export function valueNode(props) {
    const { kind, ...rest } = props;
    return kindToValueNode[kind](rest);
}
