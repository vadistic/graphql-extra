export function applyMixins(baseCtors: any[]) {
  return function<C extends any>(derivedCtor: C) {
    baseCtors.forEach(baseCtor => {
      Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name)!,
        )
      })
    })
  }
}

export interface MixinClass {
  validate(): void
}
