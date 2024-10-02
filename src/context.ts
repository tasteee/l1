// context.ts
import * as BABYLON from '@babylonjs/core'
import { MeshT } from './types'
import { MeshTemplateOptionsT } from './meshes'
import { EnhancedMap } from './helpers/EnhancedMap'
import { MeshTemplateT } from './meshes/define'

type ContextT = {
  engine: BABYLON.Engine
  scene: BABYLON.Scene
  canvas: HTMLElement
  areLoadersRegistered: boolean

  colors: EnhancedMap<string, BABYLON.Color3>
  lights: EnhancedMap<string, BABYLON.Light>
  meshes: EnhancedMap<string, MeshT>
  meshTemplates: EnhancedMap<string, MeshTemplateT>
  models: EnhancedMap<string, BABYLON.AssetContainer>
  materials: EnhancedMap<string, BABYLON.Material>
  textures: EnhancedMap<string, BABYLON.Texture>
  cameras: EnhancedMap<string, BABYLON.Camera>
  directions: EnhancedMap<string, BABYLON.Vector3>
  positions: EnhancedMap<string, BABYLON.Vector3>
  texturePacks: EnhancedMap<string, Record<string, BABYLON.Texture>>
}

export const context = {
  engine: null,
  scene: null,
  canvas: null,
  areLoadersRegistered: false,

  colors: new EnhancedMap<string, BABYLON.Color3>(),
  lights: new EnhancedMap<string, BABYLON.Light>(),
  meshes: new EnhancedMap<string, MeshT>(),
  meshTemplates: new EnhancedMap<string, MeshTemplateOptionsT>(),
  models: new EnhancedMap<string, BABYLON.AssetContainer>(),
  materials: new EnhancedMap<string, BABYLON.Material>(),
  textures: new EnhancedMap<string, BABYLON.Texture>(),
  cameras: new EnhancedMap<string, BABYLON.Camera>(),
  directions: new EnhancedMap<string, BABYLON.Vector3>(),
  positions: new EnhancedMap<string, BABYLON.Vector3>(),
  texturePacks: new EnhancedMap<string, Record<string, BABYLON.Texture>>(),
} as unknown as ContextT

// @ts-ignore
globalThis._context = context
