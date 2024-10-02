// main.ts
import './types/global'
import '@babylonjs/core/Debug/debugLayer'
import '@babylonjs/inspector'
import { registerBuiltInLoaders } from '@babylonjs/loaders/dynamic'
import { startApp } from './app'
import { context } from './context'

function registerLoaders() {
  const isRegistered = context.areLoadersRegistered
  if (isRegistered) return
  registerBuiltInLoaders()
  context.areLoadersRegistered = true
}

window.addEventListener('DOMContentLoaded', () => {
  registerLoaders()
  const canvas = document.getElementById('canvas')
  startApp(canvas as any)
})
