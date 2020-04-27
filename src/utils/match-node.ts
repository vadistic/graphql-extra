/**
 * deep equality of subset
 *
 * works like jest.matchObject()
 */
export function matchNode(main: any, subset: any): boolean {
  if (main === subset) {
    return true
  }

  if ((typeof main === 'object' && main != null) && (typeof subset === 'object' && subset != null)) {
    for (const prop of Object.keys(subset)) {
      // skip loc props
      if (prop === 'loc') {
        continue
      }

      // main has this prop they should match
      if (Object.prototype.hasOwnProperty.call(main, prop)) {
        if (!matchNode(main[prop], subset[prop])) {
          return false
        }
      }

      // main is missing subset prop
      else return false
    }

    return true
  }

  // on of sides is primitive
  return false
}
