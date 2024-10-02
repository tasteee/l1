export {}

declare global {
  interface Window {
    _areLoadersRegistered: boolean
    // Add more global properties here, e.g.:
    // myCustomGlobalProperty: string
    // anotherGlobalFunction: () => void
  }
}
