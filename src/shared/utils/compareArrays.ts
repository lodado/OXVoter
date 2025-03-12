export function compareArrays(arr1: unknown[], arr2: unknown[]): boolean {
  if (!Array.isArray(arr1) || !Array.isArray(arr2)) {
    return true
  }

  if (arr1.length !== arr2.length) {
    return false
  }

  for (let i = 0; i < arr1.length; i += 1) {
    if (arr1[i] !== arr2[i]) {
      return false
    }
  }

  return true
}
