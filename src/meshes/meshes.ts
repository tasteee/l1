import { nanoid } from 'nanoid'
import { MeshTypeT, ColorT, MaterialT, VectorObjectT, MaterialTypeT, TextureT } from '../types'
import { Mesh } from './mesh'
import { colors } from '../colors'
import { materials } from '../materials'
import { MeshTemplateT } from './define'

export type CreateMeshOptionsT = {
  name: string
  type: MeshTypeT
  position?: VectorObjectT
  rotation?: VectorObjectT
  color?: ColorT
  material?: MaterialT
  [key: string]: any
}

// CLASS: MeshTemplates

export class MeshTemplates extends Map<string, MeshTemplateT> {
  // @info retrieve or create an instance from a mesh template
  resolve(input: string | CreateMeshOptionsT) {
    const isOptions = typeof input === 'object'
    if (isOptions) return this.register(input)
    return super.get(input)
  }
}

// CLASS: Meshes

export class Meshes extends Map<string, Mesh> {
  templates: MeshTemplates = new MeshTemplates()

  // @info retrieve or create an instance from a mesh template
  resolve(input: string | CreateMeshOptionsT) {
    if (input instanceof Mesh) return input
    const isString = typeof input === 'string'
    return isString ? super.get(input) : this.createInstance(input)
  }

  // @info register a mesh template.
  register(options: MeshTemplateT) {
    options.material = materials.resolve(options.material)
    super.set(options.name, options)
    return options
  }

  // @info create an instance from a mesh template
  create(options: CreateMeshOptionsT) {
    const template = this.templates.get(options.template)
    const name = options.name || `${template.name}_instance_${nanoid()}`
    const mesh = { ...template, name, ...options }
    super.set(mesh.name, mesh)
    return mesh
  }
}
