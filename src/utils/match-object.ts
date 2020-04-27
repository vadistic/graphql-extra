/**
 * deep equality of subset
 *
 * works like jest.matchObject()
 *
 * TODO: rename to matchNode and ignore locations and stuff
 */
export function matchObject(main: any, subset: any): boolean {
  if (main === subset) {
    return true
  }

  if ((typeof main === 'object' && main != null) && (typeof subset === 'object' && subset != null)) {
    for (const prop of Object.keys(subset)) {
      // main has this prop they should match
      if (Object.prototype.hasOwnProperty.call(main, prop)) {
        if (!matchObject(main[prop], subset[prop])) {
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
