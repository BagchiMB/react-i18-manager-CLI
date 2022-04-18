const fs = require("fs")

const generateFinalJson = (jsonsInDirPath) => {
  const finalJson = {}
  jsonsInDirPath.forEach((filePath) => {
    const fileData = fs.readFileSync(filePath)
    const json = JSON.parse(fileData.toString())
    const filePathArray = filePath.split("/")
    // Folder in which JSON file is present
    const translationLanguage = filePathArray[filePathArray.length - 2]
    // Name of the JSON file
    const fileName = filePathArray[filePathArray.length - 1].replace(
      ".json",
      ""
    )

    if (finalJson[translationLanguage])
      finalJson[translationLanguage][fileName] = json
    else {
      const obj = {
        [fileName]: json,
      }
      finalJson[translationLanguage] = obj
    }
  })
  return finalJson
}
module.exports = generateFinalJson
