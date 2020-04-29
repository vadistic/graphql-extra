/* eslint-disable no-param-reassign */
import type * as GQL from 'graphql'
import { GraphQLError } from 'graphql'

import {
  applyNullable,
  applyPropsCloned,
  applyPropsClonedPartial,
  isPrimitive,
  applyPropsPartial,
  applyPropsArr,
} from './apply-props'
import { getName } from './get-name'
import { matchNode } from './match-node'
import { concat } from './mutable'


/**
 * @category Internal
 */
export interface CrudConfig <
  Value,
  Api,
  Props,
  Target> {
  /** parent node */
  parent: GQL.ASTNode
  /** parent key with an array */
  key: string
  /** how provided value should be coerced */
  factory: (props: Props) => Value
  /** how returned value should be wrapped */
  api: (el: Value) => Api
  /** compare function - usually pointing to name */
  matcher: (el: Value) => Target
  /** custom getter/ ref callback instead of parent[key] */
  ref?: (next?: any[]) => any[]
  /** additional kind filter */
  kind?: string
}

/**
 * @category Internal
 */
export class Crud <
  Value extends GQL.ASTNode,
  Api,
  Props,
  Target> {
  constructor(protected config: CrudConfig<Value, Api, Props, Target>) {
    if (!config.ref && !config.parent[config.key as keyof typeof config.parent]) {
      (config.parent as any)[config.key] = []
    }
  }

  get arr(): Value[] {
    if (this.config.ref) {
      return this.config.ref()
    }

    return (this.config.parent as any)[this.config.key] as Value[]
  }

  set arr(next: Value[]) {
    if (this.config.ref) {
      this.config.ref(next)
    }
    else {
      (this.config.parent as any)[this.config.key] = next
    }
  }

  protected get arrOfKind(): Value[] {
    if (!this.config.kind) return this.arr

    const exp = new RegExp(this.config.kind)

    return this.arr.filter((node) => exp.test(node.kind))
  }


  // ────────────────────────────────────────────────────────────────────────────────

  has(filter: Target): boolean {
    const pred = this._filter(filter)

    return this.arrOfKind.some(pred)
  }

  test(filter: Partial<Props | Value>): boolean {
    const pred = this._filter(filter)

    return this.arrOfKind.some(pred)
  }

  set(props: (Props | Value)[]): this {
    this.arr = applyPropsArr(this.config.factory, props) as Value[]

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  findOneNode(filter: Target | Partial<Props | Value>): Value | undefined {
    const pred = this._filter(filter)

    return this.arrOfKind.find(pred)
  }

  findOneNodeIndex(filter: Target | Partial<Props | Value>): number {
    const pred = this._filter(filter)

    // ! index need to be searched on arr
    return this.arr.findIndex((node) => (!this.config.kind || this.config.kind === node.kind) && pred(node))
  }

  findOneNodeOrFail(filter: Target | Partial<Props | Value>): Value {
    const pred = this._filter(filter)
    const el = this.arrOfKind.find(pred)

    if (!el) {
      const msg = `cannot find ${this._target(filter)} in ${this._location()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    return el
  }

  // ────────────────────────────────────────────────────────────────────────────────

  findManyNodes(filter?: Target | Partial<Props | Value>): Value[] {
    if (filter === undefined) return this.arrOfKind

    const pred = this._filter(filter)

    return this.arrOfKind.filter(pred)
  }

  findManyNodeIndicies(filter?: Target | Partial<Props | Value>): number[] {
    if (filter === undefined) return this.arr.map((node, i) => i)

    const pred = this._filter(filter)

    return this.arrOfKind.map((node, i) => pred(node) && i).filter((i): i is number => typeof i === 'number')
  }

  // ────────────────────────────────────────────────────────────────────────────────


  findOne(filter: Target | Partial<Props | Value>): Api | undefined {
    const el = this.findOneNode(filter)

    return applyNullable(this.config.api, el)
  }

  findOneName(filter: Target | Partial<Props | Value>): Target | undefined {
    const el = this.findOneNode(filter)

    return applyNullable(this.config.matcher, el)
  }

  findOneOrFail(filter: Target | Partial<Props | Value>): Api {
    const node = this.findOneNodeOrFail(filter)

    return this.config.api(node)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  findMany(filter?: Target | Partial<Props | Value>): Api[] {
    if (filter === undefined) return this.arrOfKind.map(this.config.api)

    return this.findManyNodes(filter).map(this.config.api)
  }

  findManyNames(filter?: Target | Partial<Props | Value>): Target[] {
    const arr = this.findManyNodes(filter)

    return arr.map(this.config.matcher)
  }

  // ────────────────────────────────────────────────────────────────────────────────

  create(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)
    const target = this.config.matcher(next)
    const prev = this.findOneNode(target)

    if (prev) {
      const msg = `cannot create ${this._target(props)} in ${this._location()} because it already exists`
      throw new GraphQLError(msg, [prev, this.config.parent])
    }

    concat(this.arr, next)

    return this
  }

  upsert(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)
    const target = this.config.matcher(next)
    const index = this.findOneNodeIndex(target)

    if (index === -1) {
      concat(this.arr, next)
    }
    else {
      this.arr[index] = next
    }


    return this
  }

  update(filter: Target | Partial<Props | Value>, props: Partial<Props | Value>): this {
    const next = applyPropsClonedPartial(this.config.factory, props)
    const index = this.findOneNodeIndex(filter)

    if (index === -1) {
      const msg = `cannot update ${this._target(filter)} in ${this._location()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    this.arr[index] = { ...this.arr[index], ...next }

    return this
  }

  remove(filter: Target | Partial<Props | Value>): this {
    const index = this.findOneNodeIndex(filter)

    if (index === -1) {
      const msg = `cannot remove ${this._target(filter)} in ${this._location()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    // it works
    this.arr.splice(index, 1)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  protected _target(filter: Target | Partial<Props | Value>): string {
    const base = this.config.kind ? this.config.kind + ' ' : ''

    if (isPrimitive(filter)) {
      return `${base}'${filter}'`
    }

    const maybeName = getName(filter)

    if (maybeName !== 'unknown') {
      return `${base}'${maybeName}'`
    }

    return `${base}'${JSON.stringify(filter)}'`
  }


  protected _location(): string {
    let parentName = ''

    const maybeName = getName(this.config.parent)

    if (maybeName !== 'unknown' && maybeName !== this.config.parent.kind) {
      parentName = ` '${maybeName}'`
    }


    return `${this.config.key} of ${this.config.parent.kind}${parentName}`
  }

  protected _filter(filter: Target | Partial<Props | Value>): (node: Value) => boolean {
    // simple filter
    if (isPrimitive(filter)) {
      return (node: Value): boolean => this.config.matcher(node) === filter
    }

    // object filter
    const subset = applyPropsPartial(this.config.factory, filter)

    return (node: Value): boolean => matchNode(node, subset)
  }
}
