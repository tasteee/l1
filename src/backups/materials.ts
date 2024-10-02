// materials.ts
import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { colors } from '../colors/colors'
import { ColorT, BabylonMaterialT, TextureT, MaterialTypeT, MaterialT } from '../types'
import { textures } from '../textures'

export function setMaterialColor(key: string, material: BabylonMaterialT, color: ColorT) {
  if ('diffuseColor' in material) material[key] = colors.get(color)
  else throw new Error('Material does not support setting color', { cause: material })
}

export function getMaterial(material: MaterialT) {
  const isString = typeof material === 'string'
  const existsInContext = isString && context.materials.has(material)
  if (isString && !existsInContext) createMaterial({ type: material, name: material })
  if (existsInContext) return context.materials.get(material) as BabylonMaterialT
  if (material instanceof BABYLON.Material) return material
  return createMaterial({ type: 'standard', name: 'standard' })
}

type CreatePBRMaterialOptionsT = {
  name: string
  texture: string
}

function createPBRMaterial(options: CreatePBRMaterialOptionsT): BABYLON.PBRMaterial {
  const material = new BABYLON.PBRMaterial(options.name, context.scene)
  const texture = textures.packs.get(options.texture) as any

  console.log({ texture })
  if (texture.baseColor) material.albedoTexture = texture.baseColor
  if (texture.ambientOcclusion) material.ambientTexture = texture.ambientOcclusion
  if (texture.normal) material.bumpTexture = texture.normal
  if (texture.metallic) material.metallicTexture = texture.metallic

  // Handle roughness texture
  if (texture.roughness) {
    material.useRoughnessFromMetallicTextureAlpha = false
    material.useRoughnessFromMetallicTextureGreen = false
    material.metallicTexture = texture.roughness
    material.useMetallnessFromMetallicTextureBlue = false
    material.useRoughnessFromMetallicTextureAlpha = true
  }

  // Handle height texture for parallax mapping
  if (texture.height) {
    material.useParallax = true
    material.useParallaxOcclusion = true
    material.parallaxScaleBias = 0.1
    material.bumpTexture = texture.height
  }

  return material
}

export function setMaterialTexture(which: string, material: BabylonMaterialT, texture: TextureT) {
  const key = `${which}Texture` as keyof BabylonMaterialT
  if (key in material) (material as any)[key] = texture
}

export const materials = {
  get: getMaterial,
  add: (name: string, value: any) => context.materials.set(name, value),
  getAll: () => context.materials.values(),
  create: createMaterial,
  setColor: setMaterialColor,
  setTexture: setMaterialTexture,
  createPBRMaterial: createPBRMaterial,
}
