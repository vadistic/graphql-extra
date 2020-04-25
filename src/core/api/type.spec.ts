import { TypeApi, NamedTypeApi } from './type'

describe(TypeApi.name, () => {
  const t = TypeApi.prototype

  // eslint-disable-next-line jest/expect-expect
  test(t.getNamedType.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.getTypename.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.setTypename.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.setType.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.isNonNull.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.isList.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.setNonNull.name, () => {
    //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.setList.name, () => {
    //
  })
})


describe(NamedTypeApi.name, () => {
  const t = NamedTypeApi.prototype

  // eslint-disable-next-line jest/expect-expect
  test(t.getTypename.name, () => {
  //
  })

  // eslint-disable-next-line jest/expect-expect
  test(t.setTypename.name, () => {
  //
  })
})
