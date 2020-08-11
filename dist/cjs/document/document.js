"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
const document_base_1 = require("./document-base");
class DocumentApi extends document_base_1.DocumentBaseApi {
    clone() {
        return new DocumentApi(utils_1.cloneDeep(this.toDocument()));
    }
    hasSchemaDefinition() {
        return this._definitions.test({ kind: 'SchemaDefinition' });
    }
    getSchemaDefinition() {
        return this._definitions.findOne({ kind: 'SchemaDefinition' });
    }
    createSchemaDefinition(props) {
        this._definitions.create({ kind: 'SchemaDefinition', ...props });
        return this;
    }
    updateSchemaDefinition(props) {
        this._definitions.update({ kind: 'SchemaDefinition' }, { kind: 'SchemaDefinition', ...props });
        return this;
    }
    upsertSchemaDefinition(props) {
        this._definitions.upsert({ kind: 'SchemaDefinition', ...props });
        return this;
    }
    removeSchemaDefinition() {
        this._definitions.remove({ kind: 'SchemaDefinition' });
        return this;
    }
    hasSchemaExtension() {
        return this._definitions.test({ kind: 'SchemaExtension' });
    }
    getSchemaExtension() {
        return this._definitions.findOne({ kind: 'SchemaExtension' });
    }
    createSchemaExtension(props) {
        this._definitions.create({ kind: 'SchemaExtension', ...props });
        return this;
    }
    updateSchemaExtension(props) {
        this._definitions.update({ kind: 'SchemaExtension' }, { kind: 'SchemaExtension', ...props });
        return this;
    }
    upsertSchemaExtension(props) {
        this._definitions.upsert({ kind: 'SchemaExtension', ...props });
        return this;
    }
    removeSchemaExtension() {
        this._definitions.remove({ kind: 'SchemaExtension' });
        return this;
    }
    getOperationRoot(operation) {
        var _a, _b;
        const ext = (_a = this.getSchemaExtension()) === null || _a === void 0 ? void 0 : _a.getOperationTypename(operation);
        if (ext)
            return this._objectTypes.findOne(ext);
        const def = (_b = this.getSchemaDefinition()) === null || _b === void 0 ? void 0 : _b.getOperationTypename(operation);
        if (def)
            return this._objectTypes.findOne(def);
        return undefined;
    }
    getQuery() {
        return this.getOperationRoot('query');
    }
    getMutation() {
        return this.getOperationRoot('mutation');
    }
    getSubscription() {
        return this.getOperationRoot('subscription');
    }
    getAllOperations() {
        return this._operationDefinitions.findMany();
    }
    getOperationNames() {
        return this._operationDefinitions.findManyNames();
    }
    getOperation(operationname) {
        return this._operationDefinitions.findOneOrFail(operationname);
    }
    hasOperation(operationname) {
        return this._operationDefinitions.has(operationname);
    }
    createOperation(props) {
        this._operationDefinitions.create(props);
        return this;
    }
    updateOperation(operationname, props) {
        this._operationDefinitions.update(operationname, props);
        return this;
    }
    upsertOperation(props) {
        this._operationDefinitions.upsert(props);
        return this;
    }
    removeOperation(operationname) {
        this._operationDefinitions.remove(operationname);
        return this;
    }
    getAllFragments() {
        return this._fragmentDefinitions.findMany();
    }
    getFragmentNames() {
        return this._fragmentDefinitions.findManyNames();
    }
    getFragment(fragmentname) {
        return this._fragmentDefinitions.findOneOrFail(fragmentname);
    }
    hasFragment(fragmentname) {
        return this._fragmentDefinitions.has(fragmentname);
    }
    createFragment(props) {
        this._fragmentDefinitions.create(props);
        return this;
    }
    updateFragment(fragmentname, props) {
        this._fragmentDefinitions.update(fragmentname, props);
        return this;
    }
    upsertFragment(props) {
        this._fragmentDefinitions.upsert(props);
        return this;
    }
    removeFragment(fragmentname) {
        this._fragmentDefinitions.remove(fragmentname);
        return this;
    }
    getAllTypes() {
        return this._typeDefinitions.findMany();
    }
    getAllScalarTypes() {
        return this._scalarTypes.findMany();
    }
    getAllObjectTypes() {
        return this._objectTypes.findMany();
    }
    getAllInterfaceTypes() {
        return this._interfaceTypes.findMany();
    }
    getAllUnionTypes() {
        return this._unionTypes.findMany();
    }
    getAllEnumTypes() {
        return this._enumTypes.findMany();
    }
    getAllInputTypes() {
        return this._inputTypes.findMany();
    }
    getAllExts() {
        return this._typeExtensions.findMany();
    }
    getAllScalarExts() {
        return this._scalarExts.findMany();
    }
    getAllObjectExts() {
        return this._objectExts.findMany();
    }
    getAllInterfaceExts() {
        return this._interfaceExts.findMany();
    }
    getAllUnionExts() {
        return this._unionExts.findMany();
    }
    getAllEnumExts() {
        return this._enumExts.findMany();
    }
    getAllInputExts() {
        return this._inputExts.findMany();
    }
    hasType(typename) {
        return this._typeDefinitions.has(typename);
    }
    getType(typename) {
        return this._typeDefinitions.findOneOrFail(typename);
    }
    createType(typename) {
        this._typeDefinitions.remove(typename);
        return this;
    }
    updateType(typename, props) {
        this._typeDefinitions.update(typename, props);
        return this;
    }
    upsertType(props) {
        this._typeDefinitions.upsert(props);
        return this;
    }
    removeType(typename) {
        this._typeDefinitions.remove(typename);
        return this;
    }
    hasExt(typename) {
        return this._typeExtensions.has(typename);
    }
    getExt(typename) {
        return this._typeExtensions.findOneOrFail(typename);
    }
    createExt(typename) {
        this._typeExtensions.remove(typename);
        return this;
    }
    updateExt(typename, props) {
        this._typeExtensions.update(typename, props);
        return this;
    }
    upsertExt(props) {
        this._typeExtensions.upsert(props);
        return this;
    }
    removeExt(typename) {
        this._typeExtensions.remove(typename);
        return this;
    }
    hasDirective(directivename) {
        return this._directiveDefinitions.has(directivename);
    }
    getDirective(directivename) {
        return this._directiveDefinitions.findOneOrFail(directivename);
    }
    getDirectives() {
        return this._directiveDefinitions.findMany();
    }
    getDirectiveNames() {
        return this._directiveDefinitions.findManyNames();
    }
    createDirective(props) {
        this._directiveDefinitions.create(props);
        return this;
    }
    updateDirective(directivename, props) {
        this._directiveDefinitions.update(directivename, props);
        return this;
    }
    upsertDirective(props) {
        this._directiveDefinitions.upsert(props);
        return this;
    }
    removeDirective(directivename) {
        this._directiveDefinitions.remove(directivename);
        return this;
    }
    getScalarType(typename) {
        return this._scalarTypes.findOneOrFail(typename);
    }
    getObjectType(typename) {
        return this._objectTypes.findOneOrFail(typename);
    }
    getInterfaceType(typename) {
        return this._interfaceTypes.findOneOrFail(typename);
    }
    getUnionType(typename) {
        return this._unionTypes.findOneOrFail(typename);
    }
    getEnumType(typename) {
        return this._enumTypes.findOneOrFail(typename);
    }
    getInputType(typename) {
        return this._inputTypes.findOneOrFail(typename);
    }
    createScalarType(props) {
        this._scalarTypes.create(props);
        return this;
    }
    createObjectType(props) {
        this._objectTypes.create(props);
        return this;
    }
    createInterfaceType(props) {
        this._interfaceTypes.create(props);
        return this;
    }
    createUnionType(props) {
        this._unionTypes.create(props);
        return this;
    }
    createEnumType(props) {
        this._enumTypes.create(props);
        return this;
    }
    createInputType(props) {
        this._inputTypes.create(props);
        return this;
    }
    updateScalarType(typename, props) {
        this._scalarTypes.update(typename, props);
        return this;
    }
    updateObjectType(typename, props) {
        this._objectTypes.update(typename, props);
        return this;
    }
    updateInterfaceType(typename, props) {
        this._interfaceTypes.update(typename, props);
        return this;
    }
    updateUnionType(typename, props) {
        this._unionTypes.update(typename, props);
        return this;
    }
    updateEnumType(typename, props) {
        this._enumTypes.update(typename, props);
        return this;
    }
    updateInputType(typename, props) {
        this._inputTypes.update(typename, props);
        return this;
    }
    upsertScalarType(props) {
        this._scalarTypes.upsert(props);
        return this;
    }
    upsertObjectType(props) {
        this._objectTypes.upsert(props);
        return this;
    }
    upsertInterfaceType(props) {
        this._interfaceTypes.upsert(props);
        return this;
    }
    upsertUnionType(props) {
        this._unionTypes.upsert(props);
        return this;
    }
    upsertEnumType(props) {
        this._enumTypes.upsert(props);
        return this;
    }
    upsertInputType(props) {
        this._inputTypes.upsert(props);
        return this;
    }
    removeScalarType(typename) {
        this._scalarTypes.remove(typename);
        return this;
    }
    removeObjectType(typename) {
        this._objectTypes.remove(typename);
        return this;
    }
    removeInterfaceType(typename) {
        this._interfaceTypes.remove(typename);
        return this;
    }
    removeUnionType(typename) {
        this._unionTypes.remove(typename);
        return this;
    }
    removeEnumType(typename) {
        this._enumTypes.remove(typename);
        return this;
    }
    removeInputType(typename) {
        this._inputTypes.remove(typename);
        return this;
    }
    getScalarExt(typename) {
        return this._scalarExts.findOneOrFail(typename);
    }
    getObjectExt(typename) {
        return this._objectExts.findOneOrFail(typename);
    }
    getInterfaceExt(typename) {
        return this._interfaceExts.findOneOrFail(typename);
    }
    getUnionExt(typename) {
        return this._unionExts.findOneOrFail(typename);
    }
    getEnumExt(typename) {
        return this._enumExts.findOneOrFail(typename);
    }
    getInputExt(typename) {
        return this._inputExts.findOneOrFail(typename);
    }
    createScalarExt(props) {
        this._scalarExts.create(props);
        return this;
    }
    createObjectExt(props) {
        this._objectExts.create(props);
        return this;
    }
    createInterfaceExt(props) {
        this._interfaceExts.create(props);
        return this;
    }
    createUnionExt(props) {
        this._unionExts.create(props);
        return this;
    }
    createEnumExt(props) {
        this._enumExts.create(props);
        return this;
    }
    createInputExt(props) {
        this._inputExts.create(props);
        return this;
    }
    updateScalarExt(typename, props) {
        this._scalarExts.update(typename, props);
        return this;
    }
    updateObjectExt(typename, props) {
        this._objectExts.update(typename, props);
        return this;
    }
    updateInterfaceExt(typename, props) {
        this._interfaceExts.update(typename, props);
        return this;
    }
    updateUnionExt(typename, props) {
        this._unionExts.update(typename, props);
        return this;
    }
    updateEnumExt(typename, props) {
        this._enumExts.update(typename, props);
        return this;
    }
    updateInputExt(typename, props) {
        this._inputExts.update(typename, props);
        return this;
    }
    upsertScalarExt(props) {
        this._scalarExts.upsert(props);
        return this;
    }
    upsertObjectExt(props) {
        this._objectExts.upsert(props);
        return this;
    }
    upsertInterfaceExt(props) {
        this._interfaceExts.upsert(props);
        return this;
    }
    upsertUnionExt(props) {
        this._unionExts.upsert(props);
        return this;
    }
    upsertEnumExt(props) {
        this._enumExts.upsert(props);
        return this;
    }
    upsertInputExt(props) {
        this._inputExts.upsert(props);
        return this;
    }
    removeScalarExt(typename) {
        this._scalarExts.remove(typename);
        return this;
    }
    removeObjectExt(typename) {
        this._objectExts.remove(typename);
        return this;
    }
    removeInterfaceExt(typename) {
        this._interfaceExts.remove(typename);
        return this;
    }
    removeUnionExt(typename) {
        this._unionExts.remove(typename);
        return this;
    }
    removeEnumExt(typename) {
        this._enumExts.remove(typename);
        return this;
    }
    removeInputExt(typename) {
        this._inputExts.remove(typename);
        return this;
    }
}
exports.DocumentApi = DocumentApi;
function documentApi(node) {
    return new DocumentApi(node);
}
exports.documentApi = documentApi;
