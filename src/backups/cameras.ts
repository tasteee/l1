// cameras.ts
import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { createPosition } from '../vectors'
import { VectorObjectT } from '../types'

export function setCameraTarget(camera: BABYLON.FreeCamera, target: BABYLON.Vector3) {
  camera.setTarget(target)
}

export function enableCameraControl(camera: BABYLON.FreeCamera) {
  camera.attachControl(context.canvas, true)
}

type CreateCameraOptionsT = {
  name: string
  position: VectorObjectT
}

export function createCamera(options: CreateCameraOptionsT) {
  const position = createPosition(options.position)
  return new BABYLON.FreeCamera(options.name, position, context.scene)
}
