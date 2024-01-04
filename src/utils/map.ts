import { Hashable, notUndefined } from "./shared"

export const compoundKey = (keys: Hashable[]) => {
  return keys.join(":")
}

export const getExists = <K, V>(map: Map<K, V>, key: K) => {
  return notUndefined(map.get(key))
}

export const mapMap = <K, V, T>(map: Map<K, V>, fn: (x: V, k: K) => T) => {
  const acc = new Map<K,T>()
  map.forEach((v,k) => {
    acc.set(k, fn(v,k))
  })
  return acc
}

export const byId = <K extends Hashable, T>(
  items: T[],
  getKey: (item: T) => K,
  options: {
    initial?: Map<K, T>
  } = {},
) => {
  const { initial = new Map<K, T>() } = options
  const acc = initial

  items.forEach((item) => {
    acc.set(getKey(item), item)
  })
  return acc
}

export const groupBy = <K extends Hashable, T>(
  items: T[],
  getKey: (item: T) => K,
  { initial }: { initial?: Map<K, T[]> } = {},
) => {
  const acc = initial ?? new Map<K, T[]>()
  items.forEach((item) => {
    const key = getKey(item)
    if (!acc.has(key)) acc.set(key, [])
    const arr = getExists(acc, key)
    arr.push(item)
  })
  return acc
}
