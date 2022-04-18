const difference = (arr1, arr2) => {
  const finalArr = []
  for (let str1 of arr1) {
    let stringFound = false
    for (let str2 of arr2) {
      if (str1 === str2) {
        stringFound = true
        break
      }
    }
    if (!stringFound) finalArr.push(str1)
  }
  return finalArr
}

const languageWiseReport = ({ baseLangStrings, comparedLangStrings }) => {
  const diffBetweenBaseAndCompared = difference(
    baseLangStrings,
    comparedLangStrings
  )
  const diffBetweenComparedAndBase = difference(
    comparedLangStrings,
    baseLangStrings
  )

  return [diffBetweenBaseAndCompared, diffBetweenComparedAndBase]
}
module.exports = languageWiseReport
