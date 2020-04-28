/* eslint-disable jest/no-disabled-tests */
import { Api, Mixin, Ast } from '../internal'

describe(Api.TypeApi.name, () => {
  const p = Api.TypeApi.prototype

  const node = Ast.typeNode({ named: 'Int', list: true })

  const api = Api.typeApi(node)

  describe('methods', () => {
    test.skip(p.getNamedType.name, () => {
    //
    })

    test.skip(p.getTypename.name, () => {
    //
    })

    test.skip(p.setTypename.name, () => {
    //
    })

    test.skip(p.setType.name, () => {
    //
    })

    test.skip(p.isNonNull.name, () => {
    //
    })

    test.skip(p.isList.name, () => {
    //
    })

    test.skip(p.setNonNull.name, () => {
    //
    })

    test.skip(p.setList.name, () => {
    //
    })
  })


  describe('mixins', () => {
    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('ListType')).toBe(true)
    })
  })
})


describe(Api.NamedTypeApi.name, () => {
  const p = Api.NamedTypeApi.prototype

  const node = Ast.namedTypeNode('MyType')

  const api = Api.namedTypeApi(node)

  describe('methods', () => {
    test.skip(p.getTypename.name, () => {
      //
    })

    test.skip(p.setTypename.name, () => {
      //
    })
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('NamedType')).toBe(true)
    })
  })
})
