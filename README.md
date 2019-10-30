# graphql-extra

> GraphQL AST/SDL toolkit extending `graphql/graphql-js` with extra features for GraphQL generation & testing

## Why

Inspired by code-first schema generation tools like `graphql-compose` or `graphql-nexus`, but focused on AST/SDL, instead of schema.

Offers lightweight and flexible utils for GraphQL generation & testing. Not a framework. It's `graphql` library extension thats aim to cut boilerplate in GraphQL projects in reliable & uniform manner.

## Features

### creation functions

- neat create functions for all kinds of ast nodes
- mix simplified props & ast nodes on all nesting levels
- aliased export for `graphql-nexus`-like experience

### manipulation APIs

- uniform `graphql-compose`-like crud methods
- stateless & puggable - it's just higher order function on stnadard ASTNode

### document API

- top-level entry point for other api methods, that keeps whole document reference (typeMap)

## Sneak peek

### creation functions

Create any ASTNode with helper function

```ts
import { namedtypeNode } from 'graphql-extra/node'

const named: NamedTypenode = namedTypeNode('Int')
```

`graphql-nexus`-like experience whith aliased function names

```ts
import { t } from 'graphql-extra/node'

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

### manipulation APIs

Add crud methods to (most) ASTNodes

```ts
import { objectTypeApi } from 'graphql-extra/api'

const node: ObjectTypeDefinitionNode = {...}

const obj = objectTypeApi(node)
  .removeField('myField')
  .createField({ name: 'otherField', type: 'Int!' })
  .updateField('otherField', { name: 'renamedField' })

if(node === obj.node) {
  console.log(`it's simply mutating provided astNode object`)
}
```

### document

Top-level entry point/ reference for all typeDefs

```ts
import { documentApi } from 'graphql-extra/api'

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

const ast = documentApi().addSDL(typeDefs).addSDL(moreTypeDefs)

const obj1 = ast.getType('Person')
                .getField('id')
                .setTypename('Int')

const obj2 = ast.createObjectType({...}).addDescription('...')

print(ast.toDocument())

/*
  type Person {
    id: Int!
    name: String!
  }

  ...
*/

```
