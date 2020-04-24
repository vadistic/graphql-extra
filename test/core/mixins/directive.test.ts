import { Kind } from 'graphql'

import { operationDefinitionApi, intValueNode } from '../../../src'
import { getFirstNodeOfKind } from '../../test-utils'

describe('DirectivesApiMixin', () => {
  test('.createDirective()', () => {
    const fixture = /* GraphQL */ `
      query MyOp {
        user
      }
    `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    expect(node.directives?.length).toBe(0)

    api.createDirective({
      name: 'server',
      arguments: [{ name: 'cache', value: intValueNode(3) }],
    })

    expect(node.directives?.length).toBe(1)
    expect(api.getDirectiveNames()).toMatchObject(['server'])

    expect(() => api.createDirective('server')).toThrowErrorMatchingInlineSnapshot(
      '"cannot create \'server\' in directives of OperationDefinition"',
    )
  })

  test('.updateDirective()', () => {
    const fixture = /* GraphQL */ `
      query MyOp @server {
        user
      }
    `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    api.updateDirective('server', {
      name: 'client',
      arguments: [{ name: 'cache', value: intValueNode(3) }],
    })

    expect(node.directives?.length).toBe(1)
    expect(api.getDirectiveNames()).toMatchObject(['client'])
    expect(api.getDirective('client').hasArgument('cache')).toBeTruthy()

    expect(() => api.updateDirective('XYZ', { name: 'ABC' })).toThrowErrorMatchingInlineSnapshot(
      '"cannot update \'XYZ\' in directives of OperationDefinition"',
    )
  })

  test('.upsertDirective()', () => {
    const fixture = /* GraphQL */ `
      query MyOp @server {
        user
      }
    `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    api.upsertDirective({
      name: 'server',
      arguments: [{ name: 'cache', value: intValueNode(3) }],
    })

    expect(node.directives?.length).toBe(1)
    expect(api.getDirectiveNames()).toMatchObject(['server'])
    expect(api.getDirective('server').hasArgument('cache')).toBeTruthy()
  })

  test('.removeDirective()', () => {
    const fixture = /* GraphQL */ `
      query MyOp @server {
        user
      }
    `
    const node = getFirstNodeOfKind(Kind.OPERATION_DEFINITION)(fixture)
    const api = operationDefinitionApi(node)

    api.removeDirective('server')

    expect(node.directives?.length).toBe(0)
    expect(api.hasDirective('server')).toBeFalsy()

    expect(() => api.removeDirective('XYZ')).toThrowErrorMatchingInlineSnapshot(
      '"cannot remove XYZ in directives of OperationDefinition"',
    )
  })
})
