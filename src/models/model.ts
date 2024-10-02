import * as BABYLON from '@babylonjs/core'
import { meshes } from '../meshes'

export type LoadModelOptions = {
  name: string
  path: string
  file: string
  type: 'scene' | 'model'
}

export type ImportModelOptions = {
  name: string
  path: string
  file: string
  type: 'scene' | 'model'
  scene: BABYLON.Scene
}

const createModel = (options) => {}

export class Model extends BABYLON.AssetContainer {
  type: 'scene' | 'model'

  constructor(options: LoadModelOptions) {
    super(options.name)
    this.type = options.type
  }

  static async import(options: ImportModelOptions): Promise<Model> {
    const assetPath = Model.joinPath(options.path, options.file)
    const result = await BABYLON.SceneLoader.LoadAssetContainerAsync(assetPath, '', options.scene)

    const model = new Model(options)
    model.assetContainer = result
    return model
  }

  static joinPath(path: string, fileName: string): string {
    return [path, fileName].join('/').replace(/\/\//g, '/')
  }

  createInstance(instanceName: string): BABYLON.Mesh {
    const rootMesh = this.assetContainer.meshes[0] as BABYLON.Mesh
    const clone = rootMesh.clone(instanceName, null)
    meshes.add(clone.name, clone)
    return clone
  }

  dispose(): void {
    this.assetContainer.meshes.forEach((mesh) => mesh.dispose())
    super.dispose()
  }
}
