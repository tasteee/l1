import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { VectorObjectT } from '../types'
import { getDirection } from '../vectors'

type CreateHemisphericLightOptionsT = {
  name: string
  intensity?: number
  direction: BABYLON.Vector3
}

type CreatePointLightOptionsT = {
  name: string
  intensity?: number
  direction: BABYLON.Vector3
}

type CreateSpotLightOptionsT = {
  name: string
  intensity: number
  position: BABYLON.Vector3
  direction: BABYLON.Vector3
  angle: number
  exponent: number
}

function createHemisphericLight(options: CreateHemisphericLightOptionsT) {
  const light = new BABYLON.HemisphericLight(options.name, options.direction, context.scene)
  if (options.intensity) light.intensity = options.intensity
  return light
}

function createPointLight(options: CreatePointLightOptionsT) {
  const light = new BABYLON.PointLight(options.name, options.direction, context.scene)
  if (options.intensity) light.intensity = options.intensity
  return light
}

function createSpotLight(options: CreateSpotLightOptionsT) {
  const light = new BABYLON.SpotLight(
    options.name,
    options.position,
    options.direction,
    options.angle,
    options.exponent,
    context.scene,
  )

  if (options.intensity) light.intensity = options.intensity
  return light
}

const LIGHT_CREATORS = {
  hemispheric: createHemisphericLight,
  point: createPointLight,
  spot: createSpotLight,
}

type LightOptionsT = {
  name: string
  type: 'hemispheric' | 'point' | 'spot'
  direction?: VectorObjectT
  intensity?: number
}

export function createLight(options: LightOptionsT) {
  const { type, ...otherOptions } = options
  otherOptions.direction = getDirection(otherOptions.direction) as BABYLON.Vector3
  const create = LIGHT_CREATORS[type]
  return create(otherOptions as any)
}

export function removeLight(name: string) {
  const light = context.lights.get(name)

  if (light) {
    light.dispose()
    context.lights.delete(name)
  }
}

export const lights = {
  get: (name: string) => context.lights.get(name) as BABYLON.Light,
  add: (name: string, light: BABYLON.Light) => context.lights.set(name, light),
  remove: removeLight,
  create: createLight,
  createHemispheric: createHemisphericLight,
  createPoint: createPointLight,
  createSpot: createSpotLight,
}

export class Lights extends Map<string, BABYLON.Light> {
  register(options: LightOp) {
    const light = createLight(options)
    super.set(options.name, light)
    return light
  }
}
