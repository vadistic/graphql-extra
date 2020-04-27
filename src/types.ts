export type Typename = string & {_brand?: 'typename'}
export type Fieldname = string & {_brand?: 'fieldname'}
export type Argname = string & {_brand?: 'argname'}
export type Directivename = string & {_brand?: 'directivename'}
export type Fragmentname = string & {_brand?: 'fragmentname'}
export type EnumValueName = string & {_brand?: 'enumValue'}

export type GuardType<T> = T extends (o: any) => o is infer U ? U : never
export type ContstructorType<T> = T extends new (...args: any) => infer U ? U : never
export type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never

export const guardsOr = <G extends any[]>(...guards: G) => (arg: any): arg is GuardType<G[number]> =>
  guards.reduce((acc, guard) => acc || guard(arg), false as boolean)
