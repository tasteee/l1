// app.ts
import * as BABYLON from '@babylonjs/core'
import { context } from './context'
import { CONSTANTS } from './constants'
import { setCameraTarget, enableCameraControl, createCamera } from './backups/cameras'
import { lights } from './backups/lights'
import { meshes } from './meshes'
import { materials } from './materials'
import { textures } from './textures'
import { models } from './backups/models'
import { colors } from './colors/colors'

function initializeTextures() {
  textures.register({ name: 'texture0', path: './texture0.jpg' })

  textures.registerPack({
    name: 'scifiWall015',
    path: '/textures/Sci-Fi_Wall_015',
    baseColor: 'Sci-Fi_Wall_015_basecolor.png',
    height: 'Sci-Fi_Wall_015_height.png',
    metallic: 'Sci-Fi_Wall_015_metallic.png',
    normal: 'Sci-Fi_Wall_015_normal.png',
    roughness: 'Sci-Fi_Wall_015_roughness.png',
    ambientOcclusion: 'Sci-Fi_Wall_015_ambientOcclusion.png',
  })
}

function initializeCamera() {
  const camera = createCamera({ name: 'mainCamera', position: { x: 0, y: 5, z: -10 } })
  setCameraTarget(camera, CONSTANTS.WORLD_CENTER)
  enableCameraControl(camera)
}

function initializeLights() {
  lights.create({ name: 'light0', type: 'hemispheric', intensity: 0.7, direction: { x: 0, y: 1, z: 0 } })
  lights.create({ name: 'light1', type: 'hemispheric', intensity: 0.7, direction: { x: 0, y: 1, z: 0 } })
}

function initializeColors() {
  colors.register({ name: 'red', color: 'red' })
  colors.register({ name: 'green', color: 'green' })
  colors.register({ name: 'blue', color: 'blue' })
  colors.register({ name: 'pink', color: 'pink' })
  colors.register({ name: 'violet', color: 'violet' })
}

function initializeMaterials() {
  materials.register({
    name: 'greenMaterial',
    type: 'standard',
    color: 'green',
  })

  materials.register({
    name: 'groundMaterial0',
    type: 'standard',
    texture: 'texture0',
    color: 'green',
  })

  materials.register({
    type: 'pbr',
    name: 'scifiWall015',
    texture: 'scifiWall015',
  })
}

function initializeModels() {
  models.load({
    name: 'pizzaNight0',
    path: '/models/pizzaNight',
    file: 'scene.gltf',
    type: 'scene',
  })

  models.load({
    name: 'lipGloss0',
    path: '/models/_voxels/lipGloss',
    file: 'lipGloss0.obj',
    type: 'model',
  })
}

function defineMeshes() {
  meshes.define({
    name: 'scifiBox',
    type: 'box',
    size: 5,
    material: 'scifiWall015',
  })

  meshes.define({
    name: 'redBoxTemplate0',
    type: 'box',
    size: 2.5,
    color: 'red',
  })

  meshes.define({
    name: 'groundTemplate0',
    type: 'ground',
    width: 256,
    height: 256,
    material: 'groundMaterial0',
  })
}

function initializeScene() {
  initializeTextures()
  initializeCamera()
  initializeLights()
  initializeMaterials()
  initializeModels()
  initializeColors()
  defineMeshes()

  meshes.createInstance({
    template: 'scifiBox',
    name: 'scifiBox0',
    position: {
      x: 10,
      y: 0,
      z: 0,
    },
  })

  meshes.createInstance({
    template: 'redBoxTemplate0',
    name: 'redBox0',
    position: {
      x: 0,
      y: 0,
      z: 5,
    },
  })

  meshes.createInstance({
    template: 'groundTemplate0',
    name: 'ground0',
    position: { x: 0, y: 0, z: 0 },
  })

  meshes.create({
    name: 'sphere0',
    type: 'sphere',
    diameter: 2,
    segments: 32,
    material: { name: 'redMaterial', type: 'standard', color: 'red' },
    position: { x: -10, y: 2, z: 0 },
  })
}

function handleResizeEvents() {
  window.addEventListener('resize', () => {
    context.engine.resize()
  })
}

function toggleDebugger() {
  console.log(context.scene, context.scene.debugLayer)
  context.scene.debugLayer.show({ overlay: true })
}

export function startApp(canvas: HTMLElement) {
  context.canvas = canvas
  context.engine = new BABYLON.Engine(canvas as any)
  context.scene = new BABYLON.Scene(context.engine)

  initializeScene()
  handleResizeEvents()
  toggleDebugger()

  context.engine.runRenderLoop(() => {
    context.scene.render()
  })
}
