import * as BABYLON from 'babylonjs'
import { Material } from './material'
import { CreateMaterialOptionsT } from './material'

export class Materials extends Map<string, Material> {
  resolve(input: string | CreateMaterialOptionsT): Material | undefined {
    const isOptions = typeof input === 'object'
    if (isOptions) return this.register(input)
    return super.get(input)
  }

  register(options: CreateMaterialOptionsT): Material {
    const material = new Material(options)
    super.set(options.name, material)
    return material
  }
}

export const materials = new Materials()
