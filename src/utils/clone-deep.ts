/**
 * standard object clone deep fn
 *
 * @category Helper
 */
export function cloneDeep<T>(target: T): T {
  if (target === null) {
    return target
  }

  if (Array.isArray(target)) {
    return target.map((n) => cloneDeep(n)) as any
  }

  if (typeof target === 'object' && target !== {}) {
    const copy = { ...target } as { [key: string]: any }

    for (const key of Object.keys(copy)) {
      copy[key] = cloneDeep<any>(copy[key])
    }

    return copy as T
  }

  return target
}
