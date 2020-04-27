/* eslint-disable no-param-reassign */
import { ASTNode, GraphQLError } from 'graphql'

import {
  applyPropsCloned, applyPropsPartial, applyNullable, applyPropsClonedPartial,
} from './apply-props'
import { getName } from './get-name'
import { matchObject } from './match-object'
import { concat } from './mutable'


export interface CrudConfig <
  Parent extends ASTNode,
  Key extends keyof Parent,
  Value extends ASTNode,
  Api,
  Props,
  Target> {
  parent: Parent
  key: Key
  arr: readonly Value[] | undefined
  factory: (props: Props) => Value
  api: (el: Value) => Api
  matcher: (el: Value) => Target
}

export class Crud <
  Parent extends ASTNode,
  Key extends keyof Parent,
  Value extends ASTNode,
  Api,
  Props,
  Target> {
  constructor(protected config: CrudConfig<Parent, Key, Value, Api, Props, Target>) {
    if (!config.arr) {
      config.parent[config.key] = [] as unknown as Parent[Key]
    }
  }

  get arr(): Value[] {
    return this.config.parent[this.config.key] as unknown as Value[]
  }

  // ────────────────────────────────────────────────────────────────────────────────

  findOneNode(filter: Target | Partial<Props | Value>): Value | undefined {
    const pred = this._buildFilter(filter)

    return this.arr.find(pred)
  }

  findOneNodeIndex(filter: Target | Partial<Props | Value>): number {
    const pred = this._buildFilter(filter)

    return this.arr.findIndex(pred)
  }

  findOneNodeOrFail(filter: Target | Partial<Props | Value>): Value {
    const pred = this._buildFilter(filter)
    const el = this.arr.find(pred)

    if (!el) {
      const msg = `cannot find '${filter}' in ${this._printLocation()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    return el
  }

  // ────────────────────────────────────────────────────────────────────────────────

  findManyNodes(filter: Target | Partial<Props | Value>): Value[] {
    const pred = this._buildFilter(filter)

    return this.arr.filter(pred)
  }

  findManyNodeIndicies(filter: Target | Partial<Props | Value>): number[] {
    const pred = this._buildFilter(filter)

    return this.arr.map((node, i) => pred(node) && i).filter((i): i is number => typeof i === 'number')
  }

  // ────────────────────────────────────────────────────────────────────────────────

  has(filter: Target): boolean {
    const pred = this._buildFilter(filter)

    return this.arr.some(pred)
  }

  test(filter: Partial<Props | Value>): boolean {
    const pred = this._buildFilter(filter)

    return this.arr.some(pred)
  }

  findOne(filter: Target | Partial<Props | Value>): Api | undefined {
    const el = this.findOneNode(filter)

    return applyNullable(this.config.api, el)
  }

  findMany(filter: Target | Partial<Props | Value>): Api[] {
    const pred = this._buildFilter(filter)

    return this.arr.filter(pred).map(this.config.api)
  }


  findOneOrFail(filter: Target | Partial<Props | Value>): Api {
    const node = this.findOneNodeOrFail(filter)

    return this.config.api(node)
  }

  create(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)
    const target = this.config.matcher(next)
    const prev = this.findOneNode(target)

    if (prev) {
      const msg = `cannot create '${target}' in ${this._printLocation()} because it already exists`
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
      (this.arr)[index] = next
    }


    return this
  }

  update(filter: Target | Partial<Props | Value>, props: Partial<Props | Value>): this {
    const next = applyPropsClonedPartial(this.config.factory, props)
    const index = this.findOneNodeIndex(filter)

    if (index === -1) {
      const msg = `cannot update '${props}' in ${this._printLocation()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    (this.arr)[index] = { ...this.arr[index], ...next }

    return this
  }

  remove(filter: Target | Props | Value): this {
    const index = this.findOneNodeIndex(filter)

    if (index === -1) {
      const msg = `cannot remove '${filter}' in ${this._printLocation()} because it does not exist`
      throw new GraphQLError(msg, this.config.parent)
    }

    // it works
    (this.arr).splice(index, 1)

    return this
  }

  // ────────────────────────────────────────────────────────────────────────────────

  protected _printLocation(): string {
    let parentName = getName(this.config.parent)

    if (parentName !== 'unknown' && parentName !== this.config.parent.kind) {
      parentName = '"' + parentName + '"'
    }
    else {
      parentName = ''
    }


    return `${this.config.key} of ${this.config.parent.kind} ${parentName}`
  }

  protected _buildFilter(filter: Target | Partial<Props | Value>): (node: Value) => boolean {
    // simple filter
    if (typeof filter === 'string' || typeof filter === 'boolean' || typeof filter === 'number') {
      return (node: Value): boolean => this.config.matcher(node) === filter
    }

    // object filter
    const subset = applyPropsPartial(this.config.factory, filter)

    return (node: Value): boolean => matchObject(node, subset)
  }
}
