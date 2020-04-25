import { Api, Mixin, Ast } from '../internal'

describe(Api.TypeApi.name, () => {
  const p = Api.TypeApi.prototype

  const node = Ast.typeNode({ name: 'Int', list: true })

  const api = Api.typeApi(node)

  describe('methods', () => {
    // eslint-disable-next-line jest/expect-expect
    test(p.getNamedType.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.getTypename.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setTypename.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setType.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.isNonNull.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.isList.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setNonNull.name, () => {
    //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setList.name, () => {
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
    // eslint-disable-next-line jest/expect-expect
    test(p.getTypename.name, () => {
      //
    })

    // eslint-disable-next-line jest/expect-expect
    test(p.setTypename.name, () => {
      //
    })
  })

  describe('mixins', () => {
    test(Mixin.KindAssertionApiMixin.name, () => {
      expect(api.isKind('NamedType')).toBe(true)
    })
  })
})
