import { isAstNode } from '../utils'

export function stripLoc(input: any): any {
  if (isAstNode(input)) {
    const res: any = {}

    for (const [key, val] of Object.entries(input)) {
      if (key !== 'loc') {
        res[key] = stripLoc(val)
      }
    }

    return res
  }

  if (Array.isArray(input)) {
    return input.map(stripLoc)
  }

  return input
}

export function normaliseString(input: string) {
  return input.replace(/\s/, '')
}
