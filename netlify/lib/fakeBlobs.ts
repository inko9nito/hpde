// In-memory Netlify Blobs for the function tests: one Map per store name,
// with the options each store was opened with recorded.
export function fakeBlobs() {
  const stores = new Map<string, Map<string, unknown>>()
  const opened: { kind: 'site' | 'deploy'; options: unknown }[] = []

  const storeFor = (name: string) => {
    if (!stores.has(name)) stores.set(name, new Map())
    const data = stores.get(name)!
    return {
      list: async () => ({ blobs: [...data.keys()].map(key => ({ key })) }),
      get: async (key: string) => data.get(key) ?? null,
      setJSON: async (key: string, value: unknown, o?: { onlyIfNew?: boolean }) => {
        if (o?.onlyIfNew && data.has(key)) return { modified: false }
        data.set(key, value)
        return { modified: true }
      },
      delete: async (key: string) => {
        data.delete(key)
      },
    }
  }

  return {
    data: (name: string) => {
      if (!stores.has(name)) stores.set(name, new Map())
      return stores.get(name)!
    },
    opened,
    // Empties every store but keeps the Maps, so a test can hold on to one.
    clear: () => {
      for (const data of stores.values()) data.clear()
      opened.length = 0
    },
    getStore: (options: { name: string }) => {
      opened.push({ kind: 'site', options })
      return storeFor(`site:${options.name}`)
    },
    getDeployStore: (options: { name: string }) => {
      opened.push({ kind: 'deploy', options })
      return storeFor(`deploy:${options.name}`)
    },
  }
}
