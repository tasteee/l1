#! /usr/bin/env node
const fs = require('fs')
const path = require('path')

const listFilesRecursively = (dirPath, depth = 0, fileNamesOnly = false) => {
  const contents = fs.readdirSync(dirPath, { withFileTypes: true })
  const files = contents.filter((item) => !item.isDirectory())
  const directories = contents.filter((item) => item.isDirectory())
  const fileList = files.map((file) => file.name)

  if (fileNamesOnly) console.log(fileList.join('\n'))

  if (!fileNamesOnly) {
    const indent = '--'.repeat(depth)
    console.log(`${indent} [ directory: ${path.basename(dirPath)} ]`)
    fileList.forEach((file) => {
      console.log(`${indent}-- /${file}`)
    })
  }

  directories.forEach((dir) => {
    const subDirPath = path.join(dirPath, dir.name)
    listFilesRecursively(subDirPath, depth + 1, fileNamesOnly)
  })
}

const listFiles = (dirPath, fileNamesOnly = false) => {
  const contents = fs.readdirSync(dirPath, { withFileTypes: true })
  const files = contents.filter((item) => !item.isDirectory())
  const fileList = files.map((file) => file.name)

  if (fileNamesOnly) {
    console.log(fileList.join('\n'))
  } else {
    console.log(`[ directory: ${path.basename(dirPath)} ]`)
    fileList.forEach((file) => {
      console.log(`-- /${file}`)
    })
  }
}

const mainT = () => {
  const args = process.argv.slice(2)
  const isRecursive = args.includes('recursive')
  const isFileNamesOnly = args.includes('fileNames')
  const dirPath = args[args.length - 1]

  console.log('\n\n')
  isRecursive ? listFilesRecursively(dirPath, 0, isFileNamesOnly) : listFiles(dirPath, isFileNamesOnly)
  console.log('\n\n')
}

mainT()
