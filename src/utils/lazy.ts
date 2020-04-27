export const lazy = <R>(cb: () => R): () => R => {
  let store: R | undefined

  return (): R => {
    if (store) return store

    store = cb()

    return store
  }
}
