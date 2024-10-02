#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

function renameFiles(directory, oldExt, newExt) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`)
      process.exit(1)
    }

    files.forEach((file) => {
      if (file.endsWith(oldExt)) {
        const oldPath = path.join(directory, file)
        const newPath = path.join(directory, file.replace(oldExt, newExt))

        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Error renaming ${file}: ${err}`)
          } else {
            console.log(`Renamed: ${file} -> ${path.basename(newPath)}`)
          }
        })
      }
    })
  })
}

const args = process.argv.slice(2)

if (args.length !== 3) {
  console.log(args)
  console.error('Usage: drowt renameFiles <directory> <oldExtension> <newExtension>')
  process.exit(1)
}

const [directory, oldExt, newExt] = args

renameFiles(directory, oldExt, newExt)
