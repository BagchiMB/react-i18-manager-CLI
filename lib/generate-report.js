const CLI = require("clui")
const path = require("path")

const readDirRecursive = require("./methods/utils/readDirRecursive")
const getPropertiesString = require("./methods/utils/getPropertiesString")
const generateFinalJson = require("./methods/generateFinalJson")
const languageWiseReport = require("./methods/languageWiseReport")
const formTable = require("./methods/formTable")
const generateObjFromStringArray = require("./methods/generateObjFromStringArray")
const initializingReport = require("./methods/initializingReport")
const createJsonFile = require("./methods/createJsonFile")
const generateReportPath = require("./helpers/generateReportPath")
const objectKeyModifier = require("./methods/utils/objectKeyModifier")

const Spinner = CLI.Spinner
const status = new Spinner("Analyzing Files")

const generateReport = async (basePath, baseLanguage) => {
  const reportPath = generateReportPath(basePath)
  initializingReport(reportPath, baseLanguage)
  status.start()
  // try{
  let emptyFilesArr = []
  const filesInDir = await readDirRecursive(basePath, emptyFilesArr)
  const jsonsInDirPath = filesInDir.filter(
    (file) => path.extname(file) === ".json"
  )

  const finalJson = generateFinalJson(jsonsInDirPath)

  // Getting all the languages
  const languagesArray = Object.keys(finalJson)

  const languagePropertiesObj = {}
  languagesArray.forEach((lang) => {
    // Getting Properties of the object in a string format in dot notation
    const props = getPropertiesString(finalJson[lang])
    // Appending it to the particular language
    languagePropertiesObj[lang] = props
  })

  if (!languagePropertiesObj[baseLanguage]) {
    console.log("base language -->", baseLanguage, " not present")
    return
  }

  const baseLangStrings = languagePropertiesObj[baseLanguage]
  const tableData = []
  Object.keys(languagePropertiesObj).forEach((lang) => {
    if (lang === baseLanguage) return
    // if (lang !== baseLanguage) {
    const comparedLangStrings = languagePropertiesObj[lang]
    const [diffBetweenBaseAndCompared, diffBetweenComparedAndBase] =
      languageWiseReport({ baseLangStrings, comparedLangStrings })

    tableData.push({
      comparedLang: lang,
      comparedLangTotalString: comparedLangStrings.length,
      totalUntranslatedStrigs: diffBetweenBaseAndCompared.length,
      extraStrings: diffBetweenComparedAndBase.length,
    })

    if (diffBetweenBaseAndCompared.length > 0) {
      const diffBetweenBaseAndComparedObj = generateObjFromStringArray(
        diffBetweenBaseAndCompared
      )
      objectKeyModifier(diffBetweenBaseAndComparedObj, ".json")
      createJsonFile({
        fileName: lang,
        obj: diffBetweenBaseAndComparedObj,
        path: reportPath,
      })
    }

    if (diffBetweenComparedAndBase.length > 0) {
      const diffBetweenComparedAndBaseObj = generateObjFromStringArray(
        diffBetweenComparedAndBase
      )
      objectKeyModifier(diffBetweenComparedAndBaseObj, ".json")
      createJsonFile({
        fileName: `${lang}-extra-strings`,
        obj: diffBetweenComparedAndBaseObj,
        path: reportPath,
      })
    }
  })
  formTable(tableData)
  status.stop()

  // } catch(e){
  //     console.log("Couldn't read files, confirm whetehr you used the right path or not ?")
  //     // Show Folder Structure
  //     // Check whether any JSON file is not empty, an empty JSON file should be like {} (Curly Braces are mandatory)
  //     status.stop()
  // }
  // console.log(jsonsInDir)
}
module.exports = generateReport
// exports.generateReport=generateReport
