const fs = require("fs")
const path = require("path")

const readDirRecursive = async (filePath, emptyFiles) => {
  const dir = await fs.promises.readdir(filePath)
  if (dir.length === 0) emptyFiles.push(filePath)
  const files = await Promise.all(
    dir.map(async (relativePath) => {
      const absolutePath = path.join(filePath, relativePath)
      const stat = await fs.promises.lstat(absolutePath)

      return stat.isDirectory()
        ? readDirRecursive(absolutePath, emptyFiles)
        : absolutePath
    })
  )
  return files.flat()
}
module.exports = readDirRecursive
