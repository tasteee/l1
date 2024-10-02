import { colors } from '../colors/colors'
import { context } from '../context'
import { materials } from '../materials'
import { MeshTypeT, ColorT, MaterialT } from '../types'

export type MeshTemplateOptionsT = {
  name: string
  type: MeshTypeT
  size?: number
  material?: MaterialT
  [key: string]: any
}

export type MeshTemplateT = {
  name: string
  type: MeshTypeT
  size: number
  material: MaterialT
}

export function defineMeshTemplate(options: MeshTemplateOptionsT) {
  const template: MeshTemplateT = {
    ...options,
    size: options.size || 1,
    color: colors.get(options.color || 'white'),
    material: materials.get(options.material || 'standard'),
  }

  context.meshTemplates.set(options.name, template)
  return template
}
