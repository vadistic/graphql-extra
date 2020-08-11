# graphql-extra

> GraphQL AST/SDL toolkit extending standard `graphql/graphql-js` with extra features for code generation & testing.

Inspired by code-first schema generation tools like [`graphql-compose`](https://github.com/graphql-compose/graphql-compose) or [`graphql-nexus`](https://github.com/graphql-nexus/schema), but focused on AST/SDL, instead of executable schema.

The aim is to provide flexible and very interoperable tooling for GraphQL generation & testing.

## Use cases

- code-first SDL
- testing of graphql code
- writing all kinds `*-to-graphql/graphql-to-*` generators

## Features

- almost no deps
- semantic, verbose aprroach - no magic
- clean fluent apis
- all is a function over some `GraphQL.ASTNote`

### AST factories

- neat create functions for all kinds of ast nodes
- mix simplified props & ast nodes on all nesting levels
- aliased export `t` for `graphql-nexus`-like experience

### SDL APIs

- uniform `graphql-compose`-like crud methods for common operations
- stateless & puggable - it's just higher order function on any `ASTNode`
- also for `DocumentNode` with operation suspport

## Docs

Check [source](https://github.com/vadistic/graphql-extra/tree/master/src) or [docs](https://graphql-extra.netlify.com/globals)

## Installation

```ts
$ yarn add graphql-extra
```

## Sneak peek

### AST

```ts
import { namedtypeNode } from 'graphql-extra'

const named: NamedTypenode = namedTypeNode('Int')
```

`graphql-nexus`-like experience with `t` aliased function names

```ts
import { t } from 'graphql-extra'

const node: ObjectTypeDefinitionNode = t.objectType({
  name: 'MyObject',
  description: 'My object',
  interfaces: [
    // accept string
    'MyInterface',
    // or ast node
    t.type.named('Other'),
  ],
  fields: [
    // accept props object
    {
      name: 'myField',
      description: 'my description',
      // nested ast node
      type: t.type.int(),
    },
    // or ast node
    t.fieldDef({
      name: 'myOtherField',
      // entirely nestable
      type: '[ID!]',
    }),
  ],
})
```

### API

Low-level apis for any graphql AST node

```ts
import { objectTypeApi } from 'graphql-extra'

const node: ObjectTypeDefinitionNode = {...}

const obj = objectTypeApi(node)
  .removeField('myField')
  .createField({ name: 'otherField', type: 'Int!' })
  .updateField('otherField', { name: 'renamedField' })

if(node === obj.node) {
  console.log(`it's simply mutating provided astNode object`)
}
```

Which also works for `DocumentNode`

```ts
import { documentSchemaApi } from 'graphql-extra'

const typeDefs = /* GraphQL */ `
  type Person {
    id: ID!
    name: String!
  }
`

const moreTypeDefs = /* GraphQL */ `
  type Post {
    id: ID!
    body: String!
    authot: Person!
  }
`

const ast = documentSchemaApi().addSDL(moreTypeDefs)

const obj1 = ast.getType('Person')
                .getField('id')
                .setTypename('Int')

const obj2 = ast.createObjectType({...}).addDescription('...')

// serialise in any time
const typedefsString = ast.toString()
const documentNode = ast.toDocument()
const introspectionSchema = ast.toSchema()

```
