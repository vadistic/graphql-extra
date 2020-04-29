/* eslint-disable jest/no-commented-out-tests */
import { print } from 'graphql'

import { STARWARS_QUERY } from '../../test/fixture'
import { documentApi, DocumentApi } from './document'

describe('Operation' + DocumentApi.name, () => {
  const doc = documentApi().addSDL(STARWARS_QUERY)

  test('works', () => {
    expect(doc.getOperationNames()).toEqual(['HeroQuery'])

    const op = doc.getOperation('HeroQuery')

    op.createField('myNewField')

    expect(print(doc.node)).toMatchInlineSnapshot(`
      "query HeroQuery {
        hero {
          name
          friends {
            ...FriendsFragment
          }
        }
        myNewField
      }

      fragment FriendsFragment on Character {
        name
      }
      "
    `)
  })
})
