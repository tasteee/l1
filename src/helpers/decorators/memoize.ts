export function memoize<T extends (...args: any[]) => any>(
  target: any,
  propertyKey: string,
  descriptor: TypedPropertyDescriptor<T>,
): TypedPropertyDescriptor<T> {
  const originalMethod = descriptor.value
  const cache = new Map<string, any>()

  descriptor.value = function (...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    const result = originalMethod!.apply(this, args)
    cache.set(key, result)
    return result
  } as T

  return descriptor
}
