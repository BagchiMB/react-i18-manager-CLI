var Table = require("cli-table")

var table = new Table({
  head: [
    "Language",
    "Strings Present",
    "Untranslated Strings",
    "Extra Strings",
  ],
})
const formTable = (tableData) => {
  tableData.forEach((lang) => {
    const {
      comparedLang,
      comparedLangTotalString,
      totalUntranslatedStrigs,
      extraStrings,
    } = lang
    table.push([
      comparedLang,
      comparedLangTotalString,
      totalUntranslatedStrigs,
      extraStrings,
    ])
  })
  console.log(table.toString())
  console.log("Legend")
  console.log("String Present --> Strings Present in the language file")
  console.log(
    "Untranslated Strings --> Strings needed to be added in the language file in comparison with base language"
  )
  console.log(
    "Extra Strings --> Extra strings present in the language file but not present in base language file"
  )
}

module.exports = formTable
