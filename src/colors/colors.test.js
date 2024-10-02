import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Colors } from './Colors'

import * as BABYLON from '@babylon/core'
import getHexFromColorName from 'colornames'
import hexToRgb from 'hex-rgb'

// Mock external dependencies
vi.mock('@babylon/core', () => ({
  Color3: vi.fn().mockImplementation((r, g, b) => ({ r, g, b })),
}))

vi.mock('colornames', () => ({
  default: vi.fn().mockImplementation((color) => {
    if (color === 'rebeccapurple') return '#663399'
    return null
  }),
}))

vi.mock('hex-rgb', () => ({
  default: vi.fn().mockImplementation((hex) => {
    if (hex === '#663399') return { red: 102, green: 51, blue: 153 }
    if (hex === '#123456') return { red: 18, green: 52, blue: 86 }
    return { red: 0, green: 0, blue: 0 }
  }),
}))

describe('Colors', () => {
  let colors

  beforeEach(() => {
    colors = new Colors()
  })

  it('should resolve a hexadecimal color', () => {
    const result = colors.resolve('#123456')
    expect(result).toEqual({ r: 18, g: 52, b: 86 })
  })

  it('should resolve a named color', () => {
    const result = colors.resolve('rebeccapurple')
    expect(result).toEqual({ r: 102, g: 51, b: 153 })
  })

  it('should resolve a color options object', () => {
    const result = colors.resolve({ name: 'customColor', color: '#123456' })
    expect(result).toEqual({ r: 18, g: 52, b: 86 })
  })

  it('should register a new color', () => {
    const result = colors.register({ name: 'newColor', color: '#123456' })
    expect(result).toEqual({ r: 18, g: 52, b: 86 })
    expect(colors.get('newColor')).toEqual({ r: 18, g: 52, b: 86 })
  })

  it('should return an existing color when registering with the same name', () => {
    colors.register({ name: 'existingColor', color: '#123456' })
    const result = colors.register({ name: 'existingColor', color: '#654321' })
    expect(result).toEqual({ r: 18, g: 52, b: 86 })
  })

  it('should get a hexadecimal color', () => {
    const result = colors.getHexidecimal('#123456')
    expect(result).toBe('#123456')
  })

  it('should get a hexadecimal color from a named color', () => {
    const result = colors.getHexidecimal('rebeccapurple')
    expect(result).toBe('#663399')
  })

  it('should throw an error for an unknown color name', () => {
    expect(() => colors.getHexidecimal('unknownColor')).toThrow('Color not found: unknownColor')
  })
})
