import { Api } from '../internal'

describe(Api.TypeApi.name, () => {
  const p = Api.TypeApi.prototype

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


describe(Api.NamedTypeApi.name, () => {
  const p = Api.NamedTypeApi.prototype

  // eslint-disable-next-line jest/expect-expect
  test(p.getTypename.name, () => {
  //
  })

  // eslint-disable-next-line jest/expect-expect
  test(p.setTypename.name, () => {
  //
  })
})
