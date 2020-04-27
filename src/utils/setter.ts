import { ASTNode } from 'graphql'

import {
  applyPropsCloned, applyNullable, applyProps, applyPropsNullable,
} from './apply-props'
import { matchObject } from './match-object'

export interface SetterConfig<
  Parent extends ASTNode,
  Key extends keyof Parent,
  Value extends Parent[Key],
  Api,
  Props
  > {
  parent: Parent
  key: Key
  factory: (props: Props) => Value
  api: (node: Value) => Api
}

export class Setter<
  Parent extends ASTNode,
  Key extends keyof Parent,
  Value extends Parent[Key],
  Api,
  Props> {
  constructor(protected config: SetterConfig<Parent, Key, Value, Api, Props>) {
  }

  get node(): Value {
    return this.config.parent[this.config.key] as Value
  }

  set node(value: Value) {
    this.config.parent[this.config.key] = value
  }

  get(): Api {
    return this.config.api(this.node)
  }

  set(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)

    this.node = next

    return this
  }

  is(props: Props | Value): boolean {
    const next = applyProps(this.config.factory, props)

    return matchObject(this.node, next)
  }
}


export class OptionalSetter<
  Parent extends ASTNode,
  Key extends keyof Parent,
  Value extends Parent[Key],
  Api,
  Props> {
  constructor(protected config: SetterConfig<Parent, Key, Value, Api, Props>) {
  }

  get node(): Value | undefined {
    return this.config.parent[this.config.key] as Value | undefined
  }

  set node(value: Value | undefined) {
    this.config.parent[this.config.key] = value as any
  }

  get(): Api | undefined {
    return applyNullable(this.config.api, this.node)
  }

  set(props: Props | Value): this {
    const next = applyPropsCloned(this.config.factory, props)

    this.node = next

    return this
  }

  unset(): this {
    this.node = undefined

    return this
  }

  is(props?: Props | Value): boolean {
    if (!props) {
      return !!this.node
    }

    const next = applyPropsNullable(this.config.factory, props)

    return matchObject(this.node, next)
  }
}
