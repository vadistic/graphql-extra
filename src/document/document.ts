/* eslint-disable max-len */
import type * as GQL from 'graphql'

import { Api, Ast } from '../internal'
import { Typename, Directivename, Fragmentname } from '../types'
import { cloneDeep } from '../utils'
import { DocumentBaseApi } from './document-base'

/**
 * API for GraphQL `DocumentNode` with schema
 *
 * @category API Public
 */
export class DocumentApi extends DocumentBaseApi {
  clone(): DocumentApi {
    return new DocumentApi(cloneDeep(this.toDocument()))
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // operations api

  getAllOperations(): Api.OperationDefinitionApi[] {
    return this._operationDefinitions.findMany()
  }

  getOperationNames(): (string | undefined)[] {
    return this._operationDefinitions.findManyNames()
  }

  getOperation(operationname?: string): Api.OperationDefinitionApi {
    return this._operationDefinitions.findOneOrFail(operationname)
  }

  hasOperation(operationname?: string): boolean {
    return this._operationDefinitions.has(operationname)
  }

  createOperation(props: Ast.OperationDefinitionNodeProps | GQL.OperationDefinitionNode): this {
    this._operationDefinitions.create(props)

    return this
  }

  updateOperation(operationname: string | undefined, props: Ast.OperationDefinitionNodeProps | GQL.OperationDefinitionNode): this {
    this._operationDefinitions.update(operationname, props)

    return this
  }

  upsertOperation(props: Ast.OperationDefinitionNodeProps | GQL.OperationDefinitionNode): this {
    this._operationDefinitions.upsert(props)

    return this
  }

  removeOperation(operationname: string | undefined): this {
    this._operationDefinitions.remove(operationname)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  //  fragments apis
  getAllFragments(): Api.FragmentDefinitionApi[] {
    return this._fragmentDefinitions.findMany()
  }

  getFragmentNames(): Fragmentname[] {
    return this._fragmentDefinitions.findManyNames()
  }

  getFragment(fragmentname: Fragmentname): Api.FragmentDefinitionApi {
    return this._fragmentDefinitions.findOneOrFail(fragmentname)
  }

  hasFragment(fragmentname: Fragmentname): boolean {
    return this._fragmentDefinitions.has(fragmentname)
  }

  createFragment(props: Ast.FragmentDefinitionNodeProps | GQL.FragmentDefinitionNode): this {
    this._fragmentDefinitions.create(props)

    return this
  }

  updateFragment(fragmentname: Fragmentname, props: Ast.FragmentDefinitionNodeProps | GQL.FragmentDefinitionNode): this {
    this._fragmentDefinitions.update(fragmentname, props)

    return this
  }

  upsertFragment(props: Ast.FragmentDefinitionNodeProps | GQL.FragmentDefinitionNode): this {
    this._fragmentDefinitions.upsert(props)

    return this
  }

  removeFragment(fragmentname: Fragmentname): this {
    this._fragmentDefinitions.remove(fragmentname)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // type get all api

  getAllTypes(): Api.TypeDefinitonApi[] {
    return this._typeDefinitions.findMany()
  }

  getAllScalarTypes(): Api.ScalarTypeApi[] {
    return this._scalarTypes.findMany()
  }

  getAllObjectTypes(): Api.ObjectTypeApi[] {
    return this._objectTypes.findMany()
  }

  getAllInterfaceTypes(): Api.InterfaceTypeApi[] {
    return this._interfaceTypes.findMany()
  }

  getAllUnionTypes(): Api.UnionTypeApi[] {
    return this._unionTypes.findMany()
  }

  getAllEnumTypes(): Api.EnumTypeApi[] {
    return this._enumTypes.findMany()
  }

  getAllInputTypes(): Api.InputTypeApi[] {
    return this._inputTypes.findMany()
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // ext get all api

  getAllExts(): Api.TypeExtensionApi[] {
    return this._typeExtensions.findMany()
  }

  getAllScalarExts(): Api.ScalarExtApi[] {
    return this._scalarExts.findMany()
  }

  getAllObjectExts(): Api.ObjectExtApi[] {
    return this._objectExts.findMany()
  }

  getAllInterfaceExts(): Api.InterfaceExtApi[] {
    return this._interfaceExts.findMany()
  }

  getAllUnionExts(): Api.UnionExtApi[] {
    return this._unionExts.findMany()
  }

  getAllEnumExts(): Api.EnumExtApi[] {
    return this._enumExts.findMany()
  }

  getAllInputExts(): Api.InputExtApi[] {
    return this._inputExts.findMany()
  }

  // // ────────────────────────────────────────────────────────────────────────────────
  // // basic type api

  hasType(typename: Typename): boolean {
    return this._typeDefinitions.has(typename)
  }

  getType(typename: Typename): Api.TypeDefinitonApi {
    return this._typeDefinitions.findOneOrFail(typename)
  }

  createType(typename: Typename): this {
    this._typeDefinitions.remove(typename)

    return this
  }

  updateType(typename: Typename, props: Ast.TypeDefinitionNodeProps): this {
    this._typeDefinitions.update(typename, props)

    return this
  }

  upsertType(props: Ast.TypeDefinitionNodeProps): this {
    this._typeDefinitions.upsert(props)

    return this
  }

  removeType(typename: Typename): this {
    this._typeDefinitions.remove(typename)

    return this
  }

  // // ─────────────────────────────────────────────────────────────────
  // // basic ext api

  hasExt(typename: Typename): boolean {
    return this._typeExtensions.has(typename)
  }

  getExt(typename: Typename): Api.TypeExtensionApi {
    return this._typeExtensions.findOneOrFail(typename)
  }

  createExt(typename: Typename): this {
    this._typeExtensions.remove(typename)

    return this
  }

  updateExt(typename: Typename, props: Ast.TypeExtensionNodeProps): this {
    this._typeExtensions.update(typename, props)

    return this
  }

  upsertExt(props: Ast.TypeExtensionNodeProps): this {
    this._typeExtensions.upsert(props)

    return this
  }

  removeExt(typename: Typename): this {
    this._typeExtensions.remove(typename)

    return this
  }

  // // ─────────────────────────────────────────────────────────────────
  // // directive api

  hasDirective(directivename: Directivename): boolean {
    return this._directiveDefinitions.has(directivename)
  }

  getDirective(directivename: Directivename): Api.DirectiveDefinitionApi {
    return this._directiveDefinitions.findOneOrFail(directivename)
  }

  getDirectives(): Api.DirectiveDefinitionApi[] {
    return this._directiveDefinitions.findMany()
  }

  getDirectiveNames(): Directivename[] {
    return this._directiveDefinitions.findManyNames()
  }

  createDirective(
    props: GQL.DirectiveDefinitionNode | Ast.DirectiveDefinitionNodeProps,
  ): this {
    this._directiveDefinitions.create(props)

    return this
  }

  updateDirective(
    directivename: Directivename,
    props: GQL.DirectiveDefinitionNode | Ast.DirectiveDefinitionNodeProps,
  ): this {
    this._directiveDefinitions.update(directivename, props)

    return this
  }


  upsertDirective(
    props: GQL.DirectiveDefinitionNode | Ast.DirectiveDefinitionNodeProps,
  ): this {
    this._directiveDefinitions.upsert(props)

    return this
  }


  removeDirective(directivename: Directivename): this {
    this._directiveDefinitions.remove(directivename)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // get type apis

  getScalarType(typename: Typename): Api.ScalarTypeApi {
    return this._scalarTypes.findOneOrFail(typename)
  }

  getObjectType(typename: Typename): Api.ObjectTypeApi {
    return this._objectTypes.findOneOrFail(typename)
  }

  getInterfaceType(typename: Typename): Api.InterfaceTypeApi {
    return this._interfaceTypes.findOneOrFail(typename)
  }

  getUnionType(typename: Typename): Api.UnionTypeApi {
    return this._unionTypes.findOneOrFail(typename)
  }

  getEnumType(typename: Typename): Api.EnumTypeApi {
    return this._enumTypes.findOneOrFail(typename)
  }

  getInputType(typename: Typename): Api.InputTypeApi {
    return this._inputTypes.findOneOrFail(typename)
  }

  // ─────────────────────────────────────────────────────────────────
  // create

  createScalarType(props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarTypes.create(props)

    return this
  }

  createObjectType(props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectTypes.create(props)

    return this
  }

  createInterfaceType(props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceTypes.create(props)

    return this
  }

  createUnionType(props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionTypes.create(props)

    return this
  }

  createEnumType(props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumTypes.create(props)

    return this
  }

  createInputType(props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputTypes.create(props)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // update

  updateScalarType(typename: Typename, props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarTypes.update(typename, props)

    return this
  }

  updateObjectType(typename: Typename, props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectTypes.update(typename, props)

    return this
  }

  updateInterfaceType(typename: Typename, props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceTypes.update(typename, props)

    return this
  }

  updateUnionType(typename: Typename, props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionTypes.update(typename, props)

    return this
  }

  updateEnumType(typename: Typename, props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumTypes.update(typename, props)

    return this
  }

  updateInputType(typename: Typename, props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputTypes.update(typename, props)

    return this
  }


  // ────────────────────────────────────────────────────────────────────────────────
  // upsert type apis

  upsertScalarType(props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarTypes.upsert(props)

    return this
  }

  upsertObjectType(props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectTypes.upsert(props)

    return this
  }

  upsertInterfaceType(props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceTypes.upsert(props)

    return this
  }

  upsertUnionType(props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionTypes.upsert(props)

    return this
  }

  upsertEnumType(props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumTypes.upsert(props)

    return this
  }

  upsertInputType(props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputTypes.upsert(props)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // remove type apis

  removeScalarType(typename: Typename): this {
    this._scalarTypes.remove(typename)

    return this
  }

  removeObjectType(typename: Typename): this {
    this._objectTypes.remove(typename)

    return this
  }

  removeInterfaceType(typename: Typename): this {
    this._interfaceTypes.remove(typename)

    return this
  }

  removeUnionType(typename: Typename): this {
    this._unionTypes.remove(typename)

    return this
  }

  removeEnumType(typename: Typename): this {
    this._enumTypes.remove(typename)

    return this
  }

  removeInputType(typename: Typename): this {
    this._inputTypes.remove(typename)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // get ext apis

  getScalarExt(typename: Typename): Api.ScalarExtApi {
    return this._scalarExts.findOneOrFail(typename)
  }

  getObjectExt(typename: Typename): Api.ObjectExtApi {
    return this._objectExts.findOneOrFail(typename)
  }

  getInterfaceExt(typename: Typename): Api.InterfaceExtApi {
    return this._interfaceExts.findOneOrFail(typename)
  }

  getUnionExt(typename: Typename): Api.UnionExtApi {
    return this._unionExts.findOneOrFail(typename)
  }

  getEnumExt(typename: Typename): Api.EnumExtApi {
    return this._enumExts.findOneOrFail(typename)
  }

  getInputExt(typename: Typename): Api.InputExtApi {
    return this._inputExts.findOneOrFail(typename)
  }

  // ─────────────────────────────────────────────────────────────────
  // create exts apis

  createScalarExt(props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarExts.create(props)

    return this
  }

  createObjectExt(props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectExts.create(props)

    return this
  }

  createInterfaceExt(props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceExts.create(props)

    return this
  }

  createUnionExt(props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionExts.create(props)

    return this
  }

  createEnumExt(props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumExts.create(props)

    return this
  }

  createInputExt(props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputExts.create(props)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // update exts apis

  updateScalarExt(typename: Typename, props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarExts.update(typename, props)

    return this
  }

  updateObjectExt(typename: Typename, props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectExts.update(typename, props)

    return this
  }

  updateInterfaceExt(typename: Typename, props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceExts.update(typename, props)

    return this
  }

  updateUnionExt(typename: Typename, props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionExts.update(typename, props)

    return this
  }

  updateEnumExt(typename: Typename, props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumExts.update(typename, props)

    return this
  }

  updateInputExt(typename: Typename, props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputExts.update(typename, props)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────
  // upsert exts apis

  upsertScalarExt(props: Ast.ScalarTypeDefinitionNodeProps | GQL.ScalarTypeDefinitionNode): this {
    this._scalarExts.upsert(props)

    return this
  }

  upsertObjectExt(props: Ast.ObjectTypeDefinitionNodeProps | GQL.ObjectTypeDefinitionNode): this {
    this._objectExts.upsert(props)

    return this
  }

  upsertInterfaceExt(props: Ast.InterfaceTypeDefinitionNodeProps | GQL.InterfaceTypeDefinitionNode): this {
    this._interfaceExts.upsert(props)

    return this
  }

  upsertUnionExt(props: Ast.UnionTypeDefinitionNodeProps | GQL.UnionTypeDefinitionNode): this {
    this._unionExts.upsert(props)

    return this
  }

  upsertEnumExt(props: Ast.EnumTypeDefinitionNodeProps | GQL.EnumTypeDefinitionNode): this {
    this._enumExts.upsert(props)

    return this
  }

  upsertInputExt(props: Ast.InputObjectTypeDefinitionNodeProps | GQL.InputObjectTypeDefinitionNode): this {
    this._inputExts.upsert(props)

    return this
  }

  // ─────────────────────────────────────────────────────────────────
  // remove exts apis

  removeScalarExt(typename: Typename): this {
    this._scalarExts.remove(typename)

    return this
  }

  removeObjectExt(typename: Typename): this {
    this._objectExts.remove(typename)

    return this
  }

  removeInterfaceExt(typename: Typename): this {
    this._interfaceExts.remove(typename)

    return this
  }

  removeUnionExt(typename: Typename): this {
    this._unionExts.remove(typename)

    return this
  }

  removeEnumExt(typename: Typename): this {
    this._enumExts.remove(typename)

    return this
  }

  removeInputExt(typename: Typename): this {
    this._inputExts.remove(typename)

    return this
  }
}

/**
 * `DocumentSchemaApi` constructor fn
 *
 * @category API Public
 */
export function documentApi(node?: GQL.DocumentNode): DocumentApi {
  return new DocumentApi(node)
}
