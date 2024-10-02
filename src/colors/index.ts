import { Colors } from './colors'

export const colors = new Colors()

/**

API

import { colors } from './colors'

colors.register({ name: 'myRed', color: 'maroon' })
colors.register({ name: 'myBlue', color: '#0000FF' })

colors.get('myRed') // Resolves to the color that was registered
// with the name 'myRed'.

colors.resolve('myRed') // Resolves to the color that was registered
// with the name 'myRed'.

colors.resolve('red') // Color hasn't been registered,
// so it will result in colors.register({ name: 'red', color: 'red' })



import materials from './materials'

materials.register({
    name: 'greenMaterial',
    type: 'standard',
    color: 'green',
})

materials.get('greenMaterial')

import { textures } from './textures'

textures.register({ name: 'myTexture', path: 'textures/myTexture.png' })
textures.get('myTexture')

*/
