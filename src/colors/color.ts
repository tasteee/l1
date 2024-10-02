import * as BABYLON from 'babylonjs'
import { colors, ColorOptionsT } from './colors'
import hexToRgb from 'hex-rgb'

export class Color extends BABYLON.Color3 {
  name: string
  color: string
  hexidecimal: string
  babylonColor: BABYLON.Color3

  constructor(options: ColorOptionsT) {
    super(red, green, blue)
    this.name = options.name
    this.color = options.color
    this.hexidecimal = hexidecimal
    this.babylonColor = color
  }
}
