export function createNodeRemover(target: Map<string, any>) {
  return (name: string) => {
    const mesh = target.get(name)

    if (mesh) {
      mesh.dispose()
      target.delete(name)
    }
  }
}
