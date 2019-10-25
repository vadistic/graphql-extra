# graphql-ast-editor

## Why

Need something like `graphql-compose`, but

- strictly for AST/SDL editing, not need for schema
- simpler, less verbose API
- better typescript support (esspecially type guards/ casting/ string flavours)
- with assurance of performance with heavy use of ES Maps
- with functional, `graphql-nexus` like ast helpers

## Design

### AST Level

```ts
// AST

// is instantiable
const ast = new AST()

// add SDL as DocumentNode or string
ast.addSDL(/* GraphQL */ `
  type MyType {
    myField: String!
  }
`)

// merge other instance
ast.merge(anotherAst)

// resolves to DocumentNode
const doc: DocumentNode = ast.toDocument()

// resolves to schema
const schema: GraphQLSchema = ast.toSchema()

// root types are stored on specific fields
const query = ast.query
const mutation = ast.mutation
const subscription = ast.subscription

// gets any type
const type = ast.get(typename)

// polymorfic get/ create/ getOrCreate - working with unions
const type = ast.get(typename | config | instance)

const type = ast.create(config | instance)
const type = ast.create(typename, config | instance)

const type = ast.getOrCreate(typename | config | instance)
const type = ast.getOrCreate(typename, config | instance)

// gets definition type (error on not exist)
const type = ast.getObject(typename | config | instance)
const type = ast.getInterface(typename | config | instance)
const type = ast.getInput(typename | config | instance)
const type = ast.getEnum(typename | config | instance)
const type = ast.getScalar(typename | config | instance)
const type = ast.getUnion(typename | config | instance)

// gets or create definition type
const type = ast.getOrCreateObject(typename | config | instance, onCreateConfig)
const type = ast.getOrCreateInterface(typename | config | instance, onCreateConfig)
const type = ast.getOrCreateInput(typename | config | instance, onCreateConfig)
const type = ast.getOrCreateEnum(typename | config | instance, onCreateConfig)
const type = ast.getOrCreateScalar(typename | config | instance, onCreateConfig)
const type = ast.getOrCreateUnion(typename | config | instance, onCreateConfig)

// create definition type (error on exist)
const type = ast.createObject(typename | config | instance)
const type = ast.createInterface(typename | config | instance)
const type = ast.createInput(typename | config | instance)
const type = ast.createEnum(typename | config | instance)
const type = ast.createScalar(typename | config | instance)
const type = ast.createUnion(typename | config | instance)

// overload
const type = ast.createObject(typename, config | instance)
const type = ast.createInterface(typename, config | instance)
const type = ast.createInput(typename, config | instance)
const type = ast.createEnum(typename, config | instance)
const type = ast.createScalar(typename, config | instance)
const type = ast.createUnion(typename, config | instance)

// config is thunkable
const type = ast.createObject(typename, () => config)
const type = ast.getOrCreateObject(typename, () => createConfig)

// lets make it full crud
ast.remove(typename)

// error if not existent
ast.removeObject(typename | config | instance)
ast.removeInterface(typename | config | instance)
ast.removeInput(typename | config | instance)
ast.removeEnum(typename | config | instance)
ast.removeScalar(typename | config | instance)
ast.removeUnion(typename | config | instance)

// upserts type
// - it's delete() is exists + create()
// - error on type missmatch if type existet previously?
ast.set(config)

ast.update(config)

// - definitely error on type missmatch
ast.setObject(config | instance)
ast.setInterface(config | instance)
ast.setInput(config | instance)
ast.setEnum(config | instance)
ast.setScalar(config | instance)
ast.setUnion(config | instance)

// orverload
ast.setObject(typename, config | instance)
ast.setInterface(typename, config | instance)
ast.setInput(typename, config | instance)
ast.setEnum(typename, config | instance)
ast.setScalar(typename, config | instance)
ast.setUnion(typename, config | instance)
```

### Definition Level

```ts
// type can guard itself
const bool = type.isEnum() // !!! make it work as type guard

// type can assert itself (with error on wrong assertion)
const myEnum = type.assertEnum()

// type has reference to ast instance
const ast = type.ast

// type can set self
type.setSelf(config | instance)

// type can remove self
type.removeSelf()

// type can merge other type to self
type.merge(config | instance)
```

### Fields on types

```ts
// fields
const fieldnames = obj.getFieldnames()

// gets fields by typename
// - compares named type
const fields = obj.getFieldsByTypename(typename)

// gets fields by type
// - compares named type and arr/null shape
// - accept editor type / graphql ast type / or string
const fields = obj.getFieldsByType(type)

const fields: StringMap<FieldEditor> = obj.getFields()
const fields: FieldEditor[] = obj.getFieldsArr()

const field = obj.getField(fieldname | fieldConfig | fieldEditor)

obj.createField(config | instance)
obj.updateField(config | instance)
obj.removeField(fieldname | config | instance)

obj.createField(fieldname, config | instance)
obj.updateField(fieldname, config | instance)
```

### Directives on types

```ts
// directives
const directivenames: string[] = obj.getDirectiveNames()

const flag: boolean = obj.hasDirective(directivename | directiveEditor | directiveConfig)

const directives: StringMap<DirectiveEditor> = obj.getDirectives()
const directivesArr: DirectiveEditor[] = obj.getDirectivesArr()

const directive: DirectiveEditor = obj.getDirective(
  directivename | directiveEditor | directiveConfig,
)

obj.createDirective(directiveEditor | directiveConfig)
obj.removeDirective(directivename | directiveEditor | directiveConfig)
```
