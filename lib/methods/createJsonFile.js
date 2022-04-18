const fs = require("fs")

const createJsonFile = ({ fileName, obj, path }) => {
  const json = JSON.stringify(obj, null, "\t")
  fs.writeFileSync(`${path}/${fileName}.json`, json, "utf-8")
}
module.exports = createJsonFile
