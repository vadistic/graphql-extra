import { Kind } from 'graphql'

import { Ast, Hooks, Api } from '../internal'
import { Crud } from './crud'

describe('crud', () => {
  const args: Ast.ArgumentNodeProps[] = [
    { name: 'maxAge', value: Ast.intValueNode(1000) },
    { name: 'minAge', value: Ast.intValueNode(100) },
    { name: 'transform', value: Ast.booleanValueNode(true) },
    { name: 'offline', value: Ast.booleanValueNode(true) },
  ]

  const node = Ast.directiveNode({
    name: 'Cache',
    arguments: args,
  })

  const hook = Hooks.argumentsHook(node)

  // ────────────────────────────────────────────────────────────────────────────────

  test(Crud.prototype.has.name, () => {
    expect(hook.has('maxAge')).toBe(true)
    expect(hook.has('minAge')).toBe(true)
  })

  test(Crud.prototype.test.name, () => {
    expect(hook.test({ name: 'maxAge' })).toBe(true)
    expect(hook.test({ value: Ast.intValueNode(100) })).toBe(true)
    expect(hook.test({ name: 'random' })).toBe(false)
  })

  // ────────────────────────────────────────────────────────────────────────────────

  test('findOneNode', () => {
    const targetOk = 'maxAge'
    const targetFail = 'random'

    expect(hook.findOneNode(targetOk)).toMatchObject({ kind: Kind.ARGUMENT })
    expect(hook.findOneNode(targetFail)).toBeUndefined()
  })

  test(Crud.prototype.findOne.name + ' by Target', () => {
    const targetOk = 'maxAge'
    const targetFail = 'random'

    expect(hook.findOne(targetOk)).toBeInstanceOf(Api.ArgumentApi)
    expect(hook.findOne(targetFail)).toBeUndefined()
  })

  test(Crud.prototype.findOne.name + ' by Props', () => {
    const propsOk = { name: 'maxAge', value: Ast.intValueNode(1000) }

    const propsFailBecauseName = { name: 'random', value: Ast.intValueNode(1000) }
    const propsFailBecauseValue = { name: 'maxAge', value: Ast.intValueNode(1001) }

    expect(hook.findOne(propsOk)).toBeInstanceOf(Api.ArgumentApi)
    expect(hook.findOne(propsFailBecauseName)).toBeUndefined()
    expect(hook.findOne(propsFailBecauseValue)).toBeUndefined()
  })

  test(Crud.prototype.findOne.name + ' by partial Props/Element', () => {
    const propsNameOk = { name: 'maxAge' }
    const propsValueOk = { value: Ast.intValueNode(1000) }

    const propsFailBecasueName = { name: 'random' }
    const propsFailBecauseValue = { value: Ast.intValueNode(1) }

    expect(hook.findOne(propsNameOk)).toBeInstanceOf(Api.ArgumentApi)
    expect(hook.findOne(propsValueOk)).toBeInstanceOf(Api.ArgumentApi)

    expect(hook.findOne(propsFailBecasueName)).toBeUndefined()
    expect(hook.findOne(propsFailBecauseValue)).toBeUndefined()
  })

  test(Crud.prototype.findOne.name + ' by Element', () => {
    const nodeOk = Ast.argumentNode(args[0])

    const nodeFailBecauseName = Ast.argumentNode({ ...args[0], name: 'random' })
    const nodeFailBecauseValue = Ast.argumentNode({ ...args[0], value: Ast.intValueNode(1001) })

    expect(hook.findOne(nodeOk)).toBeInstanceOf(Api.ArgumentApi)
    expect(hook.findOne(nodeFailBecauseName)).toBeUndefined()
    expect(hook.findOne(nodeFailBecauseValue)).toBeUndefined()
  })

  test(Crud.prototype.findOneOrFail.name, () => {
    expect(hook.findOneOrFail('maxAge')).toBeInstanceOf(Api.ArgumentApi)
    expect(() => hook.findOneOrFail('random')).toThrowErrorMatchingInlineSnapshot(
      '"cannot find \'random\' in arguments of Directive \\"Cache\\" because it does not exist"',
    )
  })

  // ────────────────────────────────────────────────────────────────────────────────

  test(Crud.prototype.findManyNodeIndicies.name, () => {
    expect(hook.findManyNodeIndicies('maxAge')).toEqual([0])
  })

  test(Crud.prototype.findManyNodes.name, () => {
    const nodes = hook.findManyNodes({ value: Ast.booleanValueNode(true) })

    expect(nodes.every((n) => n.kind === Kind.ARGUMENT)).toBe(true)
    expect(nodes.every((n) => n.kind === Kind.ARGUMENT)).toBe(true)
    expect(nodes.length).toBe(2)
  })

  // ────────────────────────────────────────────────────────────────────────────────

  test('create', () => {
    hook.create({ name: 'sync', value: Ast.variableNode('sync') })
    expect(hook.has('sync')).toBe(true)
  })
})
