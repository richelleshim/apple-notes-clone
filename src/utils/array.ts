import { Hashable, Comparable } from "./shared"

export type Diff<T> = {
  fst: T[]
  snd: T[]
  both: T[]
}

export const sortBy = <K extends Comparable, T>(
  arr: T[],
  getKey: (x: T) => K,
  { reverse = false }: { reverse?: boolean } = {},
) => {
  const m = reverse ? -1 : 1
  return arr.sort((a, b) => {
    const aKey = getKey(a)
    const bKey = getKey(b)
    if (aKey < bKey) {
      return -1 * m
    } else if (aKey > bKey) {
      return 1 * m
    } else {
      return 0
    }
  })
}

export const diffCount = (diff: Diff<any>) => {
  const { fst, snd, both } = diff
  return fst.length + snd.length + both.length
}

export const createDiff = <T>({
  fst = [],
  snd = [],
  both = [],
}: Partial<Diff<T>>): Diff<T> => {
  return {
    fst,
    snd,
    both,
  }
}

export const diff = <K extends Hashable, T>(
  fst: T[],
  snd: T[],
  getKey: (x: T) => K,
): Diff<T> => {
  const prevIds = new Set(fst.map(getKey))
  const nextIds = new Set(snd.map(getKey))

  return {
    fst: fst.filter((x) => !nextIds.has(getKey(x))),
    snd: snd.filter((x) => !prevIds.has(getKey(x))),
    both: fst.filter((x) => nextIds.has(getKey(x))),
  }
}

export const hasNull = (arr: any[]) => {
  return arr.some((e) => e === null)
}

export const hasUndefined = (arr: any[]) => {
  return arr.some((e) => e === undefined)
}

export const filterNull = <T>(arr: (T | null)[]) => {
  return arr.filter((x): x is T => x !== null)
}

export const filterUndefined = <T>(arr: (T | undefined)[]) => {
  return arr.filter((x): x is T => x !== undefined)
}

export const alterArray = <T>(
  arr: T[],
  x: T,
  isEqual: (a: T, b: T) => boolean,
  insert: boolean,
) => {
  return insert ? [...arr, x] : arr.filter((other) => isEqual(x, other))
}

export const partition = <T>(items: T[], bucket_size: number) => {
  const len = Math.ceil(items.length / bucket_size)

  return [...Array(len).keys()].map((i) => {
      const offset = i * bucket_size
      return items.slice(offset, offset + bucket_size)
  })
}