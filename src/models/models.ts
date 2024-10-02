import * as BABYLON from '@babylonjs/core'
import { nanoid } from 'nanoid'
import { getVector } from '../vectors'
import { context } from '../context'
import { ISceneLoaderAsyncResult } from '@babylonjs/core'

type RegisterModelOptionsT = {
  name: string
  path: string
  file: string
  type: 'scene' | 'model'
}

type CreateInstanceOptionsT = {
  template: string
  name?: string
  position?: BABYLON.Vector3 | { x: number; y: number; z: number }
  rotation?: BABYLON.Vector3 | { x: number; y: number; z: number }
  scale?: BABYLON.Vector3 | { x: number; y: number; z: number }
  [key: string]: any
}

// CLASS: Models

export class Models extends Map<string, BABYLON.AssetContainer> {
  async register(options: RegisterModelOptionsT): Promise<void> {
    const model = await BABYLON.SceneLoader.LoadAssetContainerAsync(options.path, options.file, context.scene)
    super.set(options.name, model)
  }

  createInstance(options: CreateInstanceOptionsT): BABYLON.Mesh {
    const name = options.name || nanoid()
    const template = super.get(options.template)

    if (!template) {
      throw new Error(`Template '${options.template}' not found`)
    }

    const rootMesh = template.meshes[0] as BABYLON.Mesh
    const instance = rootMesh.clone(name, null) as BABYLON.Mesh

    if (options.position) {
      instance.position = getVector(options.position)
    }

    if (options.rotation) {
      instance.rotation = getVector(options.rotation)
    }

    if (options.scale) {
      instance.scaling = getVector(options.scale)
    }

    return instance
  }
}

export const models = new Models()

// // Usage:
// models.register({
//   name: 'lipGloss',
//   path: 'models/_voxels/lipGloss',
//   file: 'lipGloss.obj',
//   type: 'model',
// })

// models.createInstance({
//   template: 'lipGloss',
//   name: 'lipGlossInstance',
//   position: { x: 5, y: 7, z: 5 },
//   rotation: { x: 3, y: 0, z: 2 },
//   scale: { x: 1, y: 1, z: 1 },
// })



type LoadModelOptions = {
    name: string
    path: string
    file: string
    type: 'scene' | 'model'
  }

  type ImportModelOptions = {
    name: string
    path: string
    file: string
    type: 'scene' | 'model'
    scene: BABYLON.Scene
  }

  export function importModel(options: ImportModelOptions) {
    const model =
    return model
  }

  export function joinPath(path: string, fileName: string) {
    return [path, fileName].join('/').replace(/\/\//g, '/')
  }

  export async function importer(options: ImportModelOptions) {
    const assetPath = joinPath(options.path, options.file)
    const result = await BABYLON.loadAssetContainerAsync(assetPath, context.scene)
    return { ...result, type: options.type }
  }

  export async function loadModel(options: LoadModelOptions) {
    const result = await importer({
      scene: context.scene,
      ...options,
    })

    models.add(options.name, result)
    return result
  }

  export function cloneMesh(mesh: BABYLON.Mesh, instanceName: string) {
    const clone = mesh.clone(instanceName, null)
    meshes.add(clone.name, clone)
    return clone
  }