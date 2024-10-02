import * as BABYLON from '@babylonjs/core'
import { type CreateMaterialOptionsT } from './materials'

export type ColorOptionsT = {
  name: string
  color: string
}

export type ColorT = string | BABYLON.Color3 | ColorOptionsT
export type DirectionT = BABYLON.Vector3 | VectorObjectT | string
export type TextureT = BABYLON.Texture | string

export type MeshT = BABYLON.Mesh | BABYLON.AbstractMesh | BABYLON.SubMesh
export type MeshTypeT = 'sphere' | 'ground' | 'box'
export type MaterialTypeT = 'standard' | 'pbr' | 'pbrMetallicRoughness' | 'pbrSpecularGlossiness'
export type MaterialT = string | CreateMaterialOptionsT
export type BabylonTextureT = BABYLON.Texture | BABYLON.BaseTexture | BABYLON.InternalTexture

export type BabylonMaterialT =
  | BABYLON.StandardMaterial
  | BABYLON.PBRMaterial
  | BABYLON.PBRMetallicRoughnessMaterial
  | BABYLON.PBRSpecularGlossinessMaterial

export type VectorObjectT = {
  x: number
  y: number
  z: number
}

export type MeshTemplateOptionsT = {
  name: string
  type: string
  position?: VectorObjectT
  rotation?: VectorObjectT
  material?: string | MaterialOptionsT
}

export type MaterialOptionsT = {
  name: string
  type: string
  texture?: string | TextureOptionsT
  textures?: string[] | TextureOptionsT[]
  color?: ColorT
}

export type TextureOptionsT = {
  name: string
  type: string
  path: string
}

export type MeshInstanceOptionsT = {
  template: string
  name?: string
  color?: ColorT
  material?: MaterialT
  position?: VectorObjectT
  rotation?: VectorObjectT
  scale?: VectorObjectT
  [key: string]: any
}
