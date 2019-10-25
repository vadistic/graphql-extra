//  https://spin.atomicobject.com/2018/01/15/typescript-flexible-nominal-typing/

interface Flavoring<FlavorT> {
  _type?: FlavorT
}

export type Flavor<T, FlavorT> = T & Flavoring<FlavorT>

// FLAVOURS
export type Typename = Flavor<string, 'Typename'>
export type Description = Flavor<string, 'Description'>

export type Fieldname = Flavor<string, 'Fieldname'>
export type Argname = Flavor<string, 'Argname'>

export interface StringMap<T> {
  [index: string]: T
}

export type Thunk<T> = T | (() => T)

export function thunkable<T>(thunk: Thunk<T>): T {
  if (typeof thunk === 'function') {
    return (thunk as Function)()
  }

  return thunk
}

export function thunkableConfig<T>(typename: string, thunk: Thunk<T>): T {
  if (typeof thunk === 'function') {
    return (thunk as Function)()
  }

  return thunk
}
