export { type MeshTemplateOptionsT } from './define'
import * as BABYLON from '@babylonjs/core'
import { createNodeRemover } from '../helpers/createNodeRemover'
import { setMesh } from './setters'
import { createMesh, createMeshInstance } from './create'
import { context } from '../context'
import { defineMeshTemplate } from './define'

export const meshes = {
  get: context.meshes.get,
  getTemplate: context.meshTemplates.get,
  add: (name: string, mesh: BABYLON.Mesh) => context.meshes.set(name, mesh),
  remove: createNodeRemover(context.meshes),
  create: createMesh,
  define: defineMeshTemplate,
  createInstance: createMeshInstance,
  setMaterial: setMesh.material,
}
