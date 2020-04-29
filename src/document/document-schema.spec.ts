/* eslint-disable jest/no-commented-out-tests */
import { STARWARS_TYPEDEFS } from '../../test/fixture'
import { documentApi, DocumentApi } from './document'

describe(DocumentApi.name, () => {
  const doc = documentApi().addSDL(STARWARS_TYPEDEFS)

  test('works', () => {
    doc.createEnumExt({ name: 'MyExtension', values: ['ABC'] })

    expect(doc.hasExt('MyExtension')).toBeTruthy()
    doc.getEnumExt('MyExtension').createValue('NEXT')
    expect(doc.getEnumExt('MyExtension').hasValue('NEXT')).toBeTruthy()
  })

  test('roots', () => {
    const query = doc.getQuery()

    expect(query?.hasField('hero')).toBeTruthy()
  })
})
