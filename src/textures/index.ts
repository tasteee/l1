import { context } from '../context'

export type CreateTextureOptionsT = {
  name: string
  url: BABYLON.Nullable<string>
  sceneOrEngine?: BABYLON.Nullable<BABYLON.Scene | BABYLON.ThinEngine>
  noMipmapOrOptions?: boolean | BABYLON.ITextureCreationOptions
  invertY?: boolean
  samplingMode?: number
  onLoad?: BABYLON.Nullable<() => void>
  onError?: BABYLON.Nullable<(message?: string, exception?: any) => void>
  buffer?: BABYLON.Nullable<string | ArrayBuffer | ArrayBufferView | HTMLImageElement | Blob | ImageBitmap>
  deleteBuffer?: boolean
  format?: number
  mimeType?: string
  loaderOptions?: any
  creationFlags?: number
  forcedExtension?: string
}

export type RegisterTexturePackOptionsT = {
  name: string
  path: string
  [key: string]: string
}

export class TexturePacks extends Map<string, Object> {}

export class Textures extends Map<string, BABYLON.Texture> {
  packs: TexturePacks = new TexturePacks()

  register(options: CreateTextureOptionsT): BABYLON.Texture {
    const texture = new BABYLON.Texture(
      options.url,
      context.scene as any,
      options.noMipmapOrOptions,
      options.invertY,
      options.samplingMode,
      options.onLoad,
      options.onError,
      options.buffer,
      options.deleteBuffer,
      options.format,
      options.mimeType,
      options.loaderOptions,
      options.creationFlags,
      options.forcedExtension,
    )

    super.set(options.name, texture)
    return texture
  }
}

export const textures = new Textures()
