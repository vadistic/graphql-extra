import { Kind } from 'graphql'

/**
 * gets name from node or props
 *
 * @category Helper
 */
export function getName(input: any): string {
  if (typeof input === 'string') {
    return input
  }

  if (!input) {
    return 'unknown'
  }

  if ('kind' in input && input.kind === Kind.NAME) {
    return input.value
  }

  if ('name' in input && !!input.name) {
    return typeof input.name === 'string' ? input.name : getName(input.name)
  }

  if ('kind' in input && !!input.kind) {
    return input.kind
  }

  return 'unknown'
}
