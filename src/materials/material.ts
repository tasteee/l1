import * as BABYLON from '@babylonjs/core'
import { ColorT, TextureT } from '../types'
import { colors } from '../colors'
import { textures } from '../textures'
import { context } from '../context'
import { setMaterialColor } from '../backups/materials'

export type MaterialTypeT = 'standard' | 'pbr' | 'pbrMetallicRoughness' | 'pbrSpecularGlossiness'

export type MaterialOptionsT = {
  name: string
  type: MaterialTypeT
  texture?: TextureT
  color?: ColorT
  [key: string]: any
}

const createPbrSpecular = (name: string) => new BABYLON.PBRSpecularGlossinessMaterial(name, context.scene)
const createPbrMetallic = (name: string) => new BABYLON.PBRMetallicRoughnessMaterial(name, context.scene)
const createStandard = (name: string) => new BABYLON.StandardMaterial(name, context.scene)
const createPbr = (name: string) => new BABYLON.PBRMaterial(name, context.scene)

export function createMaterial(options: MaterialOptionsT) {
  let material = null

  if (options.type === 'pbrMetallicRoughness') material = createPbrMetallic(options.name)
  if (options.type === 'pbrSpecularGlossiness') material = createPbrSpecular(options.name)
  if (options.type === 'standard') material = createStandard(options.name)
  if (options.type === 'pbr') material = createPbr(options.name)

  if (options.color) setMaterialColor('diffuseColor', material, options.color)
  if (options.color) setMaterialColor('diffuseColor', material, options.color)
  console.log('created material: ', options.name)
  context.materials.set(options.name, material)
  return material as ReturnType<typeof create>
}
