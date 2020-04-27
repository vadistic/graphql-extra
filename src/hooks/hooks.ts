/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from '../internal'
import {
  Fieldname, Argname, Fragmentname, Typename, Directivename,
} from '../types'
import { Mutable } from '../utils'
import { Crud } from './crud'
import {
  Setter, OptionalSetter, SimpleSetter,
} from './setter'

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type NameHookNode =
| GQL.ArgumentNode
| GQL.DirectiveDefinitionNode
| GQL.DirectiveNode
| GQL.EnumValueDefinitionNode
| GQL.FieldDefinitionNode
| GQL.FieldNode
| GQL.FragmentSpreadNode
| GQL.InputValueDefinitionNode
| GQL.TypeDefinitionNode
| GQL.TypeExtensionNode
| GQL.FragmentDefinitionNode
| GQL.NamedTypeNode

/**
 * @category API Hooks
 */
export const nameHook = <Node extends NameHookNode, Brand extends string>(node: Node) =>
  new Setter({
    parent: node,
    key: 'name',
    factory: Ast.nameNode,
    api: (name: GQL.NameNode): Brand => name.value as Brand,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type NameOptionalHookNode = GQL.OperationDefinitionNode

/**
* @category API Hooks
*/
export const nameOptionalHook = <Node extends NameOptionalHookNode>(node: Node) =>
  new OptionalSetter({
    parent: node,
    key: 'name',
    factory: Ast.nameNode,
    api: (name: GQL.NameNode) => name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type DescriptionHookNode =
| GQL.DirectiveDefinitionNode
| GQL.EnumValueDefinitionNode
| GQL.FieldDefinitionNode
| GQL.InputValueDefinitionNode
| GQL.SchemaDefinitionNode
| GQL.TypeDefinitionNode


/**
 * @category API Hooks
 */
export const descriptionHook = <Node extends DescriptionHookNode>(node: Node) =>
  new OptionalSetter({
    parent: node,
    key: 'description',
    api: (n: GQL.StringValueNode) => n.value,
    factory: Ast.stringValueNode,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type VariableDefinitionsHookNode =
  | GQL.OperationDefinitionNode
  | GQL.FragmentDefinitionNode


/**
 * @category API Hooks
 */
export const variableDefinitionsHook = <Node extends VariableDefinitionsHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'variableDefinitions',
    arr: node.variableDefinitions,
    // TODO: add variable definition api!!!
    api: (n) => n,
    factory: Ast.variableDefinitionNode,
    matcher: (n) => n.variable.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type FieldDefinitionsHookNode =
  | GQL.InterfaceTypeDefinitionNode
  | GQL.InterfaceTypeExtensionNode
  | GQL.ObjectTypeDefinitionNode
  | GQL.ObjectTypeExtensionNode


/**
 * @category API Hooks
 */
export const fieldDefinitionsHook = <Node extends FieldDefinitionsHookNode>(parent: Node) =>
  new Crud({
    parent,
    key: 'fields',
    arr: parent.fields,
    api: Api.fieldDefinitionApi,
    factory: Ast.fieldDefinitionNode,
    matcher: (node): Fieldname => node.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type EnumValuesDefinitionsHook =
  | GQL.EnumTypeDefinitionNode
  | GQL.EnumTypeExtensionNode


/**
 * @category API Hooks
 */
export const enumValuesDefinitionsHook = <Node extends EnumValuesDefinitionsHook>(node: Node) =>
  new Crud({
    parent: node,
    key: 'values',
    arr: node.values,
    api: Api.enumValueDefinitionApi,
    factory: Ast.enumValueDefinitionNode,
    matcher: (n) => n.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type UnionTypesHookNode =
| GQL.UnionTypeDefinitionNode
| GQL.UnionTypeExtensionNode

/**
 * @category API Hooks
 */
export const unionTypesHook = <Node extends UnionTypesHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'types',
    arr: node.types,
    api: Api.namedTypeApi,
    factory: Ast.namedTypeNode,
    matcher: (n): Typename => n.name.value,
  })

/**
 * @category API Hooks
 */
export type InterfacesHookNode =
| GQL.ObjectTypeDefinitionNode
| GQL.ObjectTypeExtensionNode
| GQL.InterfaceTypeDefinitionNode
| GQL.InterfaceTypeExtensionNode


/**
 * @category API Hooks
 */
export const interfacesHook = <Node extends InterfacesHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'interfaces',
    arr: node.interfaces,
    api: Api.namedTypeApi,
    factory: Ast.namedTypeNode,
    matcher: (n): Typename => n.name.value,
  })


// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type ArgumentsHookNode =
  | GQL.DirectiveNode
  | GQL.FieldNode

/**
 * @category API Hooks
 */
export const argumentsHook = <Node extends ArgumentsHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'arguments',
    arr: node.arguments,
    api: Api.argumentApi,
    factory: Ast.argumentNode,
    matcher: (n): Argname => n.name.value,
  })


// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type ValueHookNode =
  | GQL.ArgumentNode

/**
 * @category API Hooks
 */
export const valueHook = <Node extends ValueHookNode>(node: Node) =>
  new Setter({
    parent: node,
    key: 'value',
    factory: (val: GQL.ValueNode) => val,
    api: Api.valueApi,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type DefaultValueHookNode =
  | GQL.InputValueDefinitionNode

/**
 * @category API Hooks
 */
export const defaultValueHook = <Node extends DefaultValueHookNode>(node: Node) =>
  new Setter({
    parent: node,
    key: 'defaultValue',
    factory: (val: GQL.ValueNode) => val,
    api: Api.valueApi,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type NameValueHookNode = GQL.NameNode

/**
 * @category API Hooks
 */
export const nameValueHook = <Node extends NameValueHookNode>(node: Node) =>
  SimpleSetter.fromKey(node, 'value')


// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type DirectivesHookNode =
  | GQL.EnumValueDefinitionNode
  | GQL.FieldDefinitionNode
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.FragmentSpreadNode
  | GQL.InputValueDefinitionNode
  | GQL.OperationDefinitionNode
  | GQL.SchemaDefinitionNode
  | GQL.SchemaExtensionNode
  | GQL.TypeDefinitionNode
  | GQL.TypeExtensionNode
  | GQL.InlineFragmentNode

/**
 * @category API Hooks
 */
export const directivesHook = <Node extends DirectivesHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'directives',
    arr: node.directives,
    api: Api.directiveApi,
    factory: Ast.directiveNode,
    matcher: (n): Directivename => n.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type TypeHookNode =
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode

/**
 * @category API Hooks
 */
export const typeHook = <Node extends TypeHookNode>(node: Node) =>
  new Setter({
    parent: node,
    key: 'type',
    // TODO: this should be string!!!
    api: Api.typeApi,
    factory: Ast.typeNode,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type TypeConditionHookNode =
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode

/**
 * @category API Hooks
 */
export const typeConditionHook = <Node extends TypeConditionHookNode>(node: Node) =>
  new Setter({
    parent: node,
    key: 'typeCondition',
    api: (val) => val.name.value,
    factory: Ast.namedTypeNode,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type NamedTypeHookNode =
  | GQL.OperationTypeDefinitionNode

/**
 * @category API Hooks
 */
export const namedTypeHook = <Node extends NamedTypeHookNode>(node: Node) =>
  new Setter({
    parent: node,
    key: 'type',
    api: (val) => val.name.value,
    factory: Ast.namedTypeNode,
  })


// ────────────────────────────────────────────────────────────────────────────────


/**
 * @category API Hooks
 */
export type InputValuesAsArgumentsHookNode =
  | GQL.FieldDefinitionNode
  | GQL.DirectiveDefinitionNode

/**
 * @category API Hooks
 */
export const inputValuesAsArgumentsHook = <Node extends InputValuesAsArgumentsHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'arguments',
    arr: node.arguments,
    api: Api.inputValueDefinitionApi,
    factory: Ast.inputValueDefinitionNode,
    matcher: (n): Fieldname => n.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type InputValuesAsFieldsHookNode =
| GQL.InputObjectTypeDefinitionNode
| GQL.InputObjectTypeExtensionNode

/**
 * @category API Hooks
 */
export const inputValuesAsFieldsHook = <Node extends InputValuesAsFieldsHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'fields',
    arr: node.fields,
    api: Api.inputValueDefinitionApi,
    factory: Ast.inputValueDefinitionNode,
    matcher: (n): Fieldname => n.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type SelectionSetHookNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode

/**
 * @category API Hooks
 */
export const selectionSetHook = <Node extends SelectionSetHookNode>(node: Node) => {
  // TODO: maybe handle more nicely
  if (!node.selectionSet) {
    // eslint-disable-next-line no-param-reassign
    (node as Mutable<SelectionSetHookNode>).selectionSet = Ast.selectionSetNode({ selections: [] })
  }

  return new Crud({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    parent: node.selectionSet!,
    key: 'selections',
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    arr: node.selectionSet!.selections,
    factory: Ast.selectionNode,
    api: Api.selectionApi,
    matcher: (el): Fieldname | Fragmentname => (el.kind !== 'InlineFragment' ? el.name.value : ''),
  })
}

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type SelectionsHookNode =
  | GQL.SelectionSetNode

/**
 * @category API Hooks
 */
export const selectionsHook = <Node extends SelectionsHookNode>(node: Node) => new Crud({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  parent: node,
  key: 'selections',
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  arr: node.selections,
  factory: Ast.selectionNode,
  api: Api.selectionApi,
  matcher: (el): Fieldname | Fragmentname => (el.kind !== 'InlineFragment' ? el.name.value : ''),
})

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type OperationTypeDefinitionHookNode =
| GQL.SchemaDefinitionNode
| GQL.SchemaExtensionNode

/**
 * @category API Hooks
 */
export const operationsTypeHook = <Node extends OperationTypeDefinitionHookNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'operationTypes',
    arr: node.operationTypes,
    factory: Ast.operationTypeDefinitionNode,
    api: Api.operationTypeDefinitionApi,
    matcher: (el) => el.operation,
  })

/**
 * @category API Hooks
 */
export type OperationHookNode =
| GQL.OperationTypeDefinitionNode
| GQL.OperationDefinitionNode

/**
 * @category API Hooks
 */
export const operationHook = <Node extends OperationHookNode>(node: Node) =>
  SimpleSetter.fromKey(node, 'operation')

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type RepeatableHookNode = GQL.DirectiveDefinitionNode

/**
 * @category API Hooks
 */
export const repeatableHook = <Node extends RepeatableHookNode>(node: Node) =>
  SimpleSetter.fromKey(node, 'repeatable')

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Hooks
 */
export type LocationsHookNode = GQL.DirectiveDefinitionNode

/**
 * @category API Hooks
 */
export const locationsHook = <Node extends LocationsHookNode>(node: Node) => new Crud({
  parent: node,
  key: 'locations',
  arr: node.locations,
  factory: Ast.nameNode,
  api: (name): GQL.DirectiveLocationEnum => name.value as GQL.DirectiveLocationEnum,
  matcher: (el): GQL.DirectiveLocationEnum => el.value as GQL.DirectiveLocationEnum,
})
