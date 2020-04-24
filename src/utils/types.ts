export type GuardType<T> = T extends (o: any) => o is infer U ? U : never

export type ContstructorType<T> = T extends new (...args: any) => infer U ? U : never

export type ArrayElement<T> = T extends ReadonlyArray<infer U> ? U : never
