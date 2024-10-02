// vectors.ts
import * as BABYLON from '@babylonjs/core'
import { VectorObjectT } from './types'
import { context } from './context'
import { DirectionT } from './types'

export function getVector(input: DirectionT) {
  if (input instanceof BABYLON.Vector3) return input
  if (typeof input === 'object') return createDirection(input)
  if (typeof input === 'string') return context.directions.get(input)
  console.error('getVector: invalid input', input)
  return new BABYLON.Vector3(0, 0, 0)
}

export function createVector3(options: VectorObjectT) {
  return new BABYLON.Vector3(options.x, options.y, options.z)
}

export const getDirection = getVector
export const createScale = createVector3
export const createPosition = createVector3
export const createDirection = createVector3
