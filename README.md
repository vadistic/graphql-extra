# graphql-extra

> GraphQL AST/SDL toolkit extending `graphql/graphql-js` with extra features for programmatic GraphQL generation

## Why

Inspired by code-first schema generation tools like `graphql-compose` or `graphql-nexus`, but focused on AST/SDL, instead of schema.

I hope this lib offers lightweight and flexible utils for GraphQL generation. It's dead-simple boilerplate extending standard `graphql` implementation, not a framework. The goal is to cut repetitive code from other projects in uniform way.

## Features

### creation

- neat create functions for all ast nodes
- allows mixing simplified props & ast nodes on all nesting levels
- exports aliased function names for `graphql-nexus`-like experience

### manipulation

- uniform `graphql-compose`-like methods
- stateless & puggable - it's just higher order function on ast node

### document

- top-level entry point for other api methods, that also keeps whole document reference (typeMap)

## Sneak peek

### creation

Create any AST Node with helper function

```ts
import { namedtypeNode } from 'graphql-extra/node'

const named: NamedTypenode = namedTypeNode('Int')
```

`graphql-nexus`-like expereince whith aliased function names

```ts
import t from 'graphql-extra/alias'

const node: ObjectTypeDefinitionNode = t.objectType({
  name: 'MyObject',
  description: 'My object',
  interfaces: [
    // string
    'MyInterface',
    // or ast node
    t.type.named('Other'),
  ],
  fields: [
    // props object
    {
      name: 'myField',
      description: 'my description',
      // nested ast node
      type: t.type.int(),
    },
    // ast node
    t.fieldDef({
      name: 'myOtherField',
      // entirely nestable
      type: '[ID!]',
    }),
  ],
})
```

### manipulation

Add crud methods to any node.

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

Top-level entry point/ reference for whole DocumentNode

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

const ast = documentApi(typeDefs).addSDL(moreTypeDefs)

const object = ast.getType('Person')

const anotherObject = ast.createObjectType({...}).addDescription('...')

const doc = ast.toDocument()

```
