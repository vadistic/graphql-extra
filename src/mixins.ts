/* eslint-disable @typescript-eslint/explicit-function-return-type */
import type * as GQL from 'graphql'

// eslint-disable-next-line import/no-cycle
import { Api, Ast } from './internal'
import {
  Fieldname, Argname, Fragmentname, Typename,
} from './types'
import {
  Crud, Setter, Mutable, OptionalSetter,
} from './utils'

// ────────────────────────────────────────────────────────────────────────────────


/**
 * @category API Mixins
 */
export type NameMixinNode =
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
* @category API Mixins
*/
export const nameMixin = <Name extends string>(node: NameMixinNode) =>
  new Setter({
    parent: node,
    key: 'name',
    factory: Ast.nameNode,
    api: (name: GQL.NameNode): Name => name.value as Name,
  })


export type NameOptionalMixinNode = GQL.OperationDefinitionNode

/**
* @category API Mixins
*/
// TODO: make it
export const nameOptionalMixin = <Node extends NameOptionalMixinNode>(node: Node) =>
  new OptionalSetter({
    parent: node,
    key: 'name',
    factory: Ast.nameNode,
    api: (name: GQL.NameNode) => name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type DescriptionApiMixinNode =
| GQL.DirectiveDefinitionNode
| GQL.EnumValueDefinitionNode
| GQL.FieldDefinitionNode
| GQL.InputValueDefinitionNode
| GQL.SchemaDefinitionNode
| GQL.TypeDefinitionNode


export const descriptionMixin = (node: DescriptionApiMixinNode) =>
  new OptionalSetter({
    parent: node,
    key: 'description',
    api: (n: GQL.StringValueNode) => n.value,
    factory: Ast.stringValueNode,
  })

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type VariableDefinitionsMixinNode =
  | GQL.OperationDefinitionNode


/**
 * @category API Mixins
 */
export const variableDefinitionsMixin = <Node extends VariableDefinitionsMixinNode>(node: Node) =>
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
 * @category API Mixins
 */
export type FieldDefinitionsMixinNode =
  | GQL.InterfaceTypeDefinitionNode
  | GQL.InterfaceTypeExtensionNode
  | GQL.ObjectTypeDefinitionNode
  | GQL.ObjectTypeExtensionNode


/**
 * @category API Mixins
 */
export const fieldDefinitionsMixin = <Node extends FieldDefinitionsMixinNode>(parent: Node) =>
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
 * @category API Mixins
 */
export type EnumValuesDefinitionsMixin =
  | GQL.EnumTypeDefinitionNode
  | GQL.EnumTypeExtensionNode


/**
 * @category API Mixins
 */
export const enumValuesDefinitionsMixin = <Node extends EnumValuesDefinitionsMixin>(node: Node) =>
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
 * @category API Mixins
 */
export type UnionTypesMixinNode =
| GQL.UnionTypeDefinitionNode
| GQL.UnionTypeExtensionNode

/**
 * @category API Mixins
 */
export const unionTypesMixin = <Node extends UnionTypesMixinNode>(node: Node) =>
  new Crud({
    parent: node,
    key: 'types',
    arr: node.types,
    api: Api.namedTypeApi,
    factory: Ast.namedTypeNode,
    matcher: (n): Typename => n.name.value,
  })

/**
 * @category API Mixins
 */
export type InterfacesMixinNode =
| GQL.ObjectTypeDefinitionNode
| GQL.ObjectTypeExtensionNode
| GQL.InterfaceTypeDefinitionNode
| GQL.InterfaceTypeExtensionNode


/**
 * @category API Mixins
 */
export const interfacesMixin = <Node extends InterfacesMixinNode>(node: Node) =>
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
 * @category API Mixins
 */
export type ArgumentsApiMixinNode =
  | GQL.DirectiveNode
  | GQL.FieldNode

/**
 * @category API Mixins
 */
export const argumentsMixin = (parent: ArgumentsApiMixinNode) =>
  new Crud({
    parent,
    key: 'arguments',
    arr: parent.arguments,
    api: Api.argumentApi,
    factory: Ast.argumentNode,
    matcher: (node): Argname => node.name.value,
  })


// ────────────────────────────────────────────────────────────────────────────────

export type ValueMixinNode =
  | GQL.ArgumentNode

export const valueMixin = (node: ValueMixinNode) =>
  new Setter({
    parent: node,
    key: 'value',
    factory: (val: GQL.ValueNode) => val,
    api: Api.valueApi,
  })


// ────────────────────────────────────────────────────────────────────────────────

export type NameValueMixinNode = GQL.NameNode

export const nameValueMixin = (node: NameValueMixinNode) =>
  new Setter({
    parent: node,
    key: 'value',
    factory: (val: string) => val,
    api: (val) => val,
  })


// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type DirectivesMixinNode =
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

export const directivesMixin = (node: DirectivesMixinNode) =>
  new Crud({
    parent: node,
    key: 'directives',
    arr: node.directives,
    api: Api.directiveApi,
    factory: Ast.directiveNode,
    matcher: (n): Fieldname => n.name.value,
  })

// ────────────────────────────────────────────────────────────────────────────────

export type TypeMixinNode =
  | GQL.FieldDefinitionNode
  | GQL.InputValueDefinitionNode

export const typeMixin = (node: TypeMixinNode) =>
  new Setter({
    parent: node,
    key: 'type',
    // TODO: this should be string!!!
    api: Api.typeApi,
    factory: Ast.typeNode,
  })

export type TypeConditionMixinNode =
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode


export const typeConditionMixin = (node: TypeConditionMixinNode) =>
  new Setter({
    parent: node,
    key: 'typeCondition',
    api: (val) => val.name.value,
    factory: Ast.namedTypeNode,
  })

export type NamedTypeMixinNode =
  | GQL.OperationTypeDefinitionNode


export const namedTypeMixin = (node: NamedTypeMixinNode) =>
  new Setter({
    parent: node,
    key: 'type',
    api: (val) => val.name.value,
    factory: Ast.namedTypeNode,
  })


// ────────────────────────────────────────────────────────────────────────────────


/**
 * @category API Mixins
 */
export type InputValuesAsArgumentsApiMixinNode =
  | GQL.FieldDefinitionNode
  | GQL.DirectiveDefinitionNode

export const inputValuesAsArgumentsMixin = (node: InputValuesAsArgumentsApiMixinNode) =>
  new Crud({
    parent: node,
    key: 'arguments',
    arr: node.arguments,
    api: Api.inputValueDefinitionApi,
    factory: Ast.inputValueDefinitionNode,
    matcher: (n): Fieldname => n.name.value,
  })


/**
 * @category API Mixins
 */
export type InputValuesAsFieldsMixinNode =
| GQL.InputObjectTypeDefinitionNode
| GQL.InputObjectTypeExtensionNode

export const inputValuesAsFieldsMixin = (node: InputValuesAsFieldsMixinNode) =>
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
 * @category API Mixins
 */
export type SelectionSetMixinNode =
  | GQL.FieldNode
  | GQL.FragmentDefinitionNode
  | GQL.InlineFragmentNode
  | GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export const selectionSetMixin = (node: SelectionSetMixinNode) => {
  // TODO: maybe handle more nicely
  if (!node.selectionSet) {
    // eslint-disable-next-line no-param-reassign
    (node as Mutable<SelectionSetMixinNode>).selectionSet = Ast.selectionSetNode({ selections: [] })
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

/**
 * @category API Mixins
 */
export type SelectionsApiMixinNode =
  | GQL.SelectionSetNode

/**
 * @category API Mixins
 */
export const selectionsMixin = (node: SelectionsApiMixinNode) => new Crud({
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
 * @category API Mixins
 */
export type OperationTypeDefinitionApiMixinNode =
| GQL.SchemaDefinitionNode
| GQL.SchemaExtensionNode

/**
 * @category API Mixins
 */
export const operationsTypeMixin = (node: OperationTypeDefinitionApiMixinNode) =>
  new Crud({
    parent: node,
    key: 'operationTypes',
    arr: node.operationTypes,
    factory: Ast.operationTypeDefinitionNode,
    api: Api.operationTypeDefinitionApi,
    matcher: (el) => el.operation,
  })


/**
 * @category API Mixins
 */
export type OperationMixinNode =
| GQL.OperationTypeDefinitionNode
| GQL.OperationDefinitionNode

/**
 * @category API Mixins
 */
export const operationMixin = (node: OperationMixinNode) =>
  new Setter({
    parent: node,
    key: 'operation',
    factory: (val: GQL.OperationTypeNode) => val,
    api: (val) => val,
  })


// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type RepeatableMixinNode = GQL.DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export const repeatableMixin = (node: GQL.DirectiveDefinitionNode) => new Setter({
  parent: node,
  key: 'repeatable',
  factory: (input: boolean): boolean => input,
  api: (n): boolean => n,
})

// ────────────────────────────────────────────────────────────────────────────────

/**
 * @category API Mixins
 */
export type LocationsMixinNode = GQL.DirectiveDefinitionNode

/**
 * @category API Mixins
 */
export const locationsMixin = (node: LocationsMixinNode) => new Crud({
  parent: node,
  key: 'locations',
  arr: node.locations,
  factory: Ast.nameNode,
  api: (name): GQL.DirectiveLocationEnum => name.value as GQL.DirectiveLocationEnum,
  matcher: (el): GQL.DirectiveLocationEnum => el.value as GQL.DirectiveLocationEnum,
})
