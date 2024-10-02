import { ColorT, MaterialT, VectorObjectT } from '../types'
import { CreateMaterialOptionsT, Material, materials } from '../materials'
import { CreateMeshOptionsT } from './meshes'
import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { colors, ColorOptionsT } from '../colors'
import { nanoid } from 'nanoid'
import { setMesh } from './setters'
import { getVector } from '../vectors'

type MeshCreatorFunction = (name: string, options: any, scene: BABYLON.Scene) => BABYLON.Mesh

const MESH_CREATORS: Record<string, MeshCreatorFunction> = {
  sphere: BABYLON.MeshBuilder.CreateSphere,
  ground: BABYLON.MeshBuilder.CreateGround,
  box: BABYLON.MeshBuilder.CreateBox,
  // Add other mesh types as needed
}

export type CreateMeshInstanceOptionsT = {
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

    size: options.size || template.size,
    color: colors.get(options.color) || template.color,
    material: materials.resolve(options.material) || template.material,
  }

  const create = MESH_CREATORS[meshOptions.type]
  const mesh = create(meshOptions.name, meshOptions, context.scene as any)
  setMesh.position(mesh, meshOptions.position)
  setMesh.rotation(mesh, meshOptions.rotation)
  setMesh.size(mesh, meshOptions.size)
  setMesh.color(mesh, meshOptions.color)
  setMesh.material(mesh, meshOptions.material)
  return mesh
}

export class Mesh extends BABYLON.Mesh {
  name: string
  type: string
  material: Material

  constructor(options: CreateMeshOptionsT) {
    const { type, position, rotation, color, material, name, ...otherOptions } = options
    const mesh = MESH_CREATORS[type](name, otherOptions, context.scene as any)
    super(name, context.scene as any)
    Object.assign(this, mesh)

    this.name = name
    this.type = type

    // TODO: If material is a string,
    // look up an already registered material by that name
    // and apply it to this class.

    // TODO: If material is an object,
    // create a new material from the options
    // and apply it to this class.

    if (position) {
      this.position.set(position.x || 0, position.y || 0, position.z || 0)
    }

    if (rotation) {
      this.rotation.set(rotation.x || 0, rotation.y || 0, rotation.z || 0)
    }
  }
}

type MeshTemplateT = {
  name: string
  type: string
  color?: string
  position?: VectorObjectT
  rotation?: VectorObjectT
  material?: string | CreateMaterialOptionsT
}

type MaterialOptionsT = {
  name: string
  type: string
  color?: string
}

export class MeshTemplate {
  name: string
  type: string
  position: VectorObjectT | undefined
  rotation: VectorObjectT | undefined
  color?: string | ColorOptionsT
  material: string | CreateMaterialOptionsT

  constructor(options: CreateMeshOptionsT) {
    this.name = options.name
    this.type = options.type
    this.position = options.position
    this.rotation = options.rotation
    this.color = colors.get(options.color)
    this.material = materials.resolve(options.material)
  }
}
