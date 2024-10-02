const voxReader = require('vox-reader')
const { Document, NodeIO } = require('@gltf-transform/core')
const fs = require('fs')

function voxelToMesh(voxels, size) {
  const positions = []
  const indices = []
  let index = 0

  for (let x = 0; x < size[0]; x++) {
    for (let y = 0; y < size[1]; y++) {
      for (let z = 0; z < size[2]; z++) {
        if (voxels[x + y * size[0] + z * size[0] * size[1]]) {
          // Create a cube for each voxel
          const cubePositions = [
            x,
            y,
            z,
            x + 1,
            y,
            z,
            x + 1,
            y + 1,
            z,
            x,
            y + 1,
            z,
            x,
            y,
            z + 1,
            x + 1,
            y,
            z + 1,
            x + 1,
            y + 1,
            z + 1,
            x,
            y + 1,
            z + 1,
          ]
          positions.push(...cubePositions)

          const cubeIndices = [
            0,
            1,
            2,
            0,
            2,
            3, // front
            1,
            5,
            6,
            1,
            6,
            2, // right
            5,
            4,
            7,
            5,
            7,
            6, // back
            4,
            0,
            3,
            4,
            3,
            7, // left
            3,
            2,
            6,
            3,
            6,
            7, // top
            4,
            5,
            1,
            4,
            1,
            0, // bottom
          ].map((i) => i + index * 8)
          indices.push(...cubeIndices)

          index++
        }
      }
    }
  }

  return { positions, indices }
}

async function convertVoxToGltf(inputFile, outputFile) {
  // Read and parse .vox file
  const voxData = fs.readFileSync(inputFile)
  const voxModel = voxReader(voxData)

  // Convert voxel data to mesh
  const mesh = voxelToMesh(voxModel.voxels, voxModel.size)
  // Create glTF document and scene
  const document = new Document()
  const buffer = document.createBuffer()
  const scene = document.createScene()
  const node = document.createNode()
  scene.addChild(node)

  // Add mesh to glTF scene
  const positions = document
    .createAccessor()
    .setArray(new Float32Array(mesh.positions))
    .setType('VEC3')
    .setBuffer(buffer)

  const indices = document.createAccessor().setArray(new Uint32Array(mesh.indices)).setType('SCALAR').setBuffer(buffer)
  const primitive = document.createPrimitive().setAttribute('POSITION', positions).setIndices(indices)
  const meshObj = document.createMesh().addPrimitive(primitive)
  node.setMesh(meshObj)

  // Write glTF file
  const io = new NodeIO()
  await io.write(outputFile, document)

  console.log(`Conversion complete. Output file: ${outputFile}`)
}

// Usage
convertVoxToGltf('./public/models/_voxels/Lip Gloss/aagbrz08dtdd8nwn.vox', 'lipGloss0.gltf')
