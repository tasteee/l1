export class EnhancedMap<K, V> extends Map<K, V> {
  get(key: K): V {
    const value = super.get(key)
    if (!value) throw new Error(`${key} does not exist`)
    return value
  }

  add(key: K, value: V) {
    if (this.has(key)) throw new Error(`${key} already exists`)
    super.set(key, value)
  }

  remove(key: K) {
    if (!this.has(key)) throw new Error(`${key} does not exist`)
    super.delete(key)
  }
}
