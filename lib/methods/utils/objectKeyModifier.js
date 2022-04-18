const objectKeyModifier = (obj, additionalInfoInKey) => {
  const fileNames = Object.keys(obj)
  fileNames.forEach((fileName) => {
    obj[`${fileName}${additionalInfoInKey}`] = obj[fileName]
    delete obj[fileName]
  })
}
module.exports = objectKeyModifier
