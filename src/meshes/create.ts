import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { getMaterial } from '../materials'
import { MeshTypeT, MaterialT, ColorT, VectorObjectT } from '../types'
import { nanoid } from 'nanoid'
import { setMesh } from './setters'

type CreateMeshInstanceOptionsT = {
  template: string
  name?: string
  position?: VectorObjectT
  rotation?: VectorObjectT
  size?: number
  color?: ColorT
  material?: MaterialT
  [key: string]: any
}

export function createMeshInstance(options: CreateMeshInstanceOptionsT) {
  const template = context.meshTemplates.get(options.template)
  const instanceName = options.name || `${template.name}_instance_${nanoid()}`

  const meshOptions = {
    ...template,
    ...options,
    name: instanceName,
    position: options.position || template.position,
    rotation: options.rotation || template.rotation,
    size: options.size || template.size,
    color: options.color || template.color,
    material: options.material || template.material,
  }

  const mesh = createMesh(meshOptions)
  setMesh.position(mesh, meshOptions.position)
  setMesh.rotation(mesh, meshOptions.rotation)
  setMesh.size(mesh, meshOptions.size)
  setMesh.color(mesh, meshOptions.color)
  setMesh.material(mesh, meshOptions.material)
  return mesh
}
