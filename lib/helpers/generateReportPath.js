const { REPORT_DIR_NAME } = require("../constants")

const generateReportPath = (basePath) => {
  const basePathLength = basePath.length
  const actualBasePath =
    basePath.charAt(basePathLength - 1) === "/"
      ? basePath.substring(0, basePathLength - 1)
      : basePath

  return `${actualBasePath}/${REPORT_DIR_NAME}`
}
module.exports = generateReportPath
