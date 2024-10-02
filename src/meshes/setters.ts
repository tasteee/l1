import * as BABYLON from '@babylonjs/core'
import { context } from '../context'
import { materials } from '../materials'
import { ColorT, MaterialT, VectorObjectT } from '../types'
import { colors } from '../colors/colors'
import { warnWhen } from '../helpers/warnWhen'
import { createVector3 } from '../vectors'

function setMeshMaterial(mesh: BABYLON.Mesh, material?: MaterialT) {
  if (!mesh || !material) return
  const _material = materials.get(material)
  mesh.material = _material
}

function setMeshColor(mesh: BABYLON.Mesh, color?: ColorT) {
  const isMesh = mesh instanceof BABYLON.Mesh
  const material = mesh.material

  warnWhen(!material, 'setMeshColor: no mesh material', { mesh, color })
  warnWhen(!isMesh, 'setMeshColor: no mesh provided', { mesh, color })
  if (!isMesh || !material || !color) return
  const babylonColor = colors.get(color)

  if (material instanceof BABYLON.StandardMaterial) {
    material.diffuseColor = babylonColor
  } else if (material instanceof BABYLON.PBRMaterial) {
    material.albedoColor = babylonColor
  } else if (material instanceof BABYLON.PBRMetallicRoughnessMaterial) {
    material.baseColor = babylonColor
  } else if (material instanceof BABYLON.PBRSpecularGlossinessMaterial) {
    material.diffuseColor = babylonColor
  } else if (material instanceof BABYLON.BackgroundMaterial) {
    material.primaryColor = babylonColor
  } else {
    warnWhen(true, 'setMeshColor: unsupported material type', { mesh, color, materialType: material.getClassName() })
  }
}

function setMeshPosition(mesh: BABYLON.Mesh, position?: VectorObjectT) {
  if (!mesh || !position) return
  mesh.position = createVector3(position)
}

function setMeshRotation(mesh: BABYLON.Mesh, rotation?: VectorObjectT) {
  if (!mesh || !rotation) return
  mesh.rotation = createVector3(rotation)
}

function setMeshSize(mesh: BABYLON.Mesh, size?: number) {
  if (!mesh || !size) return
  mesh.scaling = new BABYLON.Vector3(size, size, size)
}

export const setMesh = {
  material: setMeshMaterial,
  color: setMeshColor,
  position: setMeshPosition,
  rotation: setMeshRotation,
  size: setMeshSize,
}
