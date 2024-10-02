import getHexFromColorName from 'colornames'
import hexToRgb from 'hex-rgb'

import { warnWhen } from '../helpers/warnWhen'
import { ColorOptionsT } from '../types'

// CLASS: Colors
// USAGE: colors.resolve('#123456')
// USAGE: colors.resolve('rebeccapurple')
// USAGE: colors.resolve({ name: 'rebeccapurple', color: 'rebeccapurple' })
// USAGE: colors.register({ name: 'myColor', color: '#333333' })
// USAGE: colors.get('myColor')

export class Colors extends Map<string, BABYLON.Color3> {
  resolve(input: string | ColorOptionsT) {
    const isOptions = typeof input === 'object'
    if (isOptions) return this.register(input)
    const isInMap = super.has(input)
    if (isInMap) return super.get(input)
    return this.register({ name: input, color: input })
  }

  register(options: ColorOptionsT) {
    const match = super.get(options.name)
    warnWhen(match, `Color already exists: ${options.name}`)
    if (match) return match

    const hexidecimal = colors.getHexidecimal(options.color)
    const { red, green, blue } = hexToRgb(hexidecimal)
    const color = new BABYLON.Color3(red, green, blue)
    this.set(options.name, color)
    return color
  }

  getHexidecimal(color: string): string {
    const isAlreadyHexidecimal = color.startsWith('#')
    if (isAlreadyHexidecimal) return color

    const hexidecimal = getHexFromColorName(color)
    if (!hexidecimal) throw new Error(`Color not found: ${color}`)
    return hexidecimal
  }
}
