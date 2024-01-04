export type Hashable = string | number
export type Comparable = string | number | Date

export const notUndefined = <T>(x: T | undefined): T => {
  if (x === undefined) throw new Error(`expected not to be undefined`)
  return x
}

export const notNull = <T>(x: T | null): T => {
  if (x === null) throw new Error(`expected not to be null`)
  return x
}